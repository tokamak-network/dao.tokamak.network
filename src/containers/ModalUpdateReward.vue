<template>
  <div class="modal-update-reward">
    <div class="label-update-reward">You can get {{ expectedSeig | withComma }} TON reward</div>
    <div class="label">Do you want to continue?</div>
    <div class="button-container">
      <update-button :name="'Update'"
                     :type="'primary'"
                     :width="'110px'"
                     class="btn1"
                     @on-clicked="updateReward"
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
import { calculateExpectedSeig, setNetwork } from 'tokamak-staking-lib';
import { toBN } from 'web3-utils';
import { WTON } from '@/utils/helpers';
import { getContract } from '@/utils/contracts';
import { mapState, mapGetters } from 'vuex';

import Button from '@/components/Button.vue';

export default {
  components: {
    'update-button': Button,
    'close-button': Button,
  },
  data () {
    return {
      address: '',
      expectedSeig: '0',
    };
  },
  computed: {
    ...mapState([
      'account',
      'activityReward',
      'blockNumber',
      'confirmBlock',
      'web3',
    ]),
    ...mapGetters([
      'candidate',
      'candidateContractFromEOA',
      'isCandidate',
    ]),
  },
  watch: {
    '$route.params.address': {
      handler: async function () {
        this.address = this.$route.params.address;
      },
      deep: true,
      immediate: true,
    },
  },
  async created () {
    await this.calcExpectedSeig();
  },
  methods: {
    close () {
      this.$emit('on-closed');
    },
    async calcExpectedSeig () {
      const candidate = this.candidate(this.address);
      if (!candidate) {
        console.log('bug', 'no candidate'); // eslint-disable-line
        return;
      }

      const ton = getContract('TON', this.web3);
      const wton = getContract('WTON', this.web3);
      const coinage = getContract('Coinage', this.web3, candidate.coinage);
      const seigManager = getContract('SeigManager', this.web3);
      const _tot = await seigManager.methods.tot().call();
      const tot = getContract('Coinage', this.web3, _tot);

      const owner = candidate.kind === 'layer2' ? candidate.candidate : candidate.candidateContract;
      const fromBlockNumber = candidate.lastCommitBlockNumber;
      const toBlockNumber = this.blockNumber;
      const [
        userStakedAmount,
        totalStakedAmount,
        pseigRate,
        commissionRate,
        isCommissionRateNegative,
        operatorStakedAmount,
        totalStakedAmountOnLayer2,

        tonTotalSupply,
        tonBalanceOfWTON,
      ] = await Promise.all([
        coinage.methods.balanceOf(this.account).call(),
        tot.methods.totalSupply().call(),
        seigManager.methods.relativeSeigRate().call(),
        seigManager.methods.commissionRates(owner).call(),
        seigManager.methods.isCommissionRateNegative(owner).call(),
        coinage.methods.balanceOf(candidate.operator).call(),
        coinage.methods.totalSupply().call(),

        ton.methods.totalSupply().call(),
        ton.methods.balanceOf(wton._address).call(),
      ]);
      const isOperator = this.isCandidate ? true : false;
      const tos = (toBN(tonTotalSupply).mul(toBN(10e8)))
        .add(toBN(totalStakedAmount))
        .sub(toBN(tonBalanceOfWTON).mul(toBN(10e8)));

      setNetwork('https://sepolia.infura.io/v3/27113ffbad864e8ba47c7d993a738a10');
      const expectedSeig = calculateExpectedSeig(
        toBN(fromBlockNumber),
        toBN(toBlockNumber),
        toBN(userStakedAmount),
        toBN(totalStakedAmount),
        tos,
        toBN(pseigRate),
        toBN(commissionRate),
        isCommissionRateNegative,
        toBN(operatorStakedAmount),
        toBN(totalStakedAmountOnLayer2),
        isOperator,
      );
      this.expectedSeig = WTON(expectedSeig);
    },
    async updateReward () {
      const makePos = (v1, v2) => {
        v1 = toBN(v1);
        v2 = toBN(v2);

        const a = v1.mul(toBN(2).pow(toBN(128)));
        return a.add(v2).toString();
      };

      const candidate = this.candidate(this.address);
      if (!candidate) {
        console.log('bug', 'no candidate'); // eslint-disable-line
        return;
      }
      if (candidate.kind === 'layer2' && !candidate.layer2 === '0x2000fc16911fc044130c29c1aa49d3e0b101716a') {
        const layer2Contract = getContract('Layer2', this.web3, candidate.layer2);
        const [
          costNRB,
          NRELength,
          currentForkNumber,
        ] = await Promise.all([
          layer2Contract.methods.COST_NRB().call(),
          layer2Contract.methods.NRELength().call(),
          layer2Contract.methods.currentFork().call(),
        ]);
        const fork = await layer2Contract.methods.forks(currentForkNumber).call();
        const epochNumber = parseInt(fork.lastEpoch) + 1;
        const startBlockNumber = parseInt(fork.lastBlock) + 1;
        const endBlockNumber = parseInt(startBlockNumber) + parseInt(NRELength) - 1;

        // pos1 = fork number * 2^128 + epoch number
        // pos2 = start block number * 2^128 + end block number
        const pos1 = makePos(currentForkNumber, epochNumber);
        const pos2 = makePos(startBlockNumber, endBlockNumber);
        const dummyBytes = '0xdb431b544b2f5468e3f771d7843d9c5df3b4edcf8bc1c599f18f0b4ea8709bc3';

        const gasLimit = await layer2Contract.methods.submitNRE(
          pos1,
          pos2,
          dummyBytes, // epochStateRoot
          dummyBytes, // epochTransactionsRoot
          dummyBytes, // epochReceiptsRoot
        ).estimateGas({
          from: this.account,
          value: costNRB,
        });

        try {
          await layer2Contract.methods.submitNRE(
            pos1,
            pos2,
            dummyBytes, // epochStateRoot
            dummyBytes, // epochTransactionsRoot
            dummyBytes, // epochReceiptsRoot
          )
            .send({
              from: this.account,
              value: costNRB,
              gasLimit: Math.floor(gasLimit * 1.2),
            })
            .on('transactionHash', (hash) => {
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
            .on('receipt', () => {
            })
            .on('error', () => {
              this.$store.commit('SET_PENDING_TX', '');
            });
        } catch (error) {
          console.log('error', error) ;// eslint-disable-line
        }

      } else {
        const candidateContract = getContract('Candidate', this.web3, candidate.candidateContract);
        const gasLimit = await candidateContract.methods.updateSeigniorage()
          .estimateGas({
            from: this.account,
          });

        await candidateContract.methods.updateSeigniorage()
          .send({
            from: this.account,
            gasLimit: Math.floor(gasLimit * 1.2),
          })
          .on('transactionHash', (hash) => {
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
          .on('receipt', () => {
          })
          .on('error', () => {
            this.$store.commit('SET_PENDING_TX', '');
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-update-reward {
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(96, 97, 112, 0.16);
  background-color: #ffffff;

  .label-update-reward {
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
