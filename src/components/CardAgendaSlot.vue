<template>
  <div class="card-agenda-slot">
    <modal v-if="showModal"
           :width="786"
           @on-closed="showModal=false"
    >
      <template #body>
        <modal-vote :id="agenda.agendaid" @on-closed="showModal=false" />
      </template>
    </modal>
    <div class="sub-container">
      <div class="info-slot">
        <span>Agenda </span>
        <span v-if="agendaType(agenda.agendaid) === 'A'" class="slot">#{{ agenda.agendaid }}</span>
        <span v-else class="slot-typeB">#{{ agenda.agendaid }}</span>
      </div>
      <div class="type-container">
        <span class="type-label">TYPE </span>
        <span v-if="agendaType(agenda.agendaid) === 'A'"
              class="typeA"
        >{{ agendaType(agenda.agendaid) }}</span>
        <span v-else
              class="typeB"
        >{{ agendaType(agenda.agendaid) }}</span>
      </div>
    </div>
    <div class="card-title">
      <div class="title">
        <!-- TODO: delete, if title is determined -->
        {{ title ? title : 'there is no title.' }}
      </div>
    </div>
    <div class="description">
      {{ `This agenda was made by ${shortAddress(agenda.creator)} on` }} {{ agenda.tCreationDate | date1 }}
    </div>
    <div class="info-time">
      <img v-if="agendaType(agenda.agendaid) === 'A'"
           src="@/assets/poll-time-active-icon.svg" alt=""
           width="14" height="14"
      >
      <img v-else
           src="@/assets/poll-time-active-icon-typeB.svg" alt=""
           width="14" height="14"
      >
      <span>{{ agenda | votingTime }}</span>
    </div>
    <div class="bottom">
      <div class="left-side">
        <button-comp
          :name="'View Detail'"
          :type="agendaType(agenda.agendaid) === 'A' ? 'primary' : 'primary-typeB'"
          class="left"
          :width="'118px'"
          @on-clicked="detail(agenda.agendaid)"
        />
        <div class="vote-status" :style="voteResultStyle">
          {{ votedResult() }}
        </div>
      </div>
      <div v-if="agenda.executed === false" class="right-side">
        <button-comp
          v-if="login!==false && canVote"
          :name="buttonName"
          :type="buttonType"
          :status="buttonStatus"
          class="right"
          :width="'124px'"
          @on-clicked="click"
        />
        <button-comp
          v-if="login!==false && canExecute"
          :name="buttonName"
          :type="buttonType"
          :status="buttonStatus"
          class="right"
          :width="'124px'"
          @on-clicked="click"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import Modal from '@/components/Modal.vue';
import ModalVote from '@/containers/ModalVote.vue';
import { isVotableStatusOfAgenda } from '@/utils/contracts';
import { mapState, mapGetters } from 'vuex';
import { getContract, getContractABIFromAddress } from '@/utils/contracts';
import { hexSlicer } from '@/utils/helpers';

