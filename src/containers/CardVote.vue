<template>
  <div class="card-vote">
    <card-container :title="'Your Vote'">
      <template #body>
        <div class="vote-percentage-container">
          <div class="vote-percentage">{{ candidateContract }}</div>
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
    agendas: {
      type: Object,
      default: null,
      required: true,
    },
  },
  computed: {
    voteRates () {
      if(this.agendas.countCanVoteAgendas > 0 && this.agendas.countAgendaVote > 0  ){
        const voteRate = ( this.agendas.countAgendaVote / this.agendas.countCanVoteAgendas) * 100;
        return voteRate.toFixed(2);
      }else {
        return 0;
      }
    },
    getAgendas () {
      return this.agendas;
    },
    candidateContract (){
      return this.agendas.candidateContract;
    },
  },
};
</script>

<style scoped>
.card-vote {
}

.vote-percentage-container {
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

  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: 16px;
}
</style>
