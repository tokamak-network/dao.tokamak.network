<template>
  <div class="committee">
    <div style="width: 786px;">
      <agenda-slot />
    </div>
    <div class="card-container">
      <card-vote />
      <card-stats />
      <card-stats-committee />
      <card-resource />
    </div>
  </div>
</template>

<script>
import AgendaSlot from '@/containers/AgendaSlot.vue';
import CardResource from '@/containers/CardResource.vue';
import CardStats from '@/containers/CardStats.vue';
import CardVote from '@/containers/CardVote.vue';
import CardStatsCommittee from '@/containers/CardStatsCommittee.vue';

export default {
  components: {
    'card-stats': CardStats,
    'card-vote': CardVote,
    'card-resource': CardResource,
    'card-stats-committee': CardStatsCommittee,
    'agenda-slot': AgendaSlot,
  },
};
</script>

<style scoped>
.committee {
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
  margin-left: 30px;
  width: 378px;
}
</style>
