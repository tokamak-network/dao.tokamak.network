<template>
  <div class="election">
    <div v-if="launched" class="container">
      <div class="wrapper"
           :style="[
             $mq === 'desktop' || $mq === 'tablet' ? { 'flex-direction': 'row' } : { 'flex-direction': 'column' },
           ]"
      >
        <div class="election-container">
          <div class="header header-member">Elected Candidates</div>
          <card-member v-for="memberIndex in membersArray" :key="memberIndex"
                       :member-index="memberIndex"
          />
          <div class="header header-nonmember">Candidates</div>
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
          <card-rank :title="'Rank'" />
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
import CardRank from '@/containers/CardRank.vue';

export default {
  components: {
    'loading': Loading,
    'card-member': CardMember,
    'card-nonmember': CardNonmember,
    'card-my-vote': CardMyVote,
    'card-rank': CardRank,
    'card-resource': CardResource,
  },
  computed: {
    ...mapState([
      'account',
      'launched',
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
