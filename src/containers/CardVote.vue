<template>
  <div class="card-vote">
    <card-container :title="'Your Vote'">
      <template #body>
        <div class="vote-percentage-container">
          <div class="vote-percentage">{{ voteRate }}% of Agenda is voted</div>
          <vote-poll :pct="voteRate" :margin="16" />
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
  // data () {
  //   return {
  //     percentage: 60,
  //   };
  // },
  computed: {
    ...mapState([
      'voteRate',
    ]),
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
