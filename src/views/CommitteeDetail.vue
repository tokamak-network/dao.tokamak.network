<template>
  <div class="committee-detail">
    <div class="committee-container">
      <committee />
    </div>
    <div class="card-container">
      <card-vote-count v-if="account !== ''" />
      <card-supporters />
      <card-resource />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Committee from '@/containers/Committee';
import CardResource from '@/containers/CardResource.vue';
import CardSupporters from '@/containers/CardSupporters';
import CardVoteCount from '@/containers/CardVoteCount';

export default {
  components: {
    'committee': Committee,
    'card-resource': CardResource,
    'card-supporters': CardSupporters,
    'card-vote-count': CardVoteCount,
  },
  computed: {
    ...mapState([
      'account',
    ]),
  },
};
</script>

<style scoped>
.committee-detail {
  /* all the `views` have to has this attribue  */
  flex: 1;

  display: flex;
  flex-direction: row;
  justify-content: center;

  background: #fafbfc;

  padding-top: 50px;
  padding-bottom: 50px;
}
.committee-container {
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
