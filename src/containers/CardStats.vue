<template>
  <div class="card-stats">
    <card-container :title="'Your Stats'">
      <template #body>
        <div>
          <!-- <div class="stats">
            <div class="candidate">{{ candidateContract }} </div>
          </div> -->
          <div class="stats">
            <div class="title">Claimable TON</div>
            <div class="content">{{ claimableAmount }} </div>
          </div>
          <div class="stats">
            <div class="title"># of Agendas</div>
            <div class="content">{{ totalAgendas }} Agendas</div>
          </div>
        </div>

        <!-- TODO: zena implement -->
        <!-- <div v-for="(candidate, _, index) in candidates"
             v-else
             :key="candidate.candidateContract"
        >
          <div v-if="index !== 0" class="divide" />
          <div class="container">
            <div class="address">{{ candidateContract | hexSlicer }}</div>
            <div class="stats-container">
              <div class="stats-label">
                Claimable TON
              </div>
              <div class="stats-value">
                {{ claimableAmount }}
              </div>
            </div>
            <div class="stats-container">
              <div class="stats-label">
                # of Voted
              </div>
              <div class="stats-value">
                {{ totalAgendas }} Agendas
              </div>
            </div>
          </div>
        </div> -->
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
      type: Object,
      default: null,
      required: true,
    },
  },
  computed: {
    ...mapState([
      'account',
      'web3',
    ]),
    candidateContract (){
      return this.candidates.candidateContract;
    },
    totalAgendas (){
      return this.candidates.countCanVoteAgendas;
    },
    claimableAmount (){
      let _amount = this.candidates.claimableAmount+'';
      _amount = _amount.replaceAll('TON', '');
      _amount =_amount.replaceAll(' ', '');
      if(_amount ==='0.000000000000000000' || _amount ==='0.00' || _amount ==='0') return '0.00 TON';
      else  return this.candidates.claimableAmount;
    },
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
