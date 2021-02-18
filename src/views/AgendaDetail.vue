<template>
  <div>
    <div v-if="$mq=='tablet'" class="agenda-detail">
      <div class="agenda-container-tablet">
        <agenda />
      </div>
      <div class="card-container">
        <card-vote-for-agenda />
        <card-voters :voters="voted" />
        <card-resource />
      </div>
    </div>
    <div v-else-if="$mq=='mobile'" class="agenda-detail-mobile">
      <div class="agenda-container">
        <agenda />
      </div>
      <div class="card-container-mobile">
        <card-vote-for-agenda style="margin-top: 30px;" />
        <card-voters :voters="voted" style="margin-top: 30px;" />
        <card-resource style="margin-top: 30px;" />
      </div>
    </div>
    <div v-else class="agenda-detail">
      <div class="agenda-container">
        <agenda />
      </div>
      <div class="card-container">
        <card-vote-for-agenda />
        <card-voters :voters="voted" />
        <card-resource />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import Agenda from '@/containers/Agenda';
import CardResource from '@/containers/CardResource.vue';
import CardVoters from '@/containers/CardVoters';
import CardVoteForAgenda from '@/containers/CardVoteForAgenda';

export default {
  components: {
    'agenda': Agenda,
    'card-resource': CardResource,
    'card-voters': CardVoters,
    'card-vote-for-agenda': CardVoteForAgenda,
  },
  data () {
    return {
      comments: [],
    };
  },
  computed: {
    ...mapState([
      'account',
      'voteCasted',
      'members',
      'votersOfAgenda',
    ]),
    ...mapGetters([
      'getVotedListByID',
      'getAgendaByID',
      'getVotersOfAgenda ',
    ]),
    voted () {
      return this.votersOfAgenda.filter(voter => String(voter.id) === String(this.$route.params.id));
    },
  },
};
</script>

<style lang="scss" scoped>
.agenda-detail {
  /* all the `views` have to has this attribue  */
  flex: 1;

  display: flex;
  flex-direction: row;
  justify-content: center;

  background: #fafbfc;

  padding-top: 50px;
  padding-bottom: 50px;
}
.agenda-container {
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
.agenda-container-tablet {
  width: 582px;
}

.agenda-detail-mobile {
  padding-left: 20px;
  padding-right: 20px;

  display: flex;
  flex-direction: column;
}
</style>
