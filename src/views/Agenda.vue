<template>
  <div style="background: #fafbfc; flex: 1;">
    <div v-if="$mq === 'desktop'" class="committee">
      <div class="committee-container">
        <div class="agenda-container">
          <div class="dropdown-section">
            <div style="margin-top: 15px;">Filters</div>
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
              :items="['All', 'Executed', 'Not Executed']"
              :hint="'Executed'"
              :button-type="'a'"
              :selector-type="'a'"
              class="dropdown"
              @on-selected="selectExecuted"
            />
            <dropdown
              v-if="isCandidate"
              :items="['All', 'Yes', 'No', 'Abstain', 'Not Voted']"
              :hint="'Voted'"
              :button-type="'a'"
              :selector-type="'a'"
              class="dropdown"
              @on-selected="selectVoted"
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
        <div class="card-container" style="margin-top: 120px;">
          <card-vote :candidates="agendaVotesByCandidates" :clength="agendaVotesByCandidates.length" />
          <card-stats :candidates="agendaVotesByCandidates" :clength="agendaVotesByCandidates.length" />
          <card-stats-committee />
          <card-resource />
        </div>
      </div>
    </div>
    <div v-else-if="$mq === 'tablet'" class="committee-tablet">
      <div class="dropdown-section">
        <div style="margin-top: 15px; width: 60px;">Filters</div>
        <div style="display: flex; flex-wrap: wrap;">
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
            :items="['All', 'Executed', 'Not Executed']"
            :hint="'Executed'"
            :button-type="'a'"
            :selector-type="'a'"
            class="dropdown"
            @on-selected="selectExecuted"
          />
          <dropdown
            v-if="isCandidate"
            :items="['All', 'Yes', 'No', 'Abstain', 'Not Voted']"
            :hint="'Voted'"
            :button-type="'a'"
            :selector-type="'a'"
            class="dropdown"
            @on-selected="selectVoted"
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
      </div>
      <div class="committee-container-tablet">
        <div class="agenda-container-tablet">
          <agenda-slot :agendas="agendaFilter()" />
        </div>
        <div class="card-container-tablet">
          <card-vote :candidates="agendaVotesByCandidates" :clength="agendaVotesByCandidates.length" />
          <card-stats :candidates="agendaVotesByCandidates" :clength="agendaVotesByCandidates.length" />
          <card-stats-committee />
          <card-resource />
        </div>
      </div>
    </div>
    <div v-else class="committee-mobile">
      <div class="dropdown-section-mobile">
        <div style="margin-top: 15px;">Filters</div>
        <div style="display: flex; flex-wrap: wrap;">
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
            :items="['All', 'Executed', 'Not Executed']"
            :hint="'Executed'"
            :button-type="'a'"
            :selector-type="'a'"
            class="dropdown"
            @on-selected="selectExecuted"
          />
          <dropdown
            v-if="isCandidate"
            :items="['All', 'Yes', 'No', 'Abstain', 'Not Voted']"
            :hint="'Voted'"
            :button-type="'a'"
            :selector-type="'a'"
            class="dropdown"
            @on-selected="selectVoted"
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
      </div>
      <agenda-slot :agendas="agendaFilter()" />
      <card-vote :candidates="agendaVotesByCandidates" :clength="agendaVotesByCandidates.length" />
      <card-stats :candidates="agendaVotesByCandidates" :clength="agendaVotesByCandidates.length" />
      <card-stats-committee />
      <card-resource />
      <!-- TODO: check condition -->
      <!-- <div class="vote-btn-container">
        <div class="vote-btn">Vote</div>
      </div> -->
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
      voteCode: ['Abstain', 'Yes', 'No', 'Not Voted'],
    };
  },
  computed: {
    ...mapState([
      'agendas',
      'account',
      'votersOfAgenda',
    ]),
    ...mapGetters([
      'isCandidate',
      'agendaVotesByCandidates',
    ]),
    votedAgenda () {
      return this.votersOfAgenda.filter(votedAgenda => votedAgenda.voter.toLowerCase() === this.account.toLowerCase());
    },
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
        if (filteredAgenda.length === 0) {
          if (stateCode !== 3) {
            const result = this.votedAgenda.filter(agenda => Number(agenda.result[1]) === stateCode && agenda.result[0] === true);
            result.forEach(result => {
              const matchedAgenda = this.agendas.filter(agenda => agenda.agendaid === result.id);
              filteredAgenda.push(matchedAgenda[0]);
            });
          } else {
            const result = this.votedAgenda.filter(agenda => agenda.result[0] === false);
            result.forEach(result => {
              const matchedAgenda = this.agendas.filter(agenda => (agenda.agendaid === result.id));
              filteredAgenda.push(matchedAgenda[0]);
            });
          }
        } else {
          const matchedAgendas = [];
          if (stateCode !== 3) {
            const result = this.votedAgenda.filter(agenda => Number(agenda.result[1]) === stateCode && agenda.result[0] === true);
            result.forEach(result => {
              const matchedAgenda = filteredAgenda.filter(agenda => agenda.agendaid === result.id);
              if (matchedAgenda.length > 0) matchedAgendas.push(matchedAgenda[0]);
            });
          } else {
            const result = this.votedAgenda.filter(agenda => agenda.result[0] === false);
            result.forEach(result => {
              const matchedAgenda = filteredAgenda.filter(agenda => (agenda.agendaid === result.id));
              if (matchedAgenda.length > 0) matchedAgendas.push(matchedAgenda[0]);
            });
          }
          filteredAgenda = matchedAgendas;
        }
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

<style lang="scss" scoped>
.committee {
  display: flex;
  flex-direction: column;

  margin-left: 20px;
  margin-right: 20px;


  .committee-container {
    display: flex;
    justify-content: center;
  }

  .agenda-container {
    display: flex;
    flex-direction: column;

    flex: 3.5;

    width: 100%;
    max-width: 786px;
  }

  .card-container {
    display: flex;
    flex-direction: column;
    margin-left: 30px;

    flex: 2;

    width: 100%;
    max-width: 378px;
  }
}

.dropdown-section {
  display: flex;
  margin-bottom: 45px;

  margin-top: 25px;
}
.dropdown-section > div:first-child {
  align-self: center;
  font-size: 20px;
  color: #3e495c;
  margin-right: 15px;
}
.dropdown-section-mobile {
  display: flex;
  margin-bottom: 33px;
  flex-wrap: wrap;

  margin-top: 35px;
}
.dropdown-section-mobile > div:first-child {
  align-self: center;
  font-size: 20px;
  color: #3e495c;
  margin-right: 15px;
}
.dropdown {
  width: 150px;
  margin-left: 15px;

  margin-top: 10px;
}

.agenda-tablet {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}
.card-section {
  display: flex;
  justify-content: center;
}
.agenda-tablet > .dropdown-section {
  width: 990px;
}
.agenda-section {
  width: 582px;
}
.stat-section {
  width: 378px;
  margin-left: 30px;
  margin-top: 25px;
}

.committee-mobile {
  padding-left: 20px;
  padding-right: 20px;

  .filter-label {
    font-family: Roboto;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.3;
    letter-spacing: normal;
    text-align: left;
    color: #3e495c;
  }

  .filter-container {
    display: flex;
    flex-wrap: wrap;

    .dropdown {
      margin-top: 15px;
    }
  }
}

.card-container {
  width: 378px;
}

.committee-tablet {
  margin-left: 20px;
  margin-right: 20px;

  .committee-container-tablet {
    display: flex;
  }

  .agenda-container-tablet {
    display: flex;
    flex-direction: column;

    flex: 3.5;

    width: 100%;
    min-width: 382px;
  }

  .card-container-tablet {
    display: flex;
    flex-direction: column;
    margin-left: 30px;

    flex: 2;

    width: 100%;
    min-width: 178px;
  }
}

.vote-btn-container {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 73px;

  position: fixed;
  left: 0;
  bottom: 0;

  background: #ffffff;

  .vote-btn {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 43px;

    margin-left: 20px;
    margin-right: 20px;

    background: #257eee;

    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.36;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>