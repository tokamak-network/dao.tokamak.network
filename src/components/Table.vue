<template>
  <div class="table">
    <table>
      <tbody>
        <tr v-for="voter in votersWithBalance" :key="voter.user.id">
          <div v-if="sumOfVotes > 0 && voter.stakeOf!=0" class="table-content">
            <div>{{ voter.user.id | hexSlicer }}</div>
            <div>{{ calcPct(voter.stakeOf, sumOfVotes) }}% </div>
            <div>({{ voter.stakeOf | WTON | withComma }} TON)</div>
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'sumOfVotes',
      'votersWithBalance',
    ]),
    calcPct () {
      return (vote, totalVotes) => (Number(vote * 100 / totalVotes)).toFixed(2);
    },
  },
};
</script>

<style lang="scss" scoped>
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
  padding-left: 20px;
  padding-right: 20px;
}
.table-content > div:nth-child(1) {
  font-family: Roboto;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #2a72e5;

  // margin-left: 20px;
}
.table-content > div:nth-child(2) {
  font-size: 12px;

  margin-left: 4px;
}
.table-content > div:nth-child(3), .table-content > div:nth-child(2) {
  flex: 1;

  font-family: Roboto;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: right;
  color: #86929d;

  margin-right: 5px;
}
</style>
