<template>
  <div style="background: #fafbfc; flex: 1;">
    <div v-if="$mq === 'mobile'" style="margin-left: 20px; margin-right: 20px;">
      <div class="committee-container-mobile">
        <committee />
      </div>
      <div class="card-container-mobile">
        <card-vote-count v-if="account !== ''" style="margin-top: 30px;" />
        <card-supporters style="margin-top: 30px;" />
        <card-resource style="margin-top: 30px;" />
      </div>
    </div>
    <div v-else-if="$mq === 'tablet'" class="committee-detail-tablet">
      <div class="committee-container-tablet">
        <committee />
      </div>
      <div class="card-container-tablet">
        <card-vote-count v-if="account !== ''" />
        <card-supporters />
        <card-resource />
      </div>
    </div>
    <div v-else class="committee-detail">
      <div class="committee-container">
        <committee />
      </div>
      <div class="card-container">
        <card-vote-count v-if="account !== ''" />
        <card-supporters />
        <card-resource />
      </div>
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
.committee-detail-tablet {
  /* all the `views` have to has this attribue  */
  flex: 1;

  display: flex;
  flex-direction: row;
  justify-content: center;

  background: #fafbfc;

  padding-top: 25px;
  padding-bottom: 50px;
}
.committee-container-tablet {
  width: 582px;
  display: flex;
  flex-direction: column;
}
.card-container-tablet {
  width: 378px;
  margin-left: 30px;

  display: flex;
  flex-direction: column;
}
.committee-container-mobile {
  flex: 1;

  width: 100%;
  display: flex;
  flex-direction: column;
}
.card-container-mobile {
  width: 100%;

  display: flex;
  flex-direction: column;
}
.committee-container-mobile {
  flex: 1;

  width: 100%;
  display: flex;
  flex-direction: column;
}
.card-container-mobile {
  width: 100%;

  display: flex;
  flex-direction: column;
}
</style>
