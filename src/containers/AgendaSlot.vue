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
      <card-agenda-slot v-for="agenda in agendas" :key="agenda.agendaid" :agenda="agenda" />
      <button-comp v-if="hide === false && hideAgendas.length !== 0" :name="hideButton" :type="'hide'" @on-clicked="hideSection" />
      <div v-if="hide === true">
        <card-agenda-slot v-for="agenda in agendas" :key="agenda.agendaid" :agenda="agenda" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
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
      // executeCode: ['Executed', 'Not Executed'],
      // statusCode: ['', 'Notice', 'Voting', 'Waiting Exec', 'Executed', 'Ended'],
      // resultCode: ['Pending', 'Accepted', 'Reject', 'Dismiss'],
      // voteCode: ['Yes', 'No', 'Abstain'],
      monthNames: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    };
  },
  computed: {
    ...mapState([
      'agendas',
    ]),
    ...mapGetters([
      'getAgendasByFilter',
      'getAgendaByID',
    ]),
    // getAgenda () {
    //   return this.getAgendaByFilter(this.execute, this.status, this.vote, this.result);
    // },
    getAgenda () {
      return this.getAgendaByID(0);
    },
    numAgenda () {
      return this.agendas.length;
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
        const minutes = date.getMinutes();

        return this.monthNames[parseInt(month)] + ' ' + day + ', ' + year + ', ' + hour + ':' + minutes;
      };
    },
    showAgendas () {
      // (this.openAgendas.length !== 0) ? return this.openAgendas : return this.agendas
      if (this.openAgendas.length !==0 ) {
        return this.openAgendas;
      } else {
        return this.agendas;
      }
    },
  },
  created () {
    this.cassify();
  },
  methods: {
    // showAgendas () {
    //   // (this.openAgendas.length !== 0) ? return this.openAgendas : return this.agendas
    //   if (this.openAgendas.length !==0 ) {
    //     return this.openAgendas;
    //   } else {
    //     return this.agendas;
    //   }
    // },
    cassify () {
      this.openAgendas = this.agendas;
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
    agendaFilter () {
      let filteredAgenda = [];
      if (this.execute === true) {
        let statusCode;
        this.curExecCode === 'Executed' ? statusCode = true : statusCode = false;
        filteredAgenda = this.agendas.filter(agenda => (agenda.executed === statusCode));
      }
      if (this.status === true) {
        const statusCode = this.statusCode.indexOf(this.curStatCode);
        filteredAgenda.length === 0 ? filteredAgenda = this.agendas.filter(agenda => (agenda.status === statusCode)) : filteredAgenda = filteredAgenda.filter(agenda => (agenda.result === statusCode));
      }
      // if (this.vote === true) {
      //   const statusCode = this.getVote();
      //   filteredAgenda === [] ? filteredAgenda = this.agendas.filter(agenda => (agenda.vote === statusCode)) : filteredAgenda = filteredAgenda.filter(agenda => (agenda.result === statusCode));
      // }
      if (this.result === true) {
        const statusCode = this.resultCode.indexOf(this.curResultCode);
        filteredAgenda.length === 0 ? filteredAgenda = this.agendas.filter(agenda => (agenda.result === statusCode)) : filteredAgenda = filteredAgenda.filter(agenda => (agenda.result === statusCode));
      }
      this.openAgendas = filteredAgenda;
      this.showAgendas();
    },
    selectExecuted (item) {
      item === 'All' ? this.execute[0] = false : this.execute[1] = item, this.execute[0] = true;
      this.agendaFilter();
    },
    selectStatus (item) {
      item === 'All' ? this.status[0] = false : this.curStatCode[1] = item, this.status[0] = true;
      this.agendaFilter();
    },
    selectResult (item) {
      item === 'All' ? this.result[0] = false : this.curResultCode[1] = item, this.result[0] = true;
      this.agendaFilter();
    },
    selectVoted () {
    // if (item === 'Result') {
    //   this.openAgendas = this.agendas;
    // } else {
    //   let itemIndex;
    //   switch (item) {
    //   case 'Yes': itemIndex = 0; break;
    //   case 'No': itemIndex = 1; break;
    //   case 'Abstain': itemIndex = 2; break;
    //   }
    //   this.openAgendas = this.agendas.filter(agenda => (agenda.result === itemIndex));
    // }
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
