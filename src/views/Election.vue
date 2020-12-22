<template>
  <div class="election">
    <div style="width: 500px;">
      here
    </div>
    <div class="card-container">
      <card-rank :title="'Your Votes'" />
      <card-rank :title="'Rank'" />
      <card-resource />
    </div>
  </div>
</template>

<script>
import CardResource from '@/containers/CardResource.vue';
import CardRank from '@/containers/CardRank.vue';

export default {
  components: {
    'card-rank': CardRank,
    'card-resource': CardResource,
  },
  data () {
    return {
      your: [
        { 'title': 'Claimable TON', 'content': '100 TON' },
        { 'title': '# of Voted', 'content': '7 Polls' },
      ],
      committee: [
        { 'title': 'Claimable TON', 'content': '100 TON' },
        { 'title': '# of Voted', 'content': '7 Polls' },
        { 'title': '% of winning vote lottery', 'content': '1.5 %' },
      ],
    };
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
