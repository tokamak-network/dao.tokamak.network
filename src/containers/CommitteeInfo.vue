<template>
  <div>
    <!-- <info-committee :title="'Website'" :content="'https://tokamak.network'" :type="'url'"
                    :tooltip="`Website of the operator who runs the staking`"
                    :width="'300'"
    /> -->
    <div class="container">
      <info-committee :title="'Name'" :content="candidate(address) && !canEditName ? candidate(address).name : ''" :type="'name'" style="flex: 1;" />
      <input v-if="canEditName && candidate(address).candidate.toLowerCase() === account.toLowerCase()" ref="name" class="edit-input" type="text" :placeholder="candidate(address).name">
      <div v-if="candidateContractFromEOA && candidate(address).candidate.toLowerCase() === account.toLowerCase()" class="edit-btn" @click="editName();">Edit</div>
      <div v-if="canEditName && candidate(address).candidate.toLowerCase() === account.toLowerCase()" class="cancel-btn" @click="canEditName=false;">Cancle</div>
    </div>
    <div class="container" style="margin-top: 12px;">
      <info-committee :title="'Description'" :content="candidate(address) && !canEditDescription ? candidate(address).description : ''" :type="'description'" style="flex: 1;" />
      <input v-if="canEditDescription && candidate(address).candidate.toLowerCase() === account.toLowerCase()" ref="description" class="edit-input" type="text" :placeholder="candidate(address).description">
      <div v-if="candidateContractFromEOA && candidate(address).candidate.toLowerCase() === account.toLowerCase()" class="edit-btn" @click="editDescription();">Edit</div>
      <div v-if="canEditDescription && candidate(address).candidate.toLowerCase() === account.toLowerCase()" class="cancel-btn" @click="canEditDescription=false;">Cancle</div>
    </div>
    <info-committee :title="$mq === 'mobile' || $mq === 'tablet' ? 'Candidate' : 'Candidate Address'"
                    :content="candidate(address) ? candidate(address).candidate : '-'" :type="'address'" style="margin-top: 12px;"
    />
    <info-committee :title="$mq === 'mobile' || $mq === 'tablet' ? 'Contract' : 'Candidate Contract'" :content="candidate(address) ? candidate(address).candidateContract : '-'" :type="'address'" style="margin-top: 12px;" />
    <info-committee :title="'Total Vote'" :content="`${withComma(wton(totalVotesForCandidate(address)))} TON`" style="margin-top: 12px;" />
    <info-committee :title="'Last Reward Update'"
                    :content="`${candidate(address) ? date2(candidate(address).lastCommitAt) : '-'}`"
                    style="margin-top: 12px;"
    />
    <div style="width: 100%; height: 18px;" />
    <info-committee :title="'My Vote'" :content="`${withComma(wton(myVotes))} TON`" style="margin-top: 12px;" />
    <info-committee :title="'Revotable'" :content="`${withComma(wton(canRevote(address, 0)))} TON`" style="margin-top: 12px;" />
    <info-committee :title="'Withdrawable'" :content="`${withComma(wton(canWithdraw(address, 0)))} TON`" style="margin-top: 12px;" />
    <info-committee :title="'Not Withdrawable'" :content="`${withComma(wton(cannotWithdraw))} TON`" style="margin-top: 12px;" />
    <info-committee :title="'My Winning Probability'" :content="powerTONWinningProbability" style="margin-top: 12px;" />
    <div class="label-power-ton">
      <span>(You can check the amount of power </span>
      <a class="label-power-ton-link" target="_blank" rel="noopener noreferrer"
         href="https://staking.tokamak.network"
      >here</a>
      <span>)</span>
    </div>
  </div>
</template>

<script>
import { getContract } from '@/utils/contracts';
import { mapGetters, mapState } from 'vuex';
import { WTON, withComma, date2 } from '@/utils/helpers';
import { updateCandidate, getRandomKey } from '@/api';
import BigNumber from 'bignumber.js';

import InfoCommittee from '@/components/InfoCommittee.vue';

