<template>
  <div class="card-member">
    <div class="header-container">
      <text-smallest :label="'Status'"
                     :value="member ? 'Occupied' : 'Empty'"
                     :with-bar="true"
      />
      <text-smallest :label="'Elected'"
                     :value="member ? hexSlicer(member.layer2) : '-'"
                     :with-bar="true"
      />
      <text-smallest :label="'# of Votes'"
                     :value="member ? amountTON(member.vote) : '0 TON'"
                     :with-bar="false"
      />
      <text-small class="member-slot"
                  :type="'A'"
                  :label="'Slot'"
                  :value="`#${memberIndex}`"
      />
    </div>
    <div class="title-container">
      <div class="title">{{ member ? member.name : '-' }}</div>
      <!-- <div class="type">{{ member ? `- ${member.kind}` : '' }}</div> -->
    </div>
    <div class="sub">{{ member ? desc : '-' }}</div>
    <text-time :type="'A'"
               :time="member ? fromNow(member.info.memberJoinedTime) : '-'"
               :is-active="true"
    />
    <div class="button-container">
      <election-button :name="'View Detail'"
                       :width="'110px'"
                       :type="'primary'"
                       :status="!member ? 'disabled' : ''"
                       @on-clicked="route(`/election/${member.candidateContract}`);"
      />
      <election-button v-if="isCandidate && !canRetire"
                       :name="'Challenge'"
                       :width="'110px'"
                       :type="'primary'"
                       :disabled="!canChallenge"
                       :status="challengeInProgress ? 'running' : ''"
                       @on-clicked="challenge()"
      />
      <election-button v-if="canRetire"
                       :name="'Retire'"
                       :width="'110px'"
                       :type="'primary'"
                       :status="retirementInProgress ? 'running' : ''"
                       @on-clicked="retire()"
      />
    </div>
  </div>
</template>

<script>
import { toBN } from 'web3-utils';
import { fromNow, hexSlicer, WTON, withComma } from '@/utils/helpers';
import { getContract } from '@/utils/contracts';
import { mapState, mapGetters } from 'vuex';

import Button from '@/components/Button.vue';
import TextSmall from '@/components/TextSmall.vue';
import TextSmallest from '@/components/TextSmallest.vue';
import TextTime from '@/components/TextTime.vue';

export default {
  components: {
    'election-button': Button,
    'text-small': TextSmall,
    'text-smallest': TextSmallest,
    'text-time': TextTime,
  },
  props: {
    memberIndex: {
      type: Number,
      default: 0,
    },
  },
  data () {
    return {
      challengeInProgress: false,
      retirementInProgress: false,
    };
  },
  computed: {
    ...mapState([
      'account',
      'confirmBlock',
      'members',
      'web3',
    ]),
    ...mapGetters([
      'isCandidate',
      'isMember',
      'totalVotesForCandidate',
      'candidateContractFromEOA',
    ]),
    member () {
      return this.members[this.memberIndex];
    },
    canChallenge () {
      if (this.isMember) {
        return false;
      }

      const memberVote = this.totalVotesForCandidate(this.member.candidateContract);
      const challengerVote = this.totalVotesForCandidate(this.candidateContractFromEOA);
      return toBN(challengerVote).gt(toBN(memberVote));
    },
    canRetire () {
      return this.member.candidateContract === this.candidateContractFromEOA ? true : false;
    },
    desc () {
      return `${hexSlicer(this.member.candidateContract)} was elected as a member on ${this.deployedDate(this.member.info.memberJoinedTime)}`;
    },
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
  },
  methods: {
    route (path) {
      this.$router.push({ path });
    },
    hexSlicer (address) {
      return hexSlicer(address);
    },
    amountTON (amount) {
      return `${withComma(WTON(amount))} TON`;
    },
    fromNow (timestamp) {
      return fromNow(timestamp);
    },
    async challenge () {
      const candidateContract = getContract('Candidate', this.web3, this.candidateContractFromEOA);
      const memberIndex = this.memberIndex;

      const gasLimit = await candidateContract.methods.changeMember(memberIndex)
        .estimateGas({
          from: this.account,
        });

      await candidateContract.methods.changeMember(memberIndex)
        .send({
          from: this.account,
          gasLimit: Math.floor(gasLimit * 1.2),
        })
        .on('transactionHash', (hash) => {
          this.challengeInProgress = true;
          this.$store.commit('SET_PENDING_TX', hash);
        })
        .on('confirmation', async (confirmationNumber) => {
          if (this.confirmBlock === confirmationNumber) {
            this.challengeInProgress = false;
            this.$store.commit('SET_PENDING_TX', '');

            await this.$store.dispatch('candidateLaunch');
            await this.$store.dispatch('connectEthereum', this.web3);
          }
        })
        .on('receipt', async () => {
        })
        .on('error', () => {
          this.$store.commit('SET_PENDING_TX', '');
        });
    },
    async retire () {
      const candidateContract = getContract('Candidate', this.web3, this.candidateContractFromEOA);

      const gasLimit = await candidateContract.methods.retireMember()
        .estimateGas({
          from: this.account,
        });

      await candidateContract.methods.retireMember()
        .send({
          from: this.account,
          gasLimit: Math.floor(gasLimit * 1.2),
        })
        .on('transactionHash', (hash) => {
          this.retirementInProgress = true;
          this.$store.commit('SET_PENDING_TX', hash);
        })
        .on('confirmation', async (confirmationNumber) => {
          if (this.confirmBlock === confirmationNumber) {
            this.retirementInProgress = false;
            this.$store.commit('SET_PENDING_TX', '');

            await this.$store.dispatch('candidateLaunch');
            await this.$store.dispatch('connectEthereum', this.web3);
          }
        })
        .on('error', (error) =>{
            console.log('error', error) ;// eslint-disable-line
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.card-member {
  flex: 1;

  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(96, 97, 112, 0.16);
  background-color: #ffffff;

  padding: 25px 30px;
  margin-bottom: 20px;

  .header-container {
    display: flex;
    align-items: center;

    .member-slot {
      flex: 1;

      display: flex;
      justify-content: flex-end;
    }
  }

  .title-container {
    display: flex;
    align-items: center;

    word-break: break-all;

    .title {
      font-family: Roboto;
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.3;
      letter-spacing: normal;
      text-align: left;
      color: #3e495c;

      margin-top: 3px;
      margin-bottom: 5px;
    }

    .type {
      width: 120px;

      font-family: Roboto;
      font-size: 11px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.36;
      letter-spacing: normal;
      text-align: left;
      color: #3e495c;

      margin-top: 3px;
      margin-left: 4px;
    }
  }


  .sub {
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.36;
    letter-spacing: normal;
    text-align: left;
    color: #86929d;

    margin-bottom: 25px;
  }

  .button-container {
    margin-top: 26px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
