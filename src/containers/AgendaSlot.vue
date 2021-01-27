<template>
  <div class="agenda-slot">
    <div class="dropdown-section">
      <div>Filters</div>
      <dropdown
        :items="['All', 'Notice', 'Voting', 'Waiting Exec', 'Executed', 'Ended']"
        :hint="'Status'"
        :button-type="'a'"
        :selector-type="'a'"
        class="dropdown"
        @on-selected="selectStatus"
      />
      <dropdown
        :items="['All', 'Pending', 'Accepted', 'Reject', 'Dismiss']"
        :hint="'Result'"
        :button-type="'a'"
        :selector-type="'a'"
        class="dropdown"
        @on-selected="selectResult"
      />
      <dropdown
        :items="['All', 'Yes', 'No', 'Abstain']"
        :hint="'Voted'"
        :button-type="'a'"
        :selector-type="'a'"
        class="dropdown"
        @on-selected="selectVoted"
      />
      <dropdown
        :items="['All', 'Executed', 'Not Executed']"
        :hint="'Executed'"
        :button-type="'a'"
        :selector-type="'a'"
        class="dropdown"
        @on-selected="selectExecuted"
      />
    </div>
    <div>
      <div class="title">Agenda</div>
      <div class="agenda-info">
        {{ numAgenda }} Agendas - POSTED {{ deployedDate() }}
      </div>
      <card-agenda-slot v-for="agenda in openAgendas" :key="agenda.agendaid" :agenda="agenda" />
      <button-comp v-if="hide === false && hideAgendas.length > 0" :name="hideButton" :type="'hide'" @on-clicked="hideSection" />
      <div v-if="hide === true">
        <card-agenda-slot v-for="agenda in hideAgendas" :key="agenda.agendaid" :agenda="agenda" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CardAgendaSlot from '@/components/CardAgendaSlot.vue';
import Button from '@/components/Button.vue';
import Dropdown from '@/components/Dropdown.vue';

export default {
  components: {
    'card-agenda-slot': CardAgendaSlot,
    'button-comp': Button,
    'dropdown': Dropdown,
  },
  data (){
    return {
      openAgendas: [],
      hideAgendas: [],
      hideButton: '',
      hide: false,
      execute: [false, ''],
      status: [false, ''],
      vote: [false, ''],
      result: [false, ''],
      executeCode: ['Executed', 'Not Executed'],
      statusCode: ['', 'Notice', 'Voting', 'Waiting Exec', 'Executed', 'Ended'],
      resultCode: ['Pending', 'Accepted', 'Reject', 'Dismiss'],
      voteCode: ['Abstain', 'Yes', 'No'],
      monthNames: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    };
  },
  computed: {
    ...mapState([
      'agendas',
    ]),
    numAgenda () {
      return this.openAgendas.length + this.hideAgendas.length;
    },
    deployedDate () {
      return () => {
        const latest = this.agendas[0];
        if (!latest) return 0;
        const date = new Date(latest.tCreationDate * 1000);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const hour = date.getHours();
        let minutes = date.getMinutes();

        if (minutes < 10) {
          minutes = '0' + minutes;
        }

        return this.monthNames[parseInt(month)] + ' ' + day + ', ' + year + ', ' + hour + ':' + minutes;
      };
    },
  },
  beforeCreate () {
    this.openAgendas = this.agendas;
  },
  created () {
    this.agendaFilter();
    this.classify(this.openAgendas);
  },
  beforeUpdate () {
    this.agendaFilter();
  },
  methods: {
    classify (agendas) {
      if (agendas.length > 5) {
        this.hideAgendas = agendas.slice(5, agendas.length);
        this.openAgendas = agendas.slice(0, 5);
        this.hideButton = 'View more agenda (' + this.hideAgendas.length + ')';
      } else {
        this.openAgendas = agendas;
        this.hideAgendas = [];
      }
    },
    hideSection () {
      this.hide = this.hide ? false : true;
    },
    agendaFilter () {
      let filteredAgenda = [];
      if (this.execute[0] === true) {
        let stateCode;
        this.execute[1] === 'Executed' ? stateCode = true : stateCode = false;
        filteredAgenda = this.agendas.filter(agenda => (agenda.executed === stateCode));
      }
      if (this.status[0] === true) {
        const stateCode = this.statusCode.indexOf(this.status[1]);
        filteredAgenda.length === 0 ? filteredAgenda = this.agendas.filter(agenda => (agenda.status === stateCode)) : filteredAgenda = filteredAgenda.filter(agenda => (agenda.status === stateCode));
      }
      if (this.vote[0] === true) {
        const stateCode = this.voteCode.indexOf(this.vote[1]);
        filteredAgenda.length === 0 ? filteredAgenda = this.agendas.filter(agenda => (Number(agenda.voting) === stateCode)) : filteredAgenda = filteredAgenda.filter(agenda => (agenda.status === stateCode));
      }
      if (this.result[0] === true) {
        const stateCode = this.resultCode.indexOf(this.result[1]);
        filteredAgenda.length === 0 ? filteredAgenda = this.agendas.filter(agenda => (agenda.result === stateCode)) : filteredAgenda = filteredAgenda.filter(agenda => (agenda.result === stateCode));
      }
      // console.log('filter', this.execute[0] !== true && this.status[0] !== true && this.result[0] !== true && this.vote[0] !== true);
      if (this.execute[0] !== true && this.status[0] !== true && this.vote[0] !== true && this.result[0] !== true) {
        filteredAgenda = this.agendas;
      }
      // console.log('filtering result', filteredAgenda);
      this.classify(filteredAgenda);
    },
    selectExecuted (item) {
      item !== 'All' ? this.execute = [true, item] : this.execute[0] = false ;
      this.agendaFilter();
    },
    selectStatus (item) {
      item !== 'All' ? this.status = [true, item] : this.status[0] = false ;
      this.agendaFilter();
    },
    selectResult (item) {
      item !== 'All' ? this.result = [true, item] : this.result[0] = false ;
      this.agendaFilter();
    },
    selectVoted (item) {
      item !== 'All' ? this.vote = [true, item] : this.vote[0] = false ;
      this.agendaFilter();
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
