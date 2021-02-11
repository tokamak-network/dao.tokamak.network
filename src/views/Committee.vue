<template>
  <div class="committee">
    <div>
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
          v-if="isCandidate"
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
        <dropdown
          v-if="account"
          :items="['All', 'My']"
          :hint="'My Proposal'"
          :button-type="'a'"
          :selector-type="'a'"
          class="dropdown"
          @on-selected="selectProposal"
        />
      </div>
      <agenda-slot :agendas="agendaFilter()" />
    </div>
    <div>
      <card-vote :candidates="agendaVotesByCandidates" :clength="agendaVotesByCandidates.length" />
      <card-stats :candidates="agendaVotesByCandidates" :clength="agendaVotesByCandidates.length" />
      <card-stats-committee />
      <card-resource />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import AgendaSlot from '@/containers/AgendaSlot.vue';
import CardResource from '@/containers/CardResource.vue';
import CardStats from '@/containers/CardStats.vue';
import CardVote from '@/containers/CardVote.vue';
import CardStatsCommittee from '@/containers/CardStatsCommittee.vue';
import Dropdown from '@/components/Dropdown.vue';

export default {
  components: {
    'card-stats': CardStats,
    'card-vote': CardVote,
    'card-resource': CardResource,
    'card-stats-committee': CardStatsCommittee,
    'agenda-slot': AgendaSlot,
    'dropdown': Dropdown,
  },
  data () {
    return {
      // agenda: this.agendas,
      execute: [false, ''],
      status: [false, ''],
      vote: [false, ''],
      result: [false, ''],
      proposal: [false, ''],
      executeCode: ['Executed', 'Not Executed'],
      statusCode: ['', 'Notice', 'Voting', 'Waiting Exec', 'Executed', 'Ended'],
      resultCode: ['Pending', 'Accepted', 'Reject', 'Dismiss'],
      voteCode: ['Abstain', 'Yes', 'No'],
    };
  },
  computed: {
    ...mapState([
      'agendas',
      'account',
    ]),
    ...mapGetters([
      'isCandidate',
      'agendaVotesByCandidates',
    ]),
  },
  methods: {
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
      if (this.proposal[0] === true) {
        filteredAgenda.length === 0 ? filteredAgenda = this.agendas.filter(agenda => (agenda.creator === this.account.toLowerCase())) : filteredAgenda = filteredAgenda.filter(agenda => agenda.creator === this.account.toLowerCase());
      }

      if (this.execute[0] !== true && this.status[0] !== true && this.vote[0] !== true && this.result[0] !== true && this.proposal[0] !== true) {
        filteredAgenda = this.agendas;
      }

      return filteredAgenda;
    },
    selectExecuted (item) {
      item !== 'All' ? this.execute = [true, item] : this.execute = [false, ''] ;
      this.agendaFilter();
    },
    selectStatus (item) {
      item !== 'All' ? this.status = [true, item] : this.status = [false, ''] ;
      this.agendaFilter();
    },
    selectResult (item) {
      item !== 'All' ? this.result = [true, item] : this.result = [false, ''] ;
      this.agendaFilter();
    },
    selectVoted (item) {
      item !== 'All' ? this.vote = [true, item] : this.vote = [false, ''] ;
      this.agendaFilter();
    },
    selectProposal (item) {
      item !== 'All' ? this.proposal = [true, item] : this.proposal = [false, ''] ;
      this.agendaFilter();
    },
  },
};
</script>

<style scoped>
.committee {
  /* all the `views` have to has this attribue  */
  flex: 1;

  display: flex;
  flex-direction: row;
  justify-content: center;

  background: #fafbfc;

  padding-top: 30px;
  padding-bottom: 50px;
}

.committee > div:nth-child(1) {
  width: 786px;
}
.committee > div:nth-child(2) {
  width: 378px;

  display: flex;
  flex-direction: column;
  margin-top: 100px;
  margin-left: 30px;
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
