<template>
  <div class="committee-slot">
    <div class="title">Elected Candidate</div>
    <div class="slot-info">
      <!-- TODO: message -->
      {{ numSlot }} SLOT
    </div>
    <card-committee-slot v-for="operator in operators" :key="operator.index" :operator="operator" />
  </div>
</template>

<script>
import CardCommitteeSlot from '@/components/CardCommitteeSlot.vue';

export default {
  components: {
    'card-committee-slot': CardCommitteeSlot,
  },
  data (){
    return {
      operators: [
        {
          'index': 0,
          'status': 'Occupied',
          'voted': '145,000 TON',
          'address': '0xEA8e2eC08dCf4971bdcdfFFe21439995378B44F3',
          'date': 1599790760,
          'name': 'tokamak network\'s operator1',
        },
        {
          'index': 1,
          'status': 'Occupied',
          'elected': '0xabcfe...',
          'voted': '115,000 TON',
          'address': '0xEA8e2eC08dCf4971bdcdfFFe21439995378B44F3',
          'date': 1599890760,
          'name': 'DXM Corp operator',
        },
        {
          'index': 2,
          'status': 'Occupied',
          'elected': '0xabcfe...',
          'voted': '95,000 TON',
          'address': '0xEA8e2eC08dCf4971bdcdfFFe21439995378B44F3',
          'date': 1599990760,
          'name': 'DSRV operator',
        },
      ],
    };
  },
  computed: {
    numSlot () {
      return this.operators.length;
    },
  },
};
</script>

<style scoped>
.title {
  font-family: Roboto;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;
  margin-bottom: 12px;
}
.slot-info {
  margin-bottom: 12px;
  width: 204px;
  height: 15px;
  font-family: Roboto;
  font-size: 11px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #86929d;
}
</style>
