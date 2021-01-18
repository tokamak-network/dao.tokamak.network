<template>
  <div class="agenda-detail">
    <div class="agenda-container">
      <agenda />
    </div>
    <div class="card-container">
      <card-vote-for-agenda />
      <card-voters :voters="voted" />
      <card-resource />
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
      comments : [],
    };
  },
  computed: {
    ...mapState([
      'account',
      'voteCasted',
    ]),
    ...mapGetters([
      'getVotedListByID',
    ]),
    voted () {
      return this.getVotedListByID(this.$route.params.address);
    },
  },
};
</script>

<style scoped>
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
</style>
