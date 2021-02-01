<template>
  <div class="connect">
    <button
      v-if="!account"
      :class="{ sub: isSub }"
      @click="connect"
    >
      Connect Wallet
    </button>
    <div v-else style="position: relative;">
      <div class="account"
           :style="[pendingTx ? { 'visibility': 'hidden' } : {}]"
      >
        <div ref="icon" class="icon" />
        <div class="address">
          {{ shortAddress }}
        </div>
      </div>
      <div class="pending"
           :style="[!pendingTx ? { 'visibility': 'hidden' } : {}]"
           @click="etherscan()"
      >
        <div class="loader" />
        <div class="label">Tx PENDING</div>
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3';
import { mapState } from 'vuex';
import jazzicon from '@metamask/jazzicon';
import EventBus from '../utils/eventBus';
import {
  getContractAddress,
  deployedFirstBlock,
  eventInfos,
} from '@/utils/contracts';

export default {
  props: {
    isSub: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return{
      account: '',
      currentBlock: deployedFirstBlock,
    };
  },
  computed: {
    ...mapState([
      'web3',
      'pendingTx',
    ]),
    shortAddress () {
      return `${this.account.slice(0, 7)}...${this.account.slice(-4)}`;
    },
    iconNumber () {
      return parseInt(this.account.slice(2, 10), 16);
    },
  },
  methods: {
    async connect () {
      if (typeof window.ethereum !== 'undefined') {
        //const web3 = new Web3(ethereum);
        const web3 = new Web3(window.ethereum);
        try {
          await ethereum.request({ method: 'eth_requestAccounts' });

          const accounts = await web3.eth.getAccounts();
          this.account = accounts[0];
          this.currentBlock = await await web3.eth.getBlockNumber();
          this.$nextTick(() => {
            this.setIcon();
          });
          await this.$store.dispatch('launch');
          await this.$store.dispatch('connectEthereum', web3);
        } catch (e) {
          // User deny to connect MetaMask wallet.
        }
        const handleAccountsChanged = async (accounts) => {
          if (accounts.length === 0) {
            this.$store.dispatch('disconnectEthereum');
          } else {
            const accounts = await web3.eth.getAccounts();
            this.account = accounts[0];
            this.$nextTick(() => {
              this.setIcon();
            });

            await this.$store.dispatch('launch');
            await this.$store.dispatch('connectEthereum', web3);
            EventBus.$emit('metamask', { command:'accountsChanged', data:this.account });
          }
        };
        const handleNetworkChanged = () => {
          this.$store.dispatch('disconnectEthereum');
        };
        const getAgendaEvents = () => {

          function includeEvent (element) {
            const TOPICS_NAME={
              'AgendaCreated': 'AgendaCreated',
              'AgendaExecuted': 'AgendaExecuted',
              'AgendaVoteCasted': 'AgendaVoteCasted',
              'ApplyMemberSuccess': 'ApplyMemberSuccess',
              'CandidateContractCreated': 'CandidateContractCreated',
              'ChangedMember': 'ChangedMember',
              'ChangedSlotMaximum': 'ChangedSlotMaximum',
              'ClaimedActivityReward': 'ClaimedActivityReward',
              'OperatorRegistered': 'OperatorRegistered',
              'AgendaStatusChanged': 'AgendaStatusChanged',
              'AgendaResultChanged': 'AgendaResultChanged',
            };
            return (  element!=null &&
            ( element.event===TOPICS_NAME.AgendaCreated
                || element.event===TOPICS_NAME.AgendaStatusChanged
                || element.event===TOPICS_NAME.AgendaResultChanged
                || element.event===TOPICS_NAME.AgendaExecuted
                || element.event===TOPICS_NAME.AgendaVoteCasted
            ) );
          }
          try {
            const abi = require('../contracts/DAOCommittee.json').abi;
            const myContract  = new web3.eth.Contract(abi, getContractAddress('DAOCommitteeProxy') );
            if(myContract!=null){
              myContract.getPastEvents('allEvents',
                {
                  fromBlock: deployedFirstBlock,
                  toBlock: 'latest',
                }, function (e, l){
                  //console.log('DAOCommittee getPastEvents: ', l);
                  const datas = l.filter(includeEvent);
                  // eslint-disable-line
                  console.log('DAOCommittee getPastEvents: filter datas ',  datas);
                },
              );
            }
          } catch (err) {
            // eslint-disable-line
            console.log('getAgendaEvents error ', err ) ;
            //return null;
          }
        };
        const onWatch = () => {
          const subscription =  web3.eth.subscribe('logs', {
            fromBlock: deployedFirstBlock,
            address: getContractAddress('DAOCommitteeProxy'),
          }, async (error, result) => {
            if(error!=null) {
              // eslint-disable-line
              console.log('onWatch error1', error);
            }
            if(result!=null) {
              if(result.blockNumber==='undefined' || result.transactionHash ==='result.transactionHash'){
                // eslint-disable-line
                console.log('onWatch error2', error);
              } else{
                if(this.currentBlock < result.blockNumber){
                  const eventName = getEventName(result.topics[0]);
                  //console.log('onWatch   ', eventName);
                  if(eventName==='AgendaCreated') {
                    EventBus.$emit('message', { command:'agendaEvent', data: eventName });
                  }
                }
              }
            }
          }).on('connected', function (subscriptionId){
           // eslint-disable-line
            console.log('connected', subscriptionId);
          }).on('data', function (log){
            // eslint-disable-line
            console.log('data', log);
          }).on('changed', function (log){
            // eslint-disable-line
            console.log('changed', log);
          });

          subscription.unsubscribe(async function (error, success){
            // eslint-disable-line
            console.log('unsubscribed!  error:', error, 'success: ', success );
            if(error){
              // eslint-disable-line
              console.log('err unsubscribed!', error);
            }
            if(success){
              // eslint-disable-line
              console.log('***** Successfully unsubscribed!');
            }
          });
        };
        const getEventName = (topics)=>{
          let eventname = null;
          switch(topics){
          case  eventInfos.Transfer.signature:
            eventname = eventInfos.Transfer.event;
            break;
          case eventInfos.Deposited.signature:
            eventname =  eventInfos.Deposited.event;
            break;
          case eventInfos.WithdrawalRequested.signature:
            eventname =  eventInfos.WithdrawalRequested.event;
            break;
          case eventInfos.WithdrawalProcessed.signature:
            eventname =  eventInfos.WithdrawalProcessed.event;
            break;
            /*
              case eventInfos.SeigGiven.signature:
                eventname =  eventInfos.SeigGiven.event;
                break;
              case eventInfos.CommitLog1.signature:
                eventname =  eventInfos.CommitLog1.event;
                break;
                */
          case eventInfos.Comitted.signature:
            eventname =  eventInfos.Comitted.event;
            break;
            /*
              case eventInfos.UnstakeLog.signature:
                eventname =  eventInfos.UnstakeLog.event;
                break;
                */
            //---
          case eventInfos.AgendaCreated.signature:
            eventname = eventInfos.AgendaCreated.event;
            break;
          case eventInfos.AgendaExecuted.signature:
            eventname = eventInfos.AgendaExecuted.event;
            break;
          case eventInfos.AgendaExecuteds.signature:
            eventname = eventInfos.AgendaExecuteds.event;
            break;
          case eventInfos.AgendaVoteCasted.signature:
            eventname =  eventInfos.AgendaVoteCasted.event;
            break;
          case eventInfos.ApplyMemberSuccess.signature:
            eventname =  eventInfos.ApplyMemberSuccess.event;
            break;
          case eventInfos.CandidateContractCreated.signature:
            eventname =  eventInfos.CandidateContractCreated.event;
            break;
          case eventInfos.ChangedMember.signature:
            eventname =  eventInfos.ChangedMember.event;
            break;
          case eventInfos.ChangedSlotMaximum.signature:
            eventname =  eventInfos.ChangedSlotMaximum.event;
            break;
          case eventInfos.ClaimedActivityReward.signature:
            eventname =  eventInfos.ClaimedActivityReward.event;
            break;
          case eventInfos.OperatorRegistered.signature:
            eventname =  eventInfos.OperatorRegistered.event;
            break;
          case eventInfos.AgendaStatusChanged.signature:
            eventname = eventInfos.AgendaStatusChanged.event;
            break;
          case eventInfos.AgendaResultChanged.signature:
            eventname = eventInfos.AgendaResultChanged.event;
            break;
          default:
            break;
          }
          return eventname;
        };

        ethereum.on('accountsChanged', handleAccountsChanged);
        //ethereum.on('networkChanged', handleNetworkChanged);
        ethereum.on('chainChanged', handleNetworkChanged);
        //
        ethereum.on('message', (message) => {
          // Handle the new chain.
          // Correctly handling chain changes can be complicated.
          // We recommend reloading the page unless you have a very good reason not to.
           // eslint-disable-line
          console.log('ethereum.message ', message) ;
        });
        getAgendaEvents();
        onWatch();
      } else {
        // MetaMask need to be installed.
      }
    },
    setIcon () {
      const icon = jazzicon(25, this.iconNumber);
      const iconEle = this.$refs.icon;
      if (iconEle) {
        if (iconEle.childElementCount === 1) {
          iconEle.removeChild(iconEle.lastElementChild);
        }
        iconEle.append(icon);
      }
    },
    etherscan () {
      window.open('https://rinkeby.etherscan.io/tx/' + this.pendingTx, '_blank'); // eslint-disable-line
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  /* font styles */
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #a6c8e9;

  height: 35px;
  padding: 7px 16px 9px;
  border-radius: 19px;
  border: solid 1px #6c9ed0;
  background: #0062c2;

  cursor: pointer;
  white-space: nowrap;
}

.sub {
  color: #86929d;

  border-radius: 19px;
  border: solid 1px #d7d9df;
  background: #ffffff;
}

.account {
  width: 165px;
  height: 35px;

  display: flex;
  align-items: center;

  padding: 5px 21px 5px 13px;
  border-radius: 19px;
  border: solid 1px #d7d9df;
  background-color: #ffffff;

  position: relative;
}

.address {
  /* text styles */
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;
}

.icon {
  margin-right: 8px;
  margin-bottom: -5px;
}

.pending {
  width: 165px;
  height: 35px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 19px;
  border: solid 1px #2a72e5;
  background-color: #ffffff;

  position: absolute;
  right: 0;
  top: 0;

  &:hover {
    cursor: pointer;
  }
}

.loader {
  width: 20px;
  height: 20px;

  border: 2px solid #d9e6fb;
  border-top: 2px solid #2a72e5;
  border-radius: 50%;

  animation: spin 2s linear infinite;

  margin-right: 16px;
  margin-left: -12px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.label {
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: left;
  color: #2a72e5;
}
</style>
