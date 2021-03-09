<template>
  <div class="agenda">
    <div v-if="launched" class="container">
      <div class="filter-container">
        <div class="header">Filters</div>
        <div class="filters">
          <dropdown ref="filter0"
                    class="filter"
                    :items="['All', 'Notice', 'Voting', 'Waiting Exec', 'Executed', 'Ended']"
                    :hint="'Status'"
                    :button-type="'a'"
                    :selector-type="'a'"
                    @on-selected="filter($event, 'status')"
          />
          <dropdown ref="filter1"
                    class="filter"
                    :items="['All', 'Pending', 'Accept', 'Reject', 'Dismiss']"
                    :hint="'Result'"
                    :button-type="'a'"
                    :selector-type="'a'"
                    @on-selected="filter($event, 'result')"
          />
          <dropdown ref="filter2"
                    class="filter"
                    :items="['All', 'Executed', 'Not Executed']"
                    :hint="'Executed'"
                    :button-type="'a'"
                    :selector-type="'a'"
                    @on-selected="filter($event, 'executed')"
          />
          <dropdown v-if="isCandidate"
                    ref="filter3"
                    class="filter"
                    :items="['All', 'Yes', 'No', 'Abstain', 'Not Voted']"
                    :hint="'Vote'"
                    :button-type="'a'"
                    :selector-type="'a'"
                    @on-selected="filter($event, 'voted')"
          />
          <dropdown v-if="account "
                    ref="filter4"
                    class="filter"
                    :items="['All', 'Mine']"
                    :hint="'Proposal'"
                    :button-type="'a'"
                    :selector-type="'a'"
                    @on-selected="filter($event, 'proposal')"
          />
        </div>
      </div>
      <div class="wrapper"
           :style="[
             $mq === 'desktop' || $mq === 'tablet' ? { 'flex-direction': 'row' } : { 'flex-direction': 'column' },
           ]"
      >
        <div class="agenda-container">
          <div class="header">Agenda</div>
          <card-agenda v-for="agenda in agendasFiltered.slice(0, 5)" :key="agenda.agendaid"
                       :agenda="agenda"
          />
          <hide-button v-if="!showAllAgendas && agendasFiltered.length > 5"
                       class="hide-btn"
                       :name="'View more agendas'"
                       :type="'hide'"
                       @on-clicked="showAllAgendas = true;"
          />
          <div v-if="showAllAgendas">
            <card-agenda v-for="agenda in agendasFiltered.slice(5, agendasFiltered.length)"
                         :key="agenda.agendaid"
                         :agenda="agenda"
            />
          </div>
        </div>
        <div class="card-container"
             :style="[
               $mq === 'desktop' || $mq === 'tablet' ?
                 {
                   'width': '378px',
                   'margin-left': '15px',
                 } :
                 {
                   'width': '100%',
                 },
             ]"
        >
          <card-vote v-if="isCandidate" :candidates="agendaVotesByCandidates" :clength="agendaVotesByCandidates.length" />
          <card-stats :candidates="agendaVotesByCandidates" :clength="agendaVotesByCandidates.length" />
          <card-stats-committee />
          <card-resource />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { agendaStatus, agendaResult } from '@/utils/helpers';
import { mapGetters, mapState } from 'vuex';

import Dropdown from '@/components/Dropdown.vue';
import Button from '@/components/Button.vue';
import CardAgendaSlot from '@/containers/CardAgenda.vue';
import CardResource from '@/containers/CardResource.vue';
import CardStats from '@/containers/CardStats.vue';
import CardVote from '@/containers/CardVote.vue';
import CardStatsCommittee from '@/containers/CardStatsCommittee.vue';

