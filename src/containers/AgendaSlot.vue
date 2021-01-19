<template>
  <div class="committee-slot">
    <div class="title">Agenda</div>
    <div class="agenda-info">
      {{ numAgenda }} Agendas - POSTED {{ deployedDate() }}
    </div>
    <card-agenda-slot v-for="agenda in agendas" :key="agenda.agendaid" :agenda="agenda" />
    <button-comp v-if="hide === false && hideAgendas.length !== 0" :name="hideButton" :type="'hide'" @on-clicked="hideSection" />
    <div v-if="hide === true">
      <card-agenda-slot v-for="agenda in agendas" :key="agenda.agendaid" :agenda="agenda" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CardAgendaSlot from '@/components/CardAgendaSlot.vue';
import Button from '@/components/Button.vue';

export default {
  components: {
    'card-agenda-slot': CardAgendaSlot,
    'button-comp': Button,
  },
  data (){
    return {
      openAgendas: [],
      hideAgendas: [],
      hideButton: '',
      hide: false,
      monthNames: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    };
  },
  computed: {
    ...mapState([
      'agendas',
    ]),
    numAgenda (){
      return this.agendas.length;
    },
    deployedDate () {
      return () => {
        const latest = this.agendas[0];
        const date = new Date(latest.tCreationDate * 1000);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const hour = date.getHours();
        const minutes = date.getMinutes();

        return this.monthNames[parseInt(month)] + ' ' + day + ', ' + year + ', ' + hour + ':' + minutes;
      };
    },
  },
  created () {
    this.cassify();
  },
  methods: {
    cassify () {
      // console.log(this.agendas);
      // if (this.agendas.length > 5) {
      //   this.openAgendas = this.agendas.slice(0, 5);
      //   this.hideAgendas = this.agendas.slice(5, this.agendas.length);
      //   this.hideButton = 'View more agenda (' + this.hideAgendas.length + ')';
      // } else {
      //   this.openAgendas = this.agendas;
      // }
    },
    hideSection () {
      this.hide = this.hide ? false : true;
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
