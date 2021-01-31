<template>
  <div class="card-committee-slot">
    <div class="info-committee">
      <span class="title">Status</span>
      <span> : </span>
      <span class="content">{{ occupied() ? 'Occupied' : 'Empty' }}</span>
      <span> | </span>

      <span class="title">Elected</span>
      <span> : </span>
      <span class="content"
            :class="{ 'link': occupied() }"
            @click="etherscan()"
      >
        {{ (occupied() ? members[memberIndex].layer2 : '-') | hexSlicer }}
      </span>
      <span> | </span>

      <span class="title"># of Votes</span>
      <span> : </span>
      <span class="content">{{ occupied() ? members[memberIndex].vote : '0' | WTON }} TON</span>

      <div class="info-slot">
        <span>Member </span>
        <span class="slot">#{{ memberIndex }}</span>
      </div>
    </div>
    <div class="operator-name">{{ occupied() ? members[memberIndex].name : '-' }}</div>
    <div class="card-title">
      {{ occupied() ? desc : '-' }}
    </div>
    <div class="info-time">
      <img src="@/assets/poll-time-active-icon.svg" alt=""
           width="14" height="14"
      >
      <span>{{ occupied() ? fromNow(members[memberIndex].info.memberJoinedTime) : '-' }}</span>
    </div>
    <div class="button">
      <button-comp :name="'View Detail'"
                   :type="'primary'"
                   :status="occupied() ? '' : 'disabled'"
                   class="left"
                   :width="'118px'"
                   @on-clicked="detail()"
      />
      <button-comp v-if="candidateContractFromAccount"
                   :name="'Challenge'"
                   :type="'secondary'"
                   :width="'118px'"
                   class="right"
                   @on-clicked="challenge"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { getContract, metamaskErrorMessage } from '@/utils/contracts';
import { hexSlicer } from '@/utils/helpers';

import { mapGetters, mapState } from 'vuex';
import Button from '@/components/Button.vue';

export default {
  components: {
    'button-comp': Button,
  },
  props: {
    memberIndex: {
      type: Number,
      default: 0,
    },
  },
  data () {
    return {
      login: true,
    };
  },
  computed: {
    ...mapState([
      'account',
      'web3',
      'members',
    ]),
    ...mapGetters([
      'candidateContractFromAccount',
    ]),
    deployedDate () {
      return (timestamp) => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const date = new Date(timestamp * 1000);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        return monthNames[parseInt(month)] + ' ' + day + ', ' + year;
      };
    },
    fromNow () {
      return (timestamp, suffix) => moment.unix(timestamp).fromNow(suffix);
    },
    desc () {
      return `${hexSlicer(this.members[this.memberIndex].candidateContract)} is elected to Committee member since ${this.deployedDate(this.members[this.memberIndex].info.memberJoinedTime)}`;
    },
    shortAddress () {
      return account => `${account.slice(0, 7)}...`;
    },
    href () {
      return address => 'https://etherscan.io/address/' + address;
    },
  },
  methods: {
    occupied () {
      if (!this.members[this.memberIndex]) return false;
      else return this.members[this.memberIndex].memberIndex === this.memberIndex;
    },
    etherscan (address) {
      address ?
        window.open('https://etherscan.io/address/' + address, '_blank') : // eslint-disable-line
        window.open('https://etherscan.io/address/' + this.members[this.memberIndex].operator, '_blank');  // eslint-disable-line
    },
    detail () {
      if (this.occupied()) {
        this.$router.push({
          path: `/election/${this.members[this.memberIndex].candidateContract}`,
        });
      }
    },
    async challenge () {
      const candidateContract = getContract('Candidate', this.web3, this.candidateContractFromAccount);
      const memberIndex = this.memberIndex;
      console.log('challenge start', memberIndex);

      try{
        const gasLimit = await candidateContract.methods.changeMember(memberIndex)
          .estimateGas({
            from: this.account,
          });
        console.log('challenge gasLimit', gasLimit);

        await candidateContract.methods.changeMember(memberIndex)
          .send({
            from: this.account,
            gasLimit: Math.floor(gasLimit * 1.2),
          })
          .on('transactionHash', (hash) => {
            console.log('challenge transactionHash', hash);
            this.$store.commit('SET_PENDING_TX', hash);
          })
          .on('receipt', async (receipt) => {
            this.$store.commit('SET_PENDING_TX', '');
            console.log('receipt', receipt) ;
            await this.$store.dispatch('launch');
          })
          .on('error', (error) =>{
            //alert('error');
            console.log('error', error) ;
          });

      }catch(err){
        //console.log('challenge err', err, err.message ) ;
        const msg = metamaskErrorMessage(err.message);
        if(msg!=null && msg.length > 0 ) alert(msg) ;
      }

    },
  },
};
</script>

<style scoped>
.card-committee-slot {
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(96, 97, 112, 0.16);
  background-color: #ffffff;

  padding: 25px 30px;

  margin-bottom: 20px;
}
.info-committee {
  display: flex;
}
.info-committee > span {
  font-family: Roboto;
  font-size: 9px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #cfd7db;

  white-space: pre-wrap;
}
.info-committee > .title {
  color: #2a72e5;
}
.info-committee > .content {
  color: #3e495c;
}
.info-committee > .link {
  text-decoration: underline;
  cursor: pointer;
}

.info-slot {
  flex: 1;

  display: flex;
  justify-content: flex-end;
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

.info-time {
  display: flex;
  align-items: center;

  margin-top: 24px;
  margin-bottom: 24px;
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

.operator-name {
  font-family: Roboto;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;

  margin-top: 6px;
  margin-bottom: 6px;
}

.card-title {
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #86929d;
}

.card-committee-slot > .button {
  display: flex;
  justify-content: space-between;
}
.card-committee-slot > .button > .left {
  width: 110px;
}
.card-committee-slot > .button > .right {
  width: 110px;
}
</style>
