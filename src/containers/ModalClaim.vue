<template>
  <div class="modal-claim">
    <div class="label-claimable">You can claim {{ activityReward | withComma }} TON</div>
    <div class="label">Do you want to continue?</div>
    <div class="button-container">
      <claim-button :name="'Claim'"
                    :type="'primary'"
                    :width="'110px'"
                    class="btn1"
                    @on-clicked="claim"
      />
      <close-button
        :name="'Close'"
        :type="'vote'"
        :width="'110px'"
        class="btn2"
        @on-clicked="close"
      />
    </div>
  </div>
</template>

<script>
import { getContract } from '@/utils/contracts';
import { mapState, mapGetters } from 'vuex';

import Button from '@/components/Button.vue';

export default {
  components: {
    'claim-button': Button,
    'close-button': Button,
  },
  computed: {
    ...mapState([
      'account',
      'activityReward',
      'confirmBlock',
      'web3',
    ]),
    ...mapGetters([
      'candidateContractFromEOA',
    ]),
  },
  methods: {
    close () {
      this.$emit('on-closed');
    },
    async claim () {

      const candidateContract = getContract('Candidate', this.web3, this.candidateContractFromEOA);

      // const gasLimit = await candidateContract.methods.claimActivityReward()
      //   .estimateGas({
      //     from: this.account,
      //   });
      // console.log(gasLimit);
      await candidateContract.methods.claimActivityReward()
        .send({
          from: this.account,
          // gasLimit: Math.floor(gasLimit * 1.2),
        })
        .on('transactionHash', async (hash) => {
          this.$store.commit('SET_PENDING_TX', hash);
          this.close();
        })
        .on('confirmation', async (confirmationNumber) => {
          if (this.confirmBlock === confirmationNumber) {
            this.$store.commit('SET_PENDING_TX', '');
            await this.$store.dispatch('candidateLaunch');
            await this.$store.dispatch('connectEthereum', this.web3);
          }
        })
        .on('error', () => {
          this.$store.commit('SET_PENDING_TX', '');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-claim {
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(96, 97, 112, 0.16);
  background-color: #ffffff;

  .label-claimable {
    font-family: Roboto;
    font-size: 24px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: center;
    color: #3e495c;

    padding-top: 45px;

    margin-bottom: 15px;
  }

  .label {
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: normal;
    text-align: center;
    color: #818992;

    margin-bottom: 25px;
  }

  .button-container {
    display: flex;
    justify-content: center;

    padding-bottom: 40px;

    .btn1 {
      margin-right: 7.5px;
    }
    .btn2 {
      margin-left: 7.5px;
    }
  }
}
</style>
