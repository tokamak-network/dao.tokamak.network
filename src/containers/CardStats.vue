<template>
  <div class="card-stats">
    <card-container v-if="candidates!=null && clength > 0" :title="'Your Stats'">
      <template #body>
        <div v-for="(candidate, index) in candidates"
             :key="candidate.candidateContract"
        >
          <div v-if="index > 0" class="divide" />
          <div class="container">
            <div class="address">{{ candidate.name | slice }}... ({{ candidate.candidateContract | hexSlicer }}) </div>
            <div class="stats-container">
              <div class="stats-label">
                Claimable TON
              </div>
              <div class="stats-value">
                {{ candidate.claimableAmount }}
              </div>
            </div>
            <div class="stats-container">
              <div class="stats-label">
                # of Voted
              </div>
              <div class="stats-value">
                {{ candidate.countCanVoteAgendas }} Agendas
              </div>
            </div>
          </div>
        </div>
      </template>
    </card-container>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import { mapState } from 'vuex';

export default {
  components: {
    'card-container': Card,
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
    ]),
  },
};
</script>

<style lang="scss" scoped>
.card-stats {
}

.stats {
  display: flex;
  align-items: center;

  padding-left: 16px;
  padding-right: 16px;
}
.stats:first-child {
  padding-top: 16px;
  margin-bottom: 16px;
}
.stats:last-child {
  padding-bottom: 16px;
}

.stats .candidate {
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
.stats .title {
  flex: 1;

  font-family: Roboto;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #86929d;
}
.stats .content {
  font-family: Roboto;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: right;
  color: #2a72e5;
}

.container {
  height: 125px;

  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
}

.address {
  font-family: Roboto;
  font-size: 15px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.73;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;

  margin-bottom: 5px;

  padding-left: 20px;
}

.stats-container {
  display: flex;
  padding-left: 20px;
  padding-right: 20px;

  margin-top: 10px;

  .stats-label {
    flex: 1;

    font-family: Roboto;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.73;
    letter-spacing: normal;
    text-align: left;
    color: #86929d;
  }
  .stats-value {
    font-family: Roboto;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.73;
    letter-spacing: normal;
    text-align: right;
    color: #2a72e5;
  }
}

.divide {
  width: 100%;
  height: 1px;
  background: #dfe4ee;

  padding-left: 20px;
  padding-right: 20px;
}

</style>
