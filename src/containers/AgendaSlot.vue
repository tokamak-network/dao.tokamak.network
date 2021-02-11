<template>
  <div class="agenda-slot">
    <div>
      <div class="title">Agenda</div>
      <div class="agenda-info">
        {{ numAgenda }} Agendas - POSTED {{ agendas[0]? agendas[0].tCreationDate:'' | date2 }}
      </div>
      <card-agenda-slot v-for="agenda in agendas.slice(0, 5)" :key="agenda.agendaid" :agenda="agenda" />
      <button-comp v-if="hide === false && agendas.length > 5" :name="hideButton" :type="'hide'" @on-clicked="hideSection ()" />
      <div v-if="hide === true && agendas.length > 5">
        <card-agenda-slot v-for="agenda in agendas.slice(5, agendas.length)" :key="agenda.agendaid" :agenda="agenda" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import CardAgendaSlot from '@/components/CardAgendaSlot.vue';
import Button from '@/components/Button.vue';

export default {
  components: {
    'card-agenda-slot': CardAgendaSlot,
    'button-comp': Button,
  },
  props: {
    agendas: {
      type: Array,
      default: () => [],
    },
  },
  data (){
    return {
      openAgendas: [],
      hideAgendas: [],
      hide: false,
    };
  },
  computed: {
    ...mapState([
      // 'agendas',
      'account',
    ]),
    ...mapGetters([
      'isCandidate',
    ]),
    numAgenda () {
      return this.agendas.length;
    },
    hideButton () {
      return 'View more agenda (' + this.agendas.slice(5, this.agendas.length).length + ')';
    },
  },
  // beforeCreate () {
  //   this.openAgendas = this.agendas;
  // },
  // watch: {
  //   'classify': {
  //     handler: async function () {
  //       if (this.agendas.length > 5) {
  //         this.hideAgendas = this.agendas.slice(5, this.agendas.length);
  //         this.openAgendas = this.agendas.slice(0, 5);
  //         this.hide = false;
  //       } else {
  //         this.openAgendas = this.agendas;
  //         this.hideAgendas = [];
  //         this.hide = true;
  //       }
  //     },
  //   },
  // },
  // created () {
  //   // this.agendaFilter();
  //   console.log(this.agendas);
  //   this.classify(this.agendas);
  // },
  // beforeUpdated () {
  //   console.log(this.agendas);
  //   this.classify(this.agendas);
  //   this.hide = false;
  // },
  // methods: {
  //   classify (agendas) {
  //     if (this.agendas.length > 5) {
  //       this.hideAgendas = agendas.slice(5, agendas.length);
  //     } else {
  //       this.openAgendas = agendas;
  //       this.hideAgendas = [];
  //     }
  //   },
  //   hideSection () {
  //     this.hide = this.hide ? false : true;
  //   },
  // },
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
.agenda-slot {
  width: 786px;
}
.dropdown-section {
  display: flex;
  margin-bottom: 45px;
}
.dropdown-section > div:first-child {
  align-self: center;
  font-size: 20px;
  color: #3e495c;
  margin-right: 15px;
}
.dropdown {
  width: 150px;
  margin-left: 15px;
}
</style>