export default {
  components: {
    'dropdown': Dropdown,
    'hide-button': Button,
    'card-agenda': CardAgendaSlot,
    'card-stats': CardStats,
    'card-vote': CardVote,
    'card-resource': CardResource,
    'card-stats-committee': CardStatsCommittee,
  },
  data () {
    return {
      showAllAgendas: false,

      filterStatus: 'All',
      filterResult: 'All',
      filterExecuted: 'All',
      filterVoted: 'All',
      filterProposal: 'All',
    };
  },
  computed: {
    ...mapState([
      'account',
      'blockTime',
      'launched',
      'agendas',
      'agendaVotesByCandidates',
    ]),
    ...mapGetters([
      'isMember',
      'isCandidate',
      'voteResult',
    ]),
    agendasFiltered () {
      return this.agendas
        .filter(agenda => {
          if (this.filterStatus === 'All') {
            return true;
          } else {
            return agendaStatus(agenda.status) === this.filterStatus.toUpperCase();
          }
        })
        .filter(agenda => {
          if (this.filterResult === 'All') {
            return true;
          } else {
            return agendaResult(agenda.result) === this.filterResult.toUpperCase();
          }
        })
        .filter(agenda => {
          if (this.filterExecuted === 'All') {
            return true;
          } else {
            if (this.filterExecuted === 'Executed') {
              return agenda.executed;
            } else if (this.filterExecuted === 'Not Executed') {
              return !agenda.executed;
            } else {
              console.log('bug'); // eslint-disable-line
              return true;
            }
          }
        })
        .filter(agenda => {
          let found, notVoted;
          if (this.filterVoted !== 'All') {
            found = this.voteResult.find(result => result.id === agenda.agendaid);

            notVoted = function (agenda) {
              if (agendaStatus(agenda.status) === 'NOTICE' && this.blockTime >= agenda.tNoticeEndTime) {
                if (this.isMember) {
                  return true;
                }
              }
              if (!found) {
                return false;
              }
              if (!found.result[0]) {
                return true;
              }
              return false;
            };
          }

          if (this.filterVoted === 'All') {
            return true;
          } else if (this.filterVoted === 'Not Voted') {
            return notVoted(agenda);
          } else if (this.filterVoted === 'Abstain') {
            if (!found) {
              return false;
            }
            return found.result[1] === '0' && !notVoted(agenda);
          } else if (this.filterVoted === 'Yes') {
            if (!found) {
              return false;
            }
            return found.result[1] === '1';
          } else if (this.filterVoted === 'No') {
            if (!found) {
              return false;
            }
            return found.result[1] === '2';
          } else {
            console.log('bug'); // eslint-disable-line
            return true;
          }
        })
        .filter(agenda => {
          if (this.filterProposal === 'Mine') {
            return agenda.creator.toLowerCase() === this.account.toLowerCase();
          }
          return true;
        });
    },
  },
  watch: {
    account (newAccount, oldAccount) {
      if (newAccount !== oldAccount) {
        for (let i = 0; i < 5; i++) {
          if (this.$refs[`filter${i}`]) {
            this.$refs[`filter${i}`].selectedItem = 'All';
          }
        }
        this.filterStatus = 'All';
        this.filterResult = 'All';
        this.filterExecuted = 'All';
        this.filterVoted = 'All';
        this.filterProposal = 'All';
      }
    },
  },
  methods: {
    filter (value, type) {
      switch (type) {
      case 'status':
        this.filterStatus = value;
        break;
      case 'result':
        this.filterResult = value;
        break;
      case 'executed':
        this.filterExecuted = value;
        break;
      case 'voted':
        this.filterVoted = value;
        break;
      case 'proposal':
        this.filterProposal = value;
        break;
      default:
        break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.agenda {
  background: #fafbfc;
  flex: 1;

  display: flex;
  justify-content: center;
}

.container {
  display: flex;
  flex-direction: column;

  width: 1194px;

  margin-left: 20px;
  margin-right: 20px;

  .filter-container {
    display: flex;

    margin-top: 20px;

    .header {
      font-family: Roboto;
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.3;
      letter-spacing: normal;
      text-align: left;
      color: #3e495c;

      margin-right: 10px;
      margin-top: 8px;
    }

    .filters {
      display: flex;
      flex-wrap: wrap;
    }

    .filter {
      width: 120px;
      margin-top: 8px;

      margin-left: 15px;
    }
  }

  .wrapper {
    display: flex;
  }

  .agenda-container {
    flex: 1;
    margin-right: 15px;

    .header {
      font-size: 24px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.33;
      letter-spacing: normal;
      text-align: left;
      color: #3e495c;

      margin-top: 45px;
      margin-bottom: 16px;
    }
    .hide-btn {
      height: 55px;

      margin-top: 10px;
    }
  }

  .card-container {
    margin-top: 45px;
  }
}
</style>
