<template>
  <div class="table">
    <table>
      <tbody>
        <tr v-for="supporter in voters" :key="supporter.account">
          <div class="table-content">
            <div>{{ calcPct(supporter.balance, totalVotes) }}%</div>
            <div>({{ supporter.balance | WTON }} TON)</div>
            <div>{{ supporter.account | hexSlicer }}</div>
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getVotersByCandidate } from '@/api';

import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      address: '',
      voters: [],
      totalVotes: 0,
    };
  },
  computed: {
    ...mapGetters([
      'totalVotesByCandidate',
    ]),
    calcPct () {
      return (vote, totalVotes) => (Number(vote * 100 / totalVotes)).toFixed(2);
    },
  },
  async created () {
    // const address = this.$route.params.address;
    // this.voters = await getVotersByCandidate(address);
    this.voters = await getVotersByCandidate('0x7c53b3a01c9307f3dbdb6c1816b49e76fd2544bd');

    const initialAmount = 0;
    const reducer = (amount, voter) => amount + voter.balance;
    this.totalVotes = this.voters.reduce(reducer, initialAmount);
  },
};
</script>

<style scoped>
table {
  width: 100%;
  margin-top: 10px;
}
table td, table th {
  overflow-wrap: anywhere;
}

.table {
  height: 180px;
  overflow-y: auto;
  background: #ffffff;
}
.table-content {
  display: flex;
  align-items: center;

  white-space: nowrap;

  margin-bottom: 10px;
}
.table-content > div:nth-child(1), .table-content > div:nth-child(2) {
  font-family: Roboto;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #86929d;

  margin-left: 20px;
}
.table-content > div:nth-child(2) {
  font-size: 12px;

  margin-left: 4px;
}
.table-content > div:nth-child(3) {
  flex: 1;

  font-family: Roboto;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: right;
  color: #2a72e5;

  margin-right: 20px;
}
</style>
