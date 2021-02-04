<template>
  <div class="card-vote">
    <card-container :title="'Your Vote'">
      <template #body>
        <div class="vote-percentage-container">
          <div v-if="clength > 1" class="vote-percentage">{{ candidateContract }}</div>
          <div class="vote-percentage">{{ voteRates }}% of Agenda is voted </div>
          <vote-poll :pct="parseInt(voteRates)" :margin="16" />
        </div>
      </template>
    </card-container>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import VotePoll from '@/components/VotePoll.vue';

export default {
  components: {
    'card-container': Card,
    'vote-poll': VotePoll,
  },
  props: {
    clength:{
      type: Number,
      default: 0,
      required: true,
    },
    candidates: {
      type: Object,
      default: null,
      required: true,
    },
  },
  computed: {
    voteRates () {
      if(this.candidates.countCanVoteAgendas > 0 && this.candidates.countAgendaVote > 0  ){
        const voteRate = ( this.candidates.countAgendaVote / this.candidates.countCanVoteAgendas) * 100;
        return voteRate.toFixed(2);
      }else {
        return 0;
      }
    },
    candidateContract (){
      return this.candidates.candidateContract;
    },
  },
};
</script>

<style scoped>
.card-vote {
}

.vote-percentage-container {
  height: 126px;
  padding-top: 16px;
  padding-bottom: 16px;
}
.vote-percentage {
  font-family: Roboto;
  font-size: 13px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;

  padding-left: 20px;
  /* padding-right: 16px; */
  margin: 10px 0 25px;
}
</style>
