<template>
  <div class="agenda-detail">
    <div class="agenda-container">
      <agenda />
    </div>
    <div class="card-container">
      <card-vote-for-agenda />
      <card-voters :voters="comments" />
      <card-resource />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

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
    classify () {
      return () => {
        this.voteCasted.forEach(async casted => casted.data.id === this.$route.params.address ? this.comments.push(casted.data) : 0);
      };
    },
    shortAddress () {
      return (address) => {
        return `${address.slice(0, 7)}...${address.slice(-4)}`;
      };
    },
  },
  created () {
    this.classify();
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