export default {
  components: {
    'info-committee': InfoCommittee,
  },
  data () {
    return {
      address: '',
      canEditName: false,
      canEditDescription: false,
    };
  },
  computed: {
    ...mapState([
      'myVotes',
      'account',
      'web3',
      'confirmBlock',
      'winningProbability',
    ]),
    ...mapGetters([
      'candidate',
      'totalVotesForCandidate',
      'canRevote',
      'canWithdraw',
      'notWithdrawableRequests',
      'candidateContractFromEOA',
      'myCandidatesArrays',
    ]),
    cannotWithdraw () {
      const requests = this.notWithdrawableRequests(this.address);
      const amount = requests.reduce((prev, cur) => prev + parseInt(cur.amount), 0);
      return amount;
    },
    date2 () {
      return (timestamp) => date2(timestamp);
    },
    powerTONWinningProbability () {
      return this.winningProbability === '' ? '0.00%' : this.winningProbability;
    },
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
  methods: {
    wton (amount) {
      if (!amount) return WTON(0);
      return WTON(amount);
    },
    withComma (n) {
      return withComma(n);
    },
    async editName () {
      if (!this.canEditName) {
        this.canEditName = true;
        return;
      }
      if (this.candidate(this.address).candidate.toLowerCase() !== this.account.toLowerCase()) {
        alert('You are not the operator of this candidate');
        return;
      }
      const name = this.$refs.name.value;
      if (!name) {
        return alert('please input your new name!');
      }

      let candidateContractFromEOA = this.candidateContractFromEOA;
      if (this.myCandidatesArrays !== null && this.myCandidatesArrays.length > 1) {
        this.myCandidatesArrays.forEach(e=>{
          if (e.candidateContract === this.candidate(this.address).candidateContract) {
            candidateContractFromEOA = e.candidateContract;
          }
        });
      }
      const committeeContract = getContract('DAOCommitteeProxy', this.web3);
      const gasLimit = await committeeContract.methods.setMemoOnCandidateContract(candidateContractFromEOA, name)
        .estimateGas({
          from: this.account,
        });

      await committeeContract.methods.setMemoOnCandidateContract(candidateContractFromEOA, name)
        .send({
          from: this.account,
          gasLimit: Math.floor(gasLimit * 1.2),
        })
        .on('transactionHash', (hash) => {
          this.$store.commit('SET_PENDING_TX', hash);
          this.canEditName = false;
        })
        .on('confirmation', async (confirmationNumber) => {
          if (this.confirmBlock === confirmationNumber) {
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
    async editDescription () {
      if (!this.canEditDescription) {
        this.canEditDescription = true;
        return;
      }

      const description = this.$refs.description.value;
      if (!description) {
        return alert('please input your new description!');
      }

      const candidate = this.candidate(this.address);
      const sig = await this.generateSig(candidate);
      await updateCandidate(candidate.layer2.toLowerCase(), candidate.candidate.toLowerCase(), sig, candidate.name, description);
      this.canEditDescription = false;

      await this.$store.dispatch('candidateLaunch');
      await this.$store.dispatch('connectEthereum', this.web3);
    },
    async generateSig (candidate) {
      const operator = candidate.candidate.toLowerCase();
      const layer2 = candidate.layer2.toLowerCase();

      const random = await getRandomKey(operator);
      if (random) {
        const randomBN = new BigNumber(random).toFixed(0);
        const soliditySha3 = await this.web3.utils.soliditySha3(
          { type: 'string', value: operator },
          { type: 'uint256', value: randomBN },
          { type: 'string', value: layer2 },
        );
        const sig = await this.web3.eth.personal.sign(soliditySha3, operator, '');
        return sig;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.last {
  margin-bottom: -15px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit-input {
  width: 330px;
  height: 32px;
  border-radius: 4px;
  border: solid 1px #dfe4ee;
  background-color: #ffffff;

  outline: none;

  text-align: right;
  padding-right: 15px;

  font-family: Roboto;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: right;
  color: #3e495c;

  margin-left: 10px;
}

.edit-btn {
  height: 18px;

  font-family: Roboto;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: right;
  color: #2a72e5;

  margin-left: 10px;

  &:hover {
    cursor: pointer;
  }
}

.cancel-btn {
  height: 18px;

  font-family: Roboto;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: right;
  color: #818992;

  margin-left: 10px;

  &:hover {
    cursor: pointer;
  }
}

.label-power-ton {
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: 0.3px;
  text-align: left;
  color: #3e495c;

  margin-top: -13px;

  &-link {
    text-decoration: none;
    color: #2a72e5;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
