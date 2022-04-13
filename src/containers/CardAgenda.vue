<template>
  <div class="card-agenda">
    <modal v-if="showModal"
           :width="$mq === 'mobile' ? '90%': '786px'"
           @on-closed="showModal=false"
    >
      <template #body>
        <modal-vote :id="agenda.agendaid"
                    @on-closed="showModal=false"
                    @on-voted="onVoted"
        />
      </template>
    </modal>
    <div class="header-container">
      <text-small :type="agenda.type"
                  :label="'Agenda'"
                  :value="`#${agenda.agendaid}`"
      />
      <text-small :type="agenda.type"
                  :label="'Type'"
                  :value="agenda.type"
      />
    </div>
    <div class="title">{{ agendaTitle(agenda.agendaid) }}</div>
    <div class="title-sub">{{ `This agenda was made by ${shortAddress(agenda.creator)} on` }} {{ agenda.tCreationDate | date1 }}</div>
    <text-time :type="agenda.type"
               :time="votingTime(agenda)"
               :is-active="votingTime(agenda) !== 'POLL ENDED'"
    />
    <div class="button-container">
      <agenda-button :name="'View Detail'"
                     :type="agenda.type === 'A' ? 'primary' : 'primary-typeB'"
                     :width="'110px'"
                     @on-clicked="route(`/agenda/${agenda.agendaid}`);"
      />
      <div class="vote-result" :style="voteResultStyle">
        {{ voteResultString }}
      </div>
      <agenda-button v-if="canAction"
                     :name="action"
                     :type="action === 'VOTE' ? 'vote' : 'secondary'"
                     :width="'124px'"
                     :status="actionStatus"
                     @on-clicked="act(action)"
      />
    </div>
  </div>
</template>

<script>
import { agendaStatus, agendaResult, hexSlicer, votingTime } from '@/utils/helpers';
import { getContract } from '@/utils/contracts';
import { mapGetters, mapState } from 'vuex';

import Button from '@/components/Button.vue';
import TextSmall from '@/components/TextSmall.vue';
import TextTime from '@/components/TextTime.vue';
import Modal from '@/components/Modal.vue';
import ModalVote from '@/containers/ModalVote.vue';

