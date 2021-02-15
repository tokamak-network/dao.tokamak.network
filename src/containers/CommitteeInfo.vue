<template>
  <div>
    <!-- <info-committee :title="'Website'" :content="'https://tokamak.network'" :type="'url'"
                    :tooltip="`Website of the operator who runs the staking`"
                    :width="'300'"
    /> -->
    <div class="container">
      <info-committee :title="'Name'" :content="candidate(address) && !canEditName ? candidate(address).name : ''" :type="'name'" style="flex: 1;" />
      <input v-if="canEditName" ref="name" class="edit-input" type="text" :placeholder="candidate(address).name">
      <div v-if="candidateContractFromEOA" class="edit-btn" @click="editName();">Edit</div>
      <div v-if="canEditName" class="cancel-btn" @click="canEditName=false;">Cancle</div>
    </div>
    <div class="container" style="margin-top: 12px;">
      <info-committee :title="'Description'" :content="candidate(address) && !canEditDescription ? candidate(address).description : ''" :type="'description'" style="flex: 1;" />
      <input v-if="canEditDescription" ref="description" class="edit-input" type="text" :placeholder="candidate(address).description">
      <div v-if="candidateContractFromEOA" class="edit-btn" @click="editDescription();">Edit</div>
      <div v-if="canEditDescription" class="cancel-btn" @click="canEditDescription=false;">Cancle</div>
    </div>
    <info-committee :title="'Candidate Address'" :content="candidate(address) ? candidate(address).candidate : '-'" :type="'address'" style="margin-top: 12px;" />
    <info-committee :title="'Candidate Contract'" :content="candidate(address) ? candidate(address).candidateContract : '-'" :type="'address'" style="margin-top: 12px;" />
    <!-- <info-committee :title="'Chain ID'" :content="'9898'" /> -->
    <!-- <info-committee :title="'Commit Count'" :content="'66'" /> -->
    <!-- <info-committee :title="'Recent Commit'" :content="'4시간 전'" /> -->
    <!-- <info-committee :title="'Running Time'" :content="'3달'" /> -->
    <!-- <info-committee :title="'Commission Rate'" :content="'2.5%'"
                    :tooltip="`The commission rate of this operator. It has a value
            between -100% and 100%. (1) + : The operator takes
            the profit from the delegator. (2) - : It distributes the
            operator’s profits to the delegator. (3) 0 : It doesn’t
            divide the profit between the operator and the delegator.`"
                    :width="'317'"
    /> -->
    <!-- <info-committee :title="'Reward'" :content="`${amount} TON`" /> -->
    <info-committee :title="'Total Vote'" :content="`${withComma(wton(totalVotesForCandidate(address)))} TON`" style="margin-top: 12px;" />
    <div style="width: 100%; height: 18px;" />

    <info-committee :title="'My Vote'" :content="`${withComma(wton(myVotes))} TON`" style="margin-top: 12px;" />
    <info-committee :title="'Revotable'" :content="`${withComma(wton(canRevote(address, 0)))} TON`" style="margin-top: 12px;" />
    <info-committee :title="'Withdrawable'" :content="`${withComma(wton(canWithdraw(address, 0)))} TON`" style="margin-top: 12px;" />
    <info-committee :title="'Not Withdrawable'" :content="`${withComma(wton(cannotWithdraw))} TON`" style="margin-top: 12px;" />
    <!-- <info-committee :title="'New Commission Rate'" :content="'0.00 TON'" /> -->
    <!-- <info-committee :title="'New Commission Rate Changed At'" :content="'0.00 TON'" /> -->
    <!-- <info-committee :title="'Withdrawal Delay'" :content="'0.00 TON'" class="last" /> -->
  </div>
</template>

<script>
import { getContract } from '@/utils/contracts';
import { mapGetters, mapState } from 'vuex';
import { WTON, withComma } from '@/utils/helpers';
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
    ]),
    ...mapGetters([
      'candidate',
      'totalVotesForCandidate',
      'canRevote',
      'canWithdraw',
      'notWithdrawableRequests',
      'candidateContractFromEOA',
    ]),
    cannotWithdraw () {
      const requests = this.notWithdrawableRequests(this.address);
      const amount = requests.reduce((prev, cur) => prev + parseInt(cur.amount), 0);
      return amount;
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

      const name = this.$refs.name.value;
      if (!name) {
        return alert('please input your new name!');
      }

      const candidateContract = getContract('Candidate', this.web3, this.candidateContractFromEOA);
      const gasLimit = await candidateContract.methods.setMemo(name)
        .estimateGas({
          from: this.account,
        });

      await candidateContract.methods.setMemo(name)
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
            await this.$store.dispatch('launch');
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
      const sig = this.generateSig(candidate);
      await updateCandidate(candidate.layer2.toLowerCase(), candidate.operator.toLowerCase(), sig, candidate.name, description);
      this.canEditDescription = false;

      await this.$store.dispatch('launch');
      await this.$store.dispatch('connectEthereum', this.web3);
    },
    async generateSig (candidate) {
      const operator = candidate.operator.toLowerCase();
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
</style>
