<template>
  <div style="background: #fafbfc; flex: 1;">
    <div v-if="$mq === 'mobile'" style="margin-left: 20px; margin-right: 20px; margin-top: 35px;">
      <committee-slot />
      <card-my-vote v-if="account !== ''" :title="'Your Vote'" style="margin-top: 30px;" />
      <card-rank :title="'Rank'" style="margin-top: 30px;" />
      <card-resource style="margin-top: 30px;" />
    </div>
    <div v-else class="election">
      <div class="committee-container">
        <committee-slot />
      </div>
      <div class="card-container">
        <card-my-vote v-if="account !== ''" :title="'Your Vote'" />
        <card-rank :title="'Rank'" />
        <card-resource />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import CardMyVote from '@/containers/CardMyVote.vue';
import CardResource from '@/containers/CardResource.vue';
import CardRank from '@/containers/CardRank.vue';
import CommitteeSlot from '@/containers/CommitteeSlot';

export default {
  components: {
    'card-my-vote': CardMyVote,
    'card-rank': CardRank,
    'card-resource': CardResource,
    'committee-slot': CommitteeSlot,
  },
  computed: {
    ...mapState([
      'account',
    ]),
  },
};
</script>

<style scoped>
.election {
  /* all the `views` have to has this attribue  */
  background: #fafbfc;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;

  padding-top: 50px;
  padding-bottom: 50px;
}
.committee-container {
  width: 786px;
  display: flex;
  flex-direction: column;
}
.card-container {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  width: 378px;
}
</style>
