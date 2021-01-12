<template>
  <div>
    <!-- <info-committee :title="'Website'" :content="'https://tokamak.network'" :type="'url'"
                    :tooltip="`Website of the operator who runs the staking`"
                    :width="'300'"
    /> -->
    <info-committee :title="'Description'" :content="'tokamak netwokr operator1'" :type="'description'" />
    <info-committee :title="'Candidate Address'" :content="candidate(address) ? candidate(address).operator : '-'" :type="'address'" />
    <info-committee :title="'Candidate Contract'" :content="candidate(address) ? candidate(address).layer2 : '-'" :type="'address'" />
    <!-- <info-committee :title="'Chain ID'" :content="'9898'" /> -->
    <info-committee :title="'Commit Count'" :content="'66'" />
    <info-committee :title="'Recent Commit'" :content="'4시간 전'" />
    <info-committee :title="'Running Time'" :content="'3달'" />
    <info-committee :title="'Commission Rate'" :content="'2.5%'"
                    :tooltip="`The commission rate of this operator. It has a value
            between -100% and 100%. (1) + : The operator takes
            the profit from the delegator. (2) - : It distributes the
            operator’s profits to the delegator. (3) 0 : It doesn’t
            divide the profit between the operator and the delegator.`"
                    :width="'317'"
    />
    <info-committee :title="'Reward'" :content="`${amount} TON`" />
    <info-committee :title="'Total Voted'" :content="'0.00 TON'" />
    <info-committee :title="'My Voted'" :content="'0.00 TON'" />
    <info-committee :title="'Not Withdrawable'" :content="'0.00 TON'" />
    <info-committee :title="'Withdrawable'" :content="'0.00 TON'" />
    <info-committee :title="'New Commission Rate'" :content="'0.00 TON'" />
    <info-committee :title="'New Commission Rate Changed At'" :content="'0.00 TON'" />
    <info-committee :title="'Withdrawal Delay'" :content="'0.00 TON'" class="last" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getContracts } from '@/utils/contracts';

import InfoCommittee from '@/components/InfoCommittee.vue';

export default {
  components: {
    'info-committee': InfoCommittee,
  },
  data () {
    return {
      amount: 1,
      address: '',
    };
  },
  computed: {
    ...mapGetters([
      'candidate',
    ]),
  },
  async created () {
    this.address = this.$route.params.address;
    const daoCommittee = getContracts('DAOCommittee', this.web3);

    this.amount = await daoCommittee.methods.totalSupplyOnCandidate(this.address).call();
  },
};
</script>

<style scoped>
.last {
  margin-bottom: -15px;
}
</style>
