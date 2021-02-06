<template>
  <div class="card-stats">
    <card-container :title="'Your Stats'">
      <template #body>
        <div v-if="clength > 1" class="stats">
          <div class="candidate">{{ candidateContract }} </div>
        </div>
        <div class="stats">
          <div class="title">Claimable TON</div>
          <div class="content">{{ claimableAmount }} </div>
        </div>
        <div class="stats">
          <div class="title"># of Agendas</div>
          <div class="content">{{ totalAgendas }} Agendas</div>
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

<style scoped>
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
</style>
