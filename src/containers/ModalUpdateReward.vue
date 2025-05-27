<template>
  <div class="modal-update-reward">
    <div class="label-update-reward">
      You can get
      <div v-if="loading" class="dot-flashing"></div>
      <div v-else :style="{margin: '0px 6px'}">
        {{  withComma(expectedSeig) }}
      </div>
      TON reward
    </div>
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
        :type="'hide'"
        :width="'110px'"
        class="btn2"
        @on-clicked="close"
      />
    </div>
  </div>
</template>

<script>
// import { calculateExpectedSeig, setNetwork } from 'tokamak-staking-lib';
import { toBN } from 'web3-utils';
import { WTON, calcMaxSeigs, calcNewFactor, applyFactor, setFactor, withComma } from '@/utils/helpers';
import { getContract } from '@/utils/contracts';
import { mapState, mapGetters } from 'vuex';
import { ethers } from 'ethers';
const BigNumber = ethers.BigNumber;

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
      loading: true,
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
    withComma(reward) {
      return withComma(reward);
    },
    async calcExpectedSeig () {
      const RAY = ethers.BigNumber.from('1' + '0'.repeat(27));
      const candidate = this.candidate(this.address);
      if (!candidate) {
        console.log('bug', 'no candidate'); // eslint-disable-line
        return;
      }
      try {
        const ton = getContract('TON', this.web3);
        const wton = getContract('WTON', this.web3);
        const coinage = getContract('Coinage', this.web3, candidate.coinage);

        const seigManager = getContract('SeigManager', this.web3);
        const _tot = await seigManager.methods.tot().call();
        const tot = getContract('Tot', this.web3, _tot);
        const owner = candidate.kind === 'layer2' ? candidate.candidate : candidate.candidateContract;
        // const fromBlockNumber = candidate.lastCommitBlockNumber;
        const toBlockNumber = this.blockNumber;

        const userStakedAmount = await coinage.methods.balanceOf(this.account).call();
        const totalStakedAmount = await tot.methods.totalSupply().call();
        // const pseigRate = await seigManager.methods.relativeSeigRate().call();
        const tonTotalSupply = await ton.methods.totalSupply().call();
        const tonBalanceOfWTON = await ton.methods.balanceOf(wton._address).call();
        // const commissionRate = await seigManager.methods.commissionRates(owner).call();
        // const operatorStakedAmount = await coinage.methods.balanceOf(candidate.candidate).call();
        const isCommissionRateNegative = await seigManager.methods.isCommissionRateNegative(owner).call();
        const totalStakedAmountOnLayer2 = await coinage.methods.totalSupply().call();

        const lastSeigBlock = await seigManager.methods.lastSeigBlock().call();
        const seigPerBlock = await seigManager.methods.seigPerBlock().call();
        const relativeSeigRate = await seigManager.methods.relativeSeigRate().call();

        const isOperator = this.isCandidate ? true : false;
        const tos = (toBN(tonTotalSupply).mul(toBN(10e8)))
          .add(toBN(totalStakedAmount))
          .sub(toBN(tonBalanceOfWTON).mul(toBN(10e8)));

        const totFactor = await tot.methods.factor().call();
        const totBalanceAndFactor = await tot.methods.getBalanceAndFactor(candidate.candidateContract).call();

        const maxSeig = await calcMaxSeigs(lastSeigBlock, seigPerBlock, toBlockNumber);
        const stakedSeig1 = maxSeig.mul(totalStakedAmount).div(BigNumber.from(tos.toString()));
        const unstakedSeig = maxSeig.sub(stakedSeig1);
        const stakedSeig = stakedSeig1.add(unstakedSeig.mul(relativeSeigRate).div(RAY));

        const nextTotTotalSupply = BigNumber.from(totalStakedAmount).add(stakedSeig);
        const newTotFactor = await calcNewFactor (totalStakedAmount, nextTotTotalSupply, totFactor);
        const newFactorSet = await setFactor(newTotFactor);

        const nextBalanceOfLayerInTot = await applyFactor(newFactorSet?.factor, newFactorSet?.refactorCount, totBalanceAndFactor[0].balance, totBalanceAndFactor[0].refactoredCount);

        const commissionRates = await seigManager.methods.commissionRates(candidate.candidateContract).call();

        const seigOfLayer = nextBalanceOfLayerInTot.sub(totalStakedAmountOnLayer2);
        let operatorSeigs = ethers.constants.Zero;

        let seig;

        if (commissionRates.toString() !== ethers.constants.Zero) {
          if (!isCommissionRateNegative) {
            operatorSeigs = seigOfLayer.mul(commissionRates).div(RAY);
            const restSeigs = seigOfLayer.sub(operatorSeigs);
            const userSeig = restSeigs.mul(BigNumber.from(userStakedAmount)).div(BigNumber.from(candidate.stakedAmount));
            seig = isOperator ? userSeig.add(operatorSeigs) : userSeig;
          }
        } else {
          seig = candidate.stakedAmount === '0' ? 0 : seigOfLayer.mul(BigNumber.from(userStakedAmount)).div(BigNumber.from(candidate.stakedAmount));
        }

        this.expectedSeig = WTON(seig);
        this.loading = false;
      } catch (e) {
        console.log(e); // eslint-disable-line
      }
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
    display: flex;
    flex-direction: row;
    justify-content: center;

    padding-top: 45px;

    margin-bottom: 15px;
  }

  .dot-flashing {
    position: relative;
    width: 6px;
    height: 6px;
    top: 15px;
    border-radius: 5px;
    margin: 0px 25px;
    background-color: #3e495c;
    color: #3e495c;
    animation: dot-flashing 1s infinite linear alternate;
    animation-delay: 0.5s;
  }
  .dot-flashing::before, .dot-flashing::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
  }
  .dot-flashing::before {
    left: -15px;
    width: 6px;
    height: 6px;
    border-radius: 5px;
    background-color: #3e495c;
    color: #3e495c;
    animation: dot-flashing 1s infinite alternate;
    animation-delay: 0s;
  }
  .dot-flashing::after {
    left: 15px;
    width: 6px;
    height: 6px;
    border-radius: 5px;
    background-color: #3e495c;
    color: #3e495c;
    animation: dot-flashing 1s infinite alternate;
    animation-delay: 1s;
  }

  @keyframes dot-flashing {
    0% {
      background-color: #3e495c;
    }
    50%, 100% {
      background-color: rgba(152, 128, 255, 0.2);
    }
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
