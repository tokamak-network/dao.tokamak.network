<template>
  <div class="card-stats">
    <card-container :title="'Your Stats'">
      <template #body>
        <div class="stats">
          <div class="title">Claimable TON</div>
          <div class="content">{{ activityReward }}</div>
        </div>
        <div class="stats">
          <div class="title"># of Agendas</div>
          <!-- <div class="content">{{ myVote.length }} Agendas</div> -->
        </div>
      </template>
    </card-container>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import { mapState } from 'vuex';
// import { getContracts } from '@/utils/contracts';

export default {
  components: {
    'card-container': Card,
  },
  asyncComputed: {
    ...mapState([
      'account',
      'web3',
      'myVote',
      'activityReward',
    ]),
    // claimableTON () {
    //   return async () => {
    //     const daoCommittee = getContracts('DAOCommittee', this.web3);
    //     const a = await daoCommittee.methods.getClaimableActivityReward(this.account).call();
    //     // console.log(a);
    //     return a;
    //   };
    // },
  },
  created () {
    // this.claimableTON();
  },
  // methods: {
  //   async claimableTON () {
  //     const daoCommittee = getContracts('DAOCommittee', this.web3);
  //     const a = await daoCommittee.methods.getClaimableActivityReward(this.account).call();
  //     return a;
  //   },
  // },
};
</script>

<style scoped>
.card-stats {
}

.stats {
  display: flex;
  align-items: center;

  padding-left: 16px;
  padding-right: 16px;
}
.stats:first-child {
  padding-top: 16px;
  margin-bottom: 16px;
}
.stats:last-child {
  padding-bottom: 16px;
}

.stats .title {
  flex: 1;

  font-family: Roboto;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #86929d;
}
.stats .content {
  font-family: Roboto;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: right;
  color: #2a72e5;
}
</style>
