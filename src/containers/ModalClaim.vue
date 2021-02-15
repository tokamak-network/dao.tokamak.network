<template>
  <div>
    <div v-for="(candidate) in agendaVotesByCandidates" :key="candidate.candidateContract" class="modal-claim">
      <img src="@/assets/modal-close.svg" alt="" width="30" height="30"
           @click="close"
      >
      <div v-if="agendaVotesByCandidates.length < 2" class="title">You can claim {{ activityReward }}</div>
      <div v-else class="title">You can claim {{ candidate.claimableAmount | withComma }}</div>

      <div v-if="agendaVotesByCandidates.length < 2 && canClaimValue" class="question">Do you wish to continue?</div>
      <div v-else-if="agendaVotesByCandidates.length > 1 && canClaimAmount(candidate.claimableAmount)" class="question">Do you wish to continue?</div>
      <div v-else class="question">There is no activity fee to be paid.</div>

      <div class="button">
        <button-comp v-if="agendaVotesByCandidates.length < 2 && canClaimValue"
                     :name="'OK'"
                     :type="'primary'"
                     class="left"
                     :width="'110px'"
                     @on-clicked="claimCandidate(candidate.candidateContract)"
        />
        <button-comp v-if="agendaVotesByCandidates.length > 1 && canClaimAmount(candidate.claimableAmount)"
                     :name="'OK'"
                     :type="'primary'"
                     class="left"
                     :width="'110px'"
                     @on-clicked="claimCandidate(candidate.candidateContract)"
        />
        <button-comp
          :name="'Close'"
          :type="'vote'"
          class="right"
          :width="'110px'"
          @on-clicked="close"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import { mapState } from 'vuex';
import { getContract } from '@/utils/contracts';
import Web3 from 'web3';

export default {
  components: {
    'button-comp': Button,
  },
  computed: {
    ...mapState([
      'activityReward',
      'confirmBlock',
      'web3',
      'account',
      'agendaVotesByCandidates',
    ]),
    canClaimValue () {
      let amount = this.activityReward + '';
      if (amount === null || amount.length === 0 || amount === 0 || amount === '0') return false;
      amount = amount.replaceAll('TON', '');
      amount = amount.replaceAll(' ', '');
      if (amount !== '0.000000000000000000' && amount !== '0' && amount !== '0.00') {
        return true;
      } else return false;
    },
  },
  methods: {
    close () {
      this.$emit('on-closed');
    },
    async claim () {
      let web3 = this.web3;
      if (web3 == null) web3 = new Web3(window.ethereum);
      const daoCommitteeProxy = getContract('DAOCommitteeProxy', web3);
      try {
        await daoCommitteeProxy.methods.claimActivityReward().send({
          from: this.account,
        })
          .on('transactionHash', async (hash) => {
            this.$store.commit('SET_PENDING_TX', hash);
            this.close();
          })
          .on('confirmation', async (confirmationNumber) => {
            if (this.confirmBlock === confirmationNumber) {
              this.$store.commit('SET_PENDING_TX', '');
              await this.$store.dispatch('launch');
              await this.$store.dispatch('connectEthereum', this.web3);
            }
          })
          .on('receipt', () => {
          })
          .on('error', () => {
            this.$store.commit('SET_PENDING_TX', '');
          });
      } catch (err) {
        //console.log('err', err); // eslint-disable-line
      }
    },
    async claimCandidate (_candiateContract) {
      const CandidateContract = getContract('Candidate', this.web3, _candiateContract);
      if (CandidateContract != null && CandidateContract) {
        try {
          await CandidateContract.methods.claimActivityReward().send({
            from: this.account,
          })
            .on('transactionHash', async (hash) => {
              this.$store.commit('SET_PENDING_TX', hash);
              this.close();
            })
            .on('confirmation', async (confirmationNumber) => {
              if (this.confirmBlock === confirmationNumber) {
                this.$store.commit('SET_PENDING_TX', '');
                await this.$store.dispatch('launch');
                await this.$store.dispatch('connectEthereum', this.web3);
              }
            })
            .on('receipt', () => {
            })
            .on('error', () => {
              this.$store.commit('SET_PENDING_TX', '');
            });
        } catch (err) {
          console.log('err', err); // eslint-disable-line
        }
      } else {
        alert('Can\'t find conbtract. Check the network');
      }
    },
    canClaimAmount (amount) {
      if (amount == null || amount.length === 0 || amount === 0 || amount === '0') return false;
      else {
        amount = amount + '';
        amount = amount.replaceAll('TON', '');
        amount = amount.replaceAll(' ', '');
        if (amount !== '0.000000000000000000' && amount !== '0' && amount !== '0.00') {
          return true;
        } else return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-claim {
  position: relative;
  padding: 45px 50px 40px 50px;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  > img {
    position: absolute;
    right: 10px;
    top: 10px;
    &:hover {
      cursor: pointer;
    }
  }
  > .title {
    font-size: 24px;
    color: #3e495c;
    margin-bottom: 15px;
  }
  > .question {
    font-size: 14px;
    color: #818992;
    margin-bottom: 25px;
  }
  > .button {
    display: flex;
    justify-content: center;
    > .right {
      margin-left: 15px;
    }
  }
}
</style>
