<template>
  <div class="committee">
    <div>
      <agenda-slot />
    </div>
    <div>
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

  padding-top: 30px;
  padding-bottom: 50px;
}

.committee > div:nth-child(1) {
  width: 786px;
}
.committee > div:nth-child(2) {
  width: 378px;

  display: flex;
  flex-direction: column;
  margin-top: 72px;
  margin-left: 30px;
}
</style>
