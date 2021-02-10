<template>
  <div class="card-vote">
    <card-container v-if="candidates!=null && clength > 0" :title="'Your Vote'">
      <template #body>
        <div v-for="(candidate, index) in agendaVotesByCandidates"
             :key="candidate.candidateContract"
        >
          <div v-if="index > 0" class="divide" />
          <div class="vote-container">
            <div class="vote-info-container">
              <div class="vote-address"> {{ candidate.name | slice }} ... ({{ candidate.candidateContract | hexSlicer }})</div>
              <span class="vote-percent"> {{ candidate.voteRates }} </span>
              <span class="vote-explanation"> % of Agenda is voted  </span>
            </div>
            <vote-poll :pct="parseInt(candidate.voteRates)" :margin="16" />
          </div>
        </div>
      </template>
    </card-container>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import VotePoll from '@/components/VotePoll.vue';
import { mapState } from 'vuex';

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
      type: Array,
      default: null,
      required: true,
    },
  },
  computed: {
    ...mapState([
      'account',
      'web3',
      'agendaVotesByCandidates',
    ]),
  },
};
</script>

<style lang="scss" scoped>
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


.vote-container {
  height: 89px;

  display: flex;
  flex-direction: column;

  justify-items: center;
  justify-content: center;

  .vote-info-container {
    display: flex;
    padding-left: 20px;
    padding-right: 20px;

    margin-bottom: 15px;

    .vote-address {
      font-family: Roboto;
      font-size: 14px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: normal;
      text-align: left;
      color: #3e495c;

      flex: 1;

      margin: 0px;
    }

    .vote-percent {
      font-family: Roboto;
      font-size: 13px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: normal;
      text-align: right;
      color: #2a72e5;

      white-space: pre-wrap;
    }

    .vote-explanation {
      font-family: Roboto;
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: normal;
      text-align: right;
      color: #3e495c;

      white-space: pre-wrap;
    }
  }
}

.divide {
  width: 100%;
  height: 1px;
  background: #dfe4ee;
}
</style>
