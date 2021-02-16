<template>
  <div class="modal-claim-mobile">
    <img class="modal-close-btn"
         src="@/assets/modal-close.svg" alt=""
         width="30" height="30"
         @click="close();"
    >
    <div class="label1">You can claim {{ claimableAmount | TON | withComma }} TON</div>
    <div class="label2">Do you want to continue?</div>
    <div class="btn-container">
      <div class="ok-btn" @click="claim();">OK</div>
      <div class="close-btn" @click="close();">Close</div>
    </div>
  </div>
</template>

<script>
import { getContract } from '@/utils/contracts';

import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState([
      'account',
      'web3',
    ]),
    ...mapGetters([
      'claimableAmount',
    ]),
    candidateFromCandidateContract () {
      const candidateContract = this.candidateContractFromEOA;
      return this.candidate(candidateContract);
    },
  },
  methods: {
    close () {
      this.$emit('on-closed');
    },
    async claim () {
      const daoCommitteeProxy = getContract('DAOCommitteeProxy', this.web3);

      const gasLimit = await daoCommitteeProxy.methods.claimActivityReward()
        .estimateGas({
          from: this.account,
        });

      await daoCommitteeProxy.methods.claimActivityReward()
        .send({
          from: this.account,
          gasLimit: Math.floor(gasLimit * 1.2),
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
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-claim-mobile {
  position: relative;

  height: 209px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .modal-close-btn {
    position: absolute;
    top: 10px;
    right: 10px;

    &:hover {
      cursor: pointer;
    }
  }

  .label1 {
    font-family: Roboto;
    font-size: 22px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
    color: #3e495c;
  }

  .label2 {
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
    color: #818992;

    margin-top: 18px;
  }

  .btn-container {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 30px;

    .ok-btn {
      padding: 12px 66px;

      border-radius: 4px;
      box-shadow: 0 3px 8px 0 rgba(49, 127, 203, 0.25);
      background-image: linear-gradient(to bottom, #1f8efa, #2a72e5);

      font-family: Roboto;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.36;
      letter-spacing: normal;
      text-align: center;
      color: #ffffff;

      margin-right: 10px;

      &:hover {
        cursor: pointer;
      }
    }

    .close-btn {
      padding: 12px 57px;
      border-radius: 4px;
      border: solid 1px #dfe4ee;
      background-color: #ffffff;

      font-family: Roboto;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.36;
      letter-spacing: normal;
      text-align: center;
      color: #3e495c;

      margin-left: 10px;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