export default {
  components: {
    'button-comp': Button,
    'modal': Modal,
    'modal-vote': ModalVote,
  },
  props: {
    agenda: {
      type: Object,
      default: () => {},
    },
  },
  data () {
    return {
      now : parseInt(Date.now()/1000),
      endedShow: false,
      login: true,
      buttonClass: {
        'buttonName': 'Vote',
        'buttonType': 'vote',
        'buttonStatus': 'disabled',
      },
      choice: '',
      monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      showModal: false,
    };
  },
  computed: {
    ...mapState([
      'web3',
      'account',
      'members',
      'confirmBlock',
      'etherscanAddress',
    ]),
    ...mapGetters([
      'agendaOnChainEffects',
      'agendaType',
      'isMember',
      'myCandidates',
    ]),
    target () {
      const onChainEffects = this.agendaOnChainEffects(this.agenda.agendaid);
      if (!onChainEffects || onChainEffects.length === 0) return '';

      return onChainEffects[0].target;
    },
    title () {
      const abi = getContractABIFromAddress(this.target);
      if (!abi || abi.length === 0) return '';
      return abi[0].title;
    },
    voteResultStyle () {
      if (this.agenda.voting !== undefined) {
        if (this.agendaType(this.agenda.agendaid) === 'A') {
          return { 'color': '#2a72e5' };
        } else {
          return { 'color': '#ff7800' };
        }
      }
      return 0;
    },
    shortAddress () {
      return account => hexSlicer(account);
    },
    href () {
      return address => this.etherscanAddress + '/address/' + address;
    },
    buttonName () {
      switch (this.agenda.status) {
      case 3: return 'Execute';
      case 4: return 'Execute';
      case 5: return 'Execute';
      }
      return 'Vote';
    },
    buttonType () {
      switch (this.agenda.status) {
      case 3: return 'secondary';
      case 4: return 'secondary';
      case 5: return 'secondary';
      }
      return 'vote';
    },
    buttonStatus () {
      switch (this.agenda.status) {
      case 1: return '';
      case 2: return '';
      case 3: return '';
      }
      return 'disabled';
    },
    canVote (){
      if ( this.isMember && this.agenda && this.agenda.status === 1 && this.agenda.tNoticeEndTime < this.now)
        return true;
      else if( this.isVoter )
        return true;
      else
        return false;
    },
    isVoter (){
      let returnValue = false;
      if( this.myCandidates && this.agenda && this.agenda.status === 2 && this.agenda.tVotingStartTime < this.now
        && this.agenda.tVotingEndTime > this.now
        && this.agenda.voters  && this.agenda.voters.length > 0 ){
        this.agenda.voters.forEach(voter=>{
          if(voter!=null && (this.myCandidates.indexOf(voter.toLowerCase()) > -1 ) )
            returnValue= true;
        });
        return returnValue;
      }else return returnValue;
    },
    canExecute (){
      if ( this.agenda && this.agenda.result === 1 && this.agenda.tNoticeEndTime < this.now)
        return true;
      else
        return false;
    },
  },
  methods: {
    votedResult () {
      if (this.agenda.voting !== undefined) {
        switch (this.agenda.voting) {
        case '0': return 'You have voted to Abstain';
        case '1': return 'You have voted Yes';
        case '2': return 'You have voted No';
        }
      } else {
        return 'You have not voted';
      }
    },
    async click () {
      if ( !this.web3 ){
        alert('Check Connect Wallet !');
        return;
      }
      if (this.agenda.status === 2 || this.agenda.status === 1) {
        const isVotableStatus = await isVotableStatusOfAgenda( this.agenda.agendaid, this.web3);
        if(!isVotableStatus) {
          alert('This Agenda is not in a state to vote.');
          return;
        }
        const operator = [];
        this.members.forEach(async member => operator.push(member.operator));
        (!operator.includes(this.account.toLowerCase()) ? alert('not members!') : this.showModal=true);
      } else if (this.agenda.status === 3) {
        this.execute();
      }
      this.$store.dispatch('setAgendas');
    },
    async execute () {
      const daoCommitteeProxy = getContract('DAOCommitteeProxy', this.web3);
      const gasLimit = await daoCommitteeProxy.methods.executeAgenda(this.agenda.agendaid).send({ from: this.account });

      await daoCommitteeProxy.methods.executeAgenda(this.agenda.agendaid)
        .send({
          from: this.account,
          gasLimit: Math.floor(gasLimit * 1.2),
        })
        .on('transactionHash', (hash) => {
          this.$store.commit('SET_PENDING_TX', hash);
        })
        .on('confirmation', async (confirmationNumber) => {
          if (this.confirmBlock === confirmationNumber) {
            //
          }
        })
        .on('receipt', () => {
          this.$store.commit('SET_PENDING_TX', '');
        })
        .on('error', () => {
          this.$store.commit('SET_PENDING_TX', '');
        });
    },
    detail (id) {
      this.$router.push({
        path: `/agenda/${id}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.card-agenda-slot {
  flex: 1;
  padding: 25px 0 25px 30px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(96, 97, 112, 0.16);
  background-color: #ffffff;
}
.card-agenda-slot > div {
  font-family: Roboto;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
}

.title {
  flex: 1;
}
.type-container {
  display: flex;

  margin-right: 30px;

  .type-label {
    font-family: Roboto;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: 0.3px;
    text-align: left;
    color: #3e495c;

    white-space: pre-wrap;
  }
  .typeA {
    font-family: Roboto;
    font-size: 12px;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: 0.3px;
    text-align: left;
    font-weight: bold;
    color: #2a72e5;

    white-space: pre-wrap;
  }
  .typeB {
    font-family: Roboto;
    font-size: 12px;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: 0.3px;
    text-align: left;
    font-weight: bold;
    color: #f7981c;

    white-space: pre-wrap;
  }
}

.sub-container {
  display: flex;
  margin-bottom: 8px;
}

.card-title {
  height: 26px;
  margin: 0 0 5px;
  font-size: 20px;
  text-align: left;
  color: #3e495c;

  display: flex;
}

.info-slot {
  display: flex;
  flex: 1;

  margin-right: 30px;
}
.info-slot > span {
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: right;
  color: #3e495c;

  white-space: pre-wrap;
}
.info-slot > .slot {
  color: #2a72e5;
}
.info-slot > .slot-typeB {
  color: #ff7800;
}
.description {
  font-size: 14px;
  height: 19px;
  text-align: left;
  color: #86929d;
}

.info-time {
  display: flex;
  align-items: center;

  margin-top: 24px;
  margin-bottom: 3px;
}
.info-time > span {
  font-family: Roboto;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #86929d;

  margin-left: 7px;
}

.card-agenda-slot > .bottom {
  display: flex;
  justify-content: space-between;
}
.card-agenda-slot > .bottom > .left-side {
  display: flex;
  align-self: flex-end;
  justify-content: flex-start;
  height: 55px;
}
.card-agenda-slot > .bottom > .left-side > .left {
  width: 110px;
  align-self: flex-end;
}
.card-agenda-slot > .bottom > .left-side > .vote-status {
  color: #c9d1d8;
  font-size: 12px;
  margin: 0 0 8px 20px;
  align-self: flex-end;
}
.vote-status .vote-selected {
  color: #2a72e5;
}
.card-agenda-slot > .bottom > .left-side > .claimable {
  font-size: 10px;
  color: #3e495c;
  margin: 0 0 10px 15px;
  align-self: flex-end;
}
.card-agenda-slot > .bottom > .right-side {
  display: flex;
  justify-content: flex-end;
}
.card-agenda-slot > .bottom > .right-side > .right {
  width: 110px;
  margin-right: 30px;
  align-self: flex-end;
}
.card-agenda-slot > .bottom > .right-side > .dropdown-section > .your-vote{
  margin: 3px 0px 10px 0px;
  font-size: 10px;
  color: #3e495c;
}
.right-side .dropdown {
  width: 140px;
  right: 10px;
}
</style>
