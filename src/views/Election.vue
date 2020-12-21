<template>
  <div class="election">
    <vote-card :title="'Your Vote'"></vote-card>
    <stat-card :title="'Your Stats'" :data="your" />
    <stat-card :title="'Committee Stats'" :data="committee" />
    <resource-card :title="'Resources'" />
    <button-pagination style="margin-left: 16px;" />
  </div>
</template>

<script>
import VoteCard from '@/components/VoteCard.vue';
import StatsCard from '@/components/StatsCard.vue';
import ResourceCard from '@/components/ResourceCard.vue';
import ButtonPagination from '@/components/ButtonPagination.vue';

export default {
  components: {
    'vote-card': VoteCard,
    'stat-card': StatsCard,
    'resource-card': ResourceCard,
    'button-pagination': ButtonPagination,
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
  background: #fafbfc;
  flex: 1;
}
</style>
