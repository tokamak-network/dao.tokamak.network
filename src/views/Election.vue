<template>
  <div class="election">
    <div v-if="candidateLaunched" class="container">
      <div class="wrapper"
           :style="[
             $mq === 'desktop' || $mq === 'tablet' ? { 'flex-direction': 'row' } : { 'flex-direction': 'column' },
           ]"
      >
        <div class="election-container">
          <!-- <div class="header header-member">DAO Committee Members</div> -->
          <div class="header-tooltip">
            <div class="header header-member">DAO Committee Members</div>
            <img
              src="@/assets/tooltip.png" alt=""
              width="16" height="16"
            >
            <div class="tooltip1">
              <img src="@/assets/arrow-tooltip.png" alt=""
                   width="4" height="6"
              >
              <div class="tooltip-content">
                DAO candidates with the most staked TON are eligible to serve as DAO committee members and vote on DAO agendas. Currently, there are three members.
              </div>
            </div>
          </div>
          <card-member v-for="memberIndex in membersArray" :key="memberIndex"
                       :member-index="memberIndex"
          />
          <div class="header-tooltip">
            <div class="header header-nonmember">Other DAO Candidates</div>
            <img
              src="@/assets/tooltip.png" alt=""
              width="16" height="16"
            >
            <div class="tooltip2">
              <img src="@/assets/arrow-tooltip.png" alt=""
                   width="4" height="6"
              >
              <div class="tooltip-content">
                An operator registered as a DAO candidate who has staked a minimum of 1,000.1 TON (non-withdrawable).
              </div>
            </div>
          </div>
          <card-nonmember v-for="nonmember in sortedNonmembersByVotes" :key="nonmember.candidateContract"
                          :candidate="nonmember"
          />
        </div>
        <div class="card-container"
             :style="[
               $mq === 'desktop' || $mq === 'tablet' ?
                 {
                   'width': '378px',
                   'margin-left': '15px',
                 } :
                 {
                   'width': '100%',
                 },
             ]"
        >
          <card-my-vote v-if="account !== ''" :title="'Your Vote'" />
          <!-- <card-rank :title="'Rank'" /> -->
          <card-resource />
        </div>
      </div>
    </div>
    <div v-else>
      <loading />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import Loading from '@/components/Loading.vue';
import CardMember from '@/containers/CardMember.vue';
import CardNonmember from '@/containers/CardNonmember.vue';
import CardMyVote from '@/containers/CardMyVote.vue';
import CardResource from '@/containers/CardResource.vue';
// import CardRank from '@/containers/CardRank.vue';

export default {
  components: {
    'loading': Loading,
    'card-member': CardMember,
    'card-nonmember': CardNonmember,
    'card-my-vote': CardMyVote,
    // 'card-rank': CardRank,
    'card-resource': CardResource,
  },
  computed: {
    ...mapState([
      'account',
      'candidateLaunched',
    ]),
    ...mapGetters([
      'membersArray',
      'sortedNonmembersByVotes',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.election {
  background: #fafbfc;
  flex: 1;

  display: flex;
  justify-content: center;
}
.header-tooltip {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
}

.header-tooltip img:hover ~ .tooltip2 {
  display: flex;
}

.header-tooltip img:hover ~ .tooltip1 {
  display: flex;
}

.tooltip1 {
  display: none;
  position: absolute;

  left: 38%;
  top: 30px;
  width: 300px;

  z-index: 999;
}
.tooltip2 {
  display: none;
  position: absolute;

  left: 35%;
  top: 30px;
  width: 300px;

  z-index: 999;
}
.tooltip img {
  margin-top: 9px;
}
.tooltip-content {
  max-width: 317px;
  background: #353c48;
  border-radius: 3px;

  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;

  padding: 8px;
}



.container {
  display: flex;

  width: 1194px;

  margin-left: 20px;
  margin-right: 20px;

  .wrapper {
    min-width: 100%;

    display: flex;
  }

  .election-container {
    flex: 1;

    margin-top: 45px;
    margin-right: 15px;

    .header {
      font-family: Roboto;
      font-size: 24px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.33;
      letter-spacing: normal;
      text-align: left;

      margin-bottom: 20px;
      margin-right: 5px;

      &-nonmember {
        margin-top: 35px;
      }
    }

  }

  .card-container {
    margin-top: 45px;
  }
}
</style>
