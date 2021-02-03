<template>
  <div class="card-vote">
    <card-container :title="'Your Vote'">
      <template #body>
        <div class="vote-percentage-container">
          <div class="vote-percentage">{{ roundNumber(voteRate) }}% of Agenda is voted</div>
          <vote-poll :pct="voteRate" :margin="20" :remain="remain" />
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
  computed: {
    ...mapState([
      'voteRate',
    ]),
    remain () {
      return this.voteRate === 0 ? true : false;
    },
    roundNumber () {
      return pct => {
        if(isNaN (pct) === false && Number.isInteger(pct) === false) {
          return pct.toFixed(2);
        } else {
          return pct;
        }
      };
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
