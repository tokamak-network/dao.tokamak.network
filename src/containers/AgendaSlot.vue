<template>
  <div class="committee-slot">
    <div class="title">Agenda</div>
    <div class="agenda-info">
      {{ numAgenda }} Agendas - POSTED DEC 7, 2020, 16:00 UTC
    </div>
    <card-agenda-slot v-for="agenda in agendas" :key="agenda.index" :agenda="agenda" />
  </div>
</template>

<script>
import CardAgendaSlot from '@/components/CardAgendaSlot.vue';
export default {
  components: {
    'card-agenda-slot': CardAgendaSlot,
  },
  data (){
    return {
      agendas: [
        { 'index': 0, 'address': '0xEA8e2eC08dCf4971bdcdfFFe21439995378B44F3', 'name': '1000 TON to 0xaaabc', 'date': 1599790760, 'claimableTon': 1000, 'choice': 'Not yet', 'voted': false, 'executed': false, 'claim': false, 'expired': false },
        { 'index': 1, 'address': '0xEA8e2eC08dCf4971bdcdfFFe21439995378B44F3', 'name': '1000 TON to 0xaaabc', 'date': 1599790760, 'claimableTon': 1000, 'choice': 'Yes', 'voted': false, 'executed': false, 'claim': false, 'expired': false },
        { 'index': 2, 'address': '0xEA8e2eC08dCf4971bdcdfFFe21439995378B44F3', 'name': '1000 TON to 0xaaabc', 'date': 1599790760, 'claimableTon': 1000, 'choice': 'Yes', 'voted': true, 'executed': false, 'claim': false, 'expired': false },
        { 'index': 3, 'address': '0xEA8e2eC08dCf4971bdcdfFFe21439995378B44F3', 'name': '1000 TON to 0xaaabc', 'date': 1599790760, 'claimableTon': 1000, 'choice': 'Yes', 'voted': true, 'executed': true, 'claim': false, 'expired': false },
        { 'index': 4, 'address': '0xEA8e2eC08dCf4971bdcdfFFe21439995378B44F3', 'name': '1000 TON to 0xaaabc', 'date': 1599790760, 'claimableTon': 1000, 'choice': 'Yes', 'voted': true, 'executed': true, 'claim': true, 'expired': false },
        { 'index': 5, 'address': '0xEA8e2eC08dCf4971bdcdfFFe21439995378B44F3', 'name': '1000 TON to 0xaaabc', 'date': 1599790760, 'claimableTon': 1000, 'choice': 'Yes', 'voted': true, 'executed': true, 'claim': true, 'expired': true },
      ],
    };
  },
  computed: {
    numAgenda (){
      return this.agendas.length;
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
.agenda-info {
  margin-bottom: 12px;
  height: 15px;
  font-family: Roboto;
  font-size: 11px;
  width: 786px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #86929d;
}
.committee-slot {
  width: 786px;
}
</style>
