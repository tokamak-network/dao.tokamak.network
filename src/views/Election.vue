<template>
  <div class="election">
    <div class="committee-container">
      <committee />
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
import Committee from '@/containers/Committee';

export default {
  components: {
    'card-rank': CardRank,
    'card-resource': CardResource,
    'committee': Committee,
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

<style>
.election {
  /* all the `views` have to has this attribue  */
  background: #fafbfc;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.committee-container {
  width: 786px;
  display: flex;
  flex-direction: column;
  margin-right: 30px;
}
.card-container {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  width: 378px;
}
</style>