export default {
  components: {
    'agenda-button': Button,
    'text-small': TextSmall,
    'text-time': TextTime,
    'modal': Modal,
    'modal-vote': ModalVote,
  },
  props: {
    agenda: {
      type: Object,
      default: () => {},
    },
  },
  data () {
    return {
      showModal: false,
      actInProgress: false,
    };
  },
  computed: {
    ...mapState([
      'account',
      'agendaVotesByCandidates',
      'blockTime',
      'confirmBlock',
      'web3',
      'votersOfAgenda',
      'pendingTx',
    ]),
    ...mapGetters([
      'agendaTitle',
      'agendaIdsCanVote',
      'isMember',
      'candidateContractFromEOA',
      'voteResult',
      'canVoteForAgenda',
    ]),
    voteResultStyle () {
      if (this.voteResultString === 'You have not voted') {
        return { 'color': '#c9d1d8' };
      } else {
        if (this.agenda.type === 'A') {
          return { 'color': '#2a72e5' };
        } else {
          return { 'color': '#ff7800' };
        }
      }
    },
    votingTime () {
      return agenda => votingTime(agenda);
    },
    shortAddress () {
      return account => hexSlicer(account);
    },
    voteResultString () {
      if (agendaStatus(this.agenda.status) === 'NOTICE' && this.blockTime >= this.agenda.tNoticeEndTime) {
        if (this.isMember) {
          return 'You have not voted';
        }
      }

      const found = this.voteResult.find(result => result.id === this.agenda.agendaid);
      if (found) {
        if (!found.result[0]) {
          return 'You have not voted';
        } else {
          switch (found.result[1]) {
          case '0':
            return 'You have voted to "Abstain"';
          case '1':
            return 'You have voted to "Yes"';
          case '2':
            return 'You have voted to "No"';
          default:
            return '';
          }
        }
      } else {
        return '';
      }
    },
    canAction () {
      return this.action;
    },
    actionStatus () {
      if (this.actInProgress) {
        return 'running';
      }

      const agenda = this.agenda;
      if (!agenda) {
        return 'disabled';
      }
      if (this.action === 'VOTE') {
        return this.canVoteForAgenda(agenda.agendaid) ? '' : 'disabled';
      } else {
        return '';
      }
    },
    action () {
      const agenda = this.agenda;
      if (!agenda) {
        return '';
      }

      if (agendaStatus(agenda.status) === 'NOTICE' && this.blockTime >= agenda.tNoticeEndTime) {
        return this.isMember ? 'VOTE' : '';
      } else if (agendaStatus(agenda.status) === 'VOTING' && this.blockTime <= agenda.tVotingEndTime) {
        return this.isMember ? 'VOTE' : '';
      } else if (agendaStatus(agenda.status) === 'WAITING_EXEC' &&
                 agendaResult(agenda.result) === 'ACCEPT' &&
                 this.blockTime >= agenda.tVotingEndTime &&
                 this.blockTime <= agenda.tExecutableLimitTimestamp &&
                 !agenda.executed) {
        return 'EXECUTE';
      } else if (agendaStatus(agenda.status) === 'VOTING' &&
                 this.blockTime >= agenda.tVotingEndTime) {
        return 'END AGENDA';
      } else {
        return '';
      }
    },
  },
  watch: {
    pendingTx (newValue) {
      if (newValue === '') {
        this.actInProgress = false;
      }
    },
  },
  methods: {
    onVoted () {
      this.actInProgress = true;
    },
    route (path) {
      this.$router.push({ path });
    },
    async act (action) {
      if (action === 'VOTE') {
        this.showModal = true;
      } else if (action === 'EXECUTE') {
        const daoCommitteeProxy = getContract('DAOCommitteeProxy', this.web3);

        const gasLimit = await daoCommitteeProxy.methods.executeAgenda(this.agenda.agendaid)
          .estimateGas({
            from: this.account,
          });

        await daoCommitteeProxy.methods.executeAgenda(this.agenda.agendaid)
          .send({
            from: this.account,
            gasLimit: Math.floor(gasLimit * 1.2),
          })
          .on('transactionHash', (hash) => {
            this.actInProgress = true;
            this.$store.commit('SET_PENDING_TX', hash);
          })
          .on('confirmation', async (confirmationNumber) => {
            if (this.confirmBlock === confirmationNumber) {
              this.actInProgress = false;
              this.$store.commit('SET_PENDING_TX', '');

              await this.$store.dispatch('launch');
              await this.$store.dispatch('connectEthereum', this.web3);
            }
          })
          .on('error', () => {
            this.$store.commit('SET_PENDING_TX', '');
          });
      } else if (action === 'END AGENDA') {
        const daoCommitteeProxy = getContract('DAOCommitteeProxy', this.web3);

        const gasLimit = await daoCommitteeProxy.methods.endAgendaVoting(this.agenda.agendaid)
          .estimateGas({
            from: this.account,
          });

        await daoCommitteeProxy.methods.endAgendaVoting(this.agenda.agendaid)
          .send({
            from: this.account,
            gasLimit: Math.floor(gasLimit * 1.2),
          })
          .on('transactionHash', (hash) => {
            this.actInProgress = true;
            this.$store.commit('SET_PENDING_TX', hash);
          })
          .on('confirmation', async (confirmationNumber) => {
            if (this.confirmBlock === confirmationNumber) {
              this.actInProgress = false;
              this.$store.commit('SET_PENDING_TX', '');

              await this.$store.dispatch('launch');
              await this.$store.dispatch('connectEthereum', this.web3);
            }
          })
          .on('error', () => {
            this.$store.commit('SET_PENDING_TX', '');
          });
      } else {
        console.log('bug', 'no action'); // eslint-disable-line
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card-agenda {
  flex: 1;

  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(96, 97, 112, 0.16);
  background-color: #ffffff;

  padding: 25px 30px;
  margin-bottom: 20px;

  .header-container {
    display: flex;
    justify-content: space-between;
  }

  .title {
    font-family: Roboto;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.3;
    letter-spacing: normal;
    text-align: left;
    color: #3e495c;

    margin-top: 3px;
    margin-bottom: 5px;
  }

  .title-sub {
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.36;
    letter-spacing: normal;
    text-align: left;
    color: #86929d;

    margin-bottom: 25px;
  }

  .button-container {
    margin-top: 26px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .vote-result {
      flex: 1;

      font-family: Roboto;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.33;
      letter-spacing: normal;
      text-align: left;

      margin-left: 20px;
    }
  }
}
</style>
