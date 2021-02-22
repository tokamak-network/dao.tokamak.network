<template>
  <div class="agenda-slot">
    <div>
      <div class="title">Agenda</div>
      <!-- <div class="agenda-info">
        {{ numAgenda }} Agendas - POSTED {{ agendas[0]? agendas[0].tCreationDate:'' | date2 }}
      </div> -->
      <card-agenda-slot v-for="agenda in agendas.slice(0, 5)" :key="agenda.agendaid" :agenda="agenda" />
      <button-comp v-if="hide === false && agendas.length > 5" :name="hideButton" class="hide-btn" :type="'hide'" @on-clicked="hide = true" />
      <div v-if="hide === true && agendas.length > 5">
        <card-agenda-slot v-for="agenda in agendas.slice(5, agendas.length)" :key="agenda.agendaid" :agenda="agenda" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Button from '@/components/Button.vue';
import CardAgendaSlot from '@/components/CardAgendaSlot.vue';

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
  data () {
    return {
      openAgendas: [],
      hideAgendas: [],
      hide: false,
    };
  },
  computed: {
    ...mapState([
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
};
</script>

<style lang="scss" scoped>
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
  font-family: Roboto;
  font-size: 11px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #86929d;
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

.hide-btn {
  height: 55px;
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(96, 97, 112, 0.16);
  font-size: 14px;
  color: #86929d;
}
</style>
