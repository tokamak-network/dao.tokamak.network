<template>
  <div class="election">
    <div style="width: 500px;">
      <vote-breakdown />
    </div>
    <div class="card-container">
      <card-supporters />
      <card-rank :title="'Your Votes'" />
      <card-rank :title="'Rank'" />
      <card-resource />
    </div>
  </div>
</template>

<script>
import CardResource from '@/containers/CardResource.vue';
import CardSupporters from '@/containers/CardSupporters.vue';
import CardRank from '@/containers/CardRank.vue';
import VoteBreakdown from '@/containers/VoteBreakdown.vue';

export default {
  components: {
    'card-rank': CardRank,
    'card-resource': CardResource,
    'card-supporters': CardSupporters,
    'vote-breakdown': VoteBreakdown,
  },
};
</script>

<style scoped>
.election {
  /* all the `views` have to has this attribue  */
  flex: 1;

  display: flex;
  flex-direction: row;
  justify-content: center;

  background: #fafbfc;
}

.card-container {
  display: flex;
  flex-direction: column;

  width: 378px;
}
</style>
