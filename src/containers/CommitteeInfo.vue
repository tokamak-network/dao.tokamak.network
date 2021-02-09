<template>
  <div>
    <!-- <info-committee :title="'Website'" :content="'https://tokamak.network'" :type="'url'"
                    :tooltip="`Website of the operator who runs the staking`"
                    :width="'300'"
    /> -->
    <info-committee :title="'Name'" :content="candidate(address) ? candidate(address).name :'-'" :type="'name'" />
    <info-committee :title="'Description'" :content="candidate(address).description ? candidate(address).description : '-'" :type="'description'" />
    <info-committee :title="'Candidate Address'" :content="candidate(address) ? candidate(address).candidate : '-'" :type="'address'" />
    <info-committee :title="'Candidate Contract'" :content="candidate(address) ? candidate(address).candidateContract : '-'" :type="'address'" />
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
    <info-committee :title="'Total Vote'" :content="`${wton(totalVotesForCandidate(address))} TON`" />
    <div style="width: 100%; height: 18px;" />

    <info-committee :title="'My Vote'" :content="`${wton(myVotes)} TON`" />
    <info-committee :title="'Revotable'" :content="`${wton(canRevote(address, 0))} TON`" />
    <info-committee :title="'Withdrawable'" :content="`${wton(canWithdraw(address, 0))} TON`" />
    <info-committee :title="'Not Withdrawable'" :content="`${wton(cannotWithdraw)} TON`" />
    <!-- <info-committee :title="'New Commission Rate'" :content="'0.00 TON'" /> -->
    <!-- <info-committee :title="'New Commission Rate Changed At'" :content="'0.00 TON'" /> -->
    <!-- <info-committee :title="'Withdrawal Delay'" :content="'0.00 TON'" class="last" /> -->
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { WTON } from '@/utils/helpers';

import InfoCommittee from '@/components/InfoCommittee.vue';

export default {
  components: {
    'info-committee': InfoCommittee,
  },
  data () {
    return {
      address: '',
    };
  },
  computed: {
    ...mapState([
      'myVotes',
    ]),
    ...mapGetters([
      'candidate',

      'totalVotesForCandidate',
      'canRevote',
      'canWithdraw',
      'notWithdrawableRequests',
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
  },
};
</script>

<style scoped>
.last {
  margin-bottom: -15px;
}
</style>
