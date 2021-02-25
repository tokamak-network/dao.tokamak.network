<template>
  <div class="card-agenda-slot">
    <modal v-if="showModal"
           :width="$mq === 'mobile' ? '90%': '786px'"
           @on-closed="showModal=false"
    >
      <template #body>
        <modal-vote :id="agenda.agendaid" @on-closed="showModal=false" />
      </template>
    </modal>
    <div class="sub-container">
      <div class="info-slot">
        <span>Agenda </span>
        <span v-if="agendaType(agenda.agendaid) === 'A'" class="slot">#{{ agenda.agendaid }}</span>
        <span v-else class="slot-typeB">#{{ agenda.agendaid }}</span>
      </div>
      <div class="type-container">
        <span class="type-label">TYPE </span>
        <span v-if="agendaType(agenda.agendaid) === 'A'"
              class="typeA"
        >
          {{ agendaType(agenda.agendaid) }}
        </span>
        <span v-else
              class="typeB"
        >
          {{ agendaType(agenda.agendaid) }}
        </span>
      </div>
    </div>
    <div class="card-title">
      <div class="title">
        {{ agendaTitle(agenda.agendaid) }}
      </div>
    </div>
    <div class="description">
      {{ `This agenda was made by ${shortAddress(agenda.creator)} on` }} {{ agenda.tCreationDate | date1 }}
    </div>

    <div class="info-time">
      <div class="info-time" style="flex: 1;">
        <img v-if="votingTime(agenda) === 'POLL ENDED'"
             src="@/assets/poll-time-inactive-icon.svg" alt=""
             width="14" height="14"
        >
        <img v-else-if="agendaType(agenda.agendaid) === 'A'"
             src="@/assets/poll-time-active-icon.svg" alt=""
             width="14" height="14"
        >
        <img v-else
             src="@/assets/poll-time-active-icon-typeB.svg" alt=""
             width="14" height="14"
        >
        <span class="voting-time-info" :style="[
          votingTime(agenda) === 'POLL ENDED' ? { color: '#d8dee3' } : {},
        ]"
        >
          {{ votingTime(agenda) }}
        </span>
      </div>
      <div v-if="$mq === 'mobile'" class="vote-status" :style="voteResultStyle">
        {{ votedResult() }}
      </div>
    </div>
    <div class="bottom">
      <div class="left-side">
        <button-comp
          :name="'View Detail'"
          :type="agendaType(agenda.agendaid) === 'A' ? 'primary' : 'primary-typeB'"
          class="left"
          :width="'118px'"
          @on-clicked="detail(agenda.agendaid)"
        />
        <div v-if="$mq !== 'mobile'" class="vote-status" :style="voteResultStyle" style="margin-left: 20px;">
          {{ votedResult() }}
        </div>
      </div>
      <div v-if="agenda.status !== 5" class="right-side">
        <button-comp
          v-if="account !== ''"
          :name="buttonName"
          :type="buttonType"
          :status="buttonStatus"
          class="right"
          :width="'124px'"
          @on-clicked="click"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import Modal from '@/components/Modal.vue';
import ModalVote from '@/containers/ModalVote.vue';
import { mapState, mapGetters } from 'vuex';
import { getContract, getContractABIFromAddress, isVotableStatusOfAgenda, canExecute } from '@/utils/contracts';
import { hexSlicer, votingTime } from '@/utils/helpers';

export default {
  components: {
    'button-comp': Button,
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
      now: parseInt(Date.now() / 1000),
      login: true,
      buttonClass: {
        'buttonName': 'Vote',
        'buttonType': 'vote',
        'buttonStatus': 'disabled',
      },
      choice: '',
      showModal: false,
      votableStatus: true,
      executable: false,
    };
  },
  computed: {
    ...mapState([
      'web3',
      'account',
      'members',
      'confirmBlock',
      'etherscanAddress',
      'votersOfAgenda',
    ]),
    ...mapGetters([
      'agendaOnChainEffects',
      'agendaType',
      'agendaTitle',
      'isMember',
      'myCandidates',
    ]),
    target () {
      const onChainEffects = this.agendaOnChainEffects(this.agenda.agendaid);
      if (!onChainEffects || onChainEffects.length === 0) return '';

      return onChainEffects[0].target;
    },
    title () {
      const abi = getContractABIFromAddress(this.target);
      if (!abi || abi.length === 0) return '';
      return abi[0].title;
    },
    voteResultStyle () {
      if (this.voted.length > 0 && this.voted[0].result[0]) {
        if (this.agendaType(this.agenda.agendaid) === 'A') {
          return { 'color': '#2a72e5' };
        } else {
          return { 'color': '#ff7800' };
        }
      }
      return 0;
    },
    shortAddress () {
      return account => hexSlicer(account);
    },
    href () {
      return address => this.etherscanAddress + '/address/' + address;
    },
    buttonName () {
      switch (this.agenda.status) {
      case 2:
        if (this.agenda.tVotingEndTime < this.now) return 'End Agenda';
        else return 'Vote';
      case 3:
        return 'Execute';
      case 4: return 'End Agenda';
      case 5: return 'End Agenda';
      }
      return 'Vote';
    },
    buttonType () {
      switch (this.agenda.status) {
      case 3:
        return 'secondary';
      case 4: return 'secondary';
      case 5: return 'secondary';
      }
      return 'vote';
    },
    buttonStatus () {
      /*
      console.log('this.votableStatus', this.votableStatus);
      console.log('this.executable', this.executable);
      console.log('this.agenda.status', this.agenda.status);
      console.log('(this.agenda.tVotingEndTime > this.now)', (this.agenda.tVotingEndTime > this.now));
      console.log('(this.agenda.tVotingEndTime < this.now)', (this.agenda.tVotingEndTime < this.now));
      */
      if ((this.votableStatus && this.agenda.status === 2 && (this.agenda.tVotingEndTime > this.now))
        || (this.executable && this.agenda.status === 3 && (this.agenda.tVotingEndTime < this.now))) {
        return '';
      } else if (this.agenda.tExecutableLimitTimestamp < this.now) {
        return 'disabled';
      } else {
        return 'disabled';
      }
      // switch (this.agenda.status) {
      // case 1:
      //   if (this.votableStatus) return '';
      //   else return 'disabled';
      // case 2: return '';
      // case 3:
      //   if (this.executable) return '';
      //   else return 'disabled';
      // case 4: return 'disabled';
      // case 5: return 'disabled';
      // }
      // return 'disabled';
    },
    canVote () {
      if (this.isMember || this.isVoter)
        return true;
      // else if (this.isVoter)
      //   return true;
      else
        return false;
    },
    isVoter () {
      let returnValue = false;
      if (this.agenda && this.agenda.status === 2 && this.agenda.tVotingStartTime < this.now
        && this.agenda.tVotingEndTime > this.now
        && this.agenda.voters && this.agenda.voters.length > 0) {
        this.agenda.voters.forEach(voter=>{
          if (voter != null && (this.myCandidates.indexOf(voter.toLowerCase()) > -1))
            returnValue = true;
        });
        return returnValue;
      } else return returnValue;
    },
    votingTime () {
      return agenda => votingTime(agenda);
    },
    voted () {
      const voters = this.votersOfAgenda.filter(voter => String(voter.id) === String(this.agenda.agendaid));
      return voters.filter(vote => vote.voter.toLowerCase() === this.account.toLowerCase());
    },
  },
  watch: {
    'checkStatus': {
      handler: async function () {
        this.votableStatus = await isVotableStatusOfAgenda(this.agenda.agendaid, this.web3);
        this.executable = await canExecute(this.agenda.agendaid, this.web3);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    votedResult () {
      if (this.voted.length > 0) {
        if (this.voted[0].result[0] === false) {
          return 'You have not voted';
        } else {
          switch (this.voted[0].result[1]) {
          case '0': return 'You have voted to Abstain';
          case '1': return 'You have voted Yes';
          case '2': return 'You have voted No';
          }
        }
      } else {
        return 'You have not voted';
      }
    },
    async click () {
      if (!this.web3) {
        alert('Check Connect Wallet !');
        return;
      }
      if (this.agenda.status === 2 && this.agenda.tVotingEndTime < this.now) {
        this.terminateAgenda();
      } else if (this.agenda.status === 2 || this.agenda.status === 1) {
        const isVotableStatus = await isVotableStatusOfAgenda(this.agenda.agendaid, this.web3);
        if (!isVotableStatus) {
          alert('This Agenda is not in a state to vote.');
          return ;
        }

        if (this.voted.length > 0) {
          if (this.voted[0].result[1]) {
            alert('You have already voted.');
            return ;
          }
        }
        const operator = [];
        this.members.forEach(async member => operator.push(member.operator));
        (!operator.includes(this.account.toLowerCase()) ? alert('You are not members!') : this.showModal = true);
      } else if (this.agenda.status === 3) {
        this.execute();
      }
      this.$store.dispatch('setAgendas');
    },
    async terminateAgenda () {
      const DAOCommitteeProxy = getContract('DAOCommitteeProxy', this.web3);
      await DAOCommitteeProxy.methods.endAgendaVoting(this.agenda.agendaid).send({
        from: this.account,
      }).on('transactionHash', (hash) => {
        this.$store.commit('SET_PENDING_TX', hash);
      })
        .on('confirmation', async (confirmationNumber) => {
          if (this.confirmBlock === confirmationNumber) {
            this.$store.commit('SET_PENDING_TX', '');
            await this.$store.dispatch('launch');
            await this.$store.dispatch('connectEthereum', this.web3);
          }
        })
        .on('receipt', () => {
        })
        .on('error', () => {
          this.$store.commit('SET_PENDING_TX', '');
        });
    },
    async execute () {
      const daoCommitteeProxy = getContract('DAOCommitteeProxy', this.web3);
      const gasLimit = await daoCommitteeProxy.methods.executeAgenda(this.agenda.agendaid).send({ from: this.account });

      await daoCommitteeProxy.methods.executeAgenda(this.agenda.agendaid)
        .send({
          from: this.account,
          gasLimit: Math.floor(gasLimit * 1.2),
        })
        .on('transactionHash', (hash) => {
          this.$store.commit('SET_PENDING_TX', hash);
        })
        .on('confirmation', async (confirmationNumber) => {
          if (this.confirmBlock === confirmationNumber) {
            this.$store.commit('SET_PENDING_TX', '');
            await this.$store.dispatch('launch');
            await this.$store.dispatch('connectEthereum', this.web3);
          }
        })
        .on('error', () => {
          this.$store.commit('SET_PENDING_TX', '');
        });
    },
    detail (id) {
      this.$router.push({
        path: `/agenda/${id}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.card-agenda-slot {
  padding: 25px 30px;
  margin-bottom: 20px;

  flex: 1;

  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(96, 97, 112, 0.16);
  background-color: #ffffff;

  > div {
    font-family: Roboto;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
  }
}

.title {
  flex: 1;

  margin-top: 3px;
  margin-bottom: 5px;
}
.type-container {
  display: flex;

  .type-label {
    font-family: Roboto;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: 0.3px;
    text-align: left;
    color: #3e495c;

    white-space: pre-wrap;
  }
  .typeA {
    font-family: Roboto;
    font-size: 12px;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: 0.3px;
    text-align: left;
    font-weight: bold;
    color: #2a72e5;

    white-space: pre-wrap;
  }
  .typeB {
    font-family: Roboto;
    font-size: 12px;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: 0.3px;
    text-align: left;
    font-weight: bold;
    color: #f7981c;

    white-space: pre-wrap;
  }
}

.sub-container {
  display: flex;
}

.card-title {
  // height: 26px;
  margin: 0 0 5px;
  font-size: 20px;
  text-align: left;
  color: #3e495c;

  display: flex;
}

.info-slot {
  display: flex;
  flex: 1;
}
.info-slot > span {
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: right;
  color: #3e495c;

  white-space: pre-wrap;
}
.info-slot > .slot {
  color: #2a72e5;
}
.info-slot > .slot-typeB {
  color: #ff7800;
}
.description {
  font-size: 14px;
  // height: 19px;
  text-align: left;
  color: #86929d;

  margin-bottom: 25px;
}

.info-time {
  display: flex;
  align-items: center;
}
.info-time > span {
  font-family: Roboto;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #86929d;
}

.card-agenda-slot > .bottom {
  display: flex;
  justify-content: space-between;

  margin-top: 25px;
}
.card-agenda-slot > .bottom > .left-side {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-agenda-slot > .bottom > .left-side > .left {
  width: 110px;
  align-self: flex-end;
}
.vote-status .vote-selected {
  color: #2a72e5;
}
.card-agenda-slot > .bottom > .left-side > .claimable {
  font-size: 10px;
  color: #3e495c;
  align-self: flex-end;
}
.card-agenda-slot > .bottom > .right-side {
  display: flex;
  justify-content: flex-end;
}
.card-agenda-slot > .bottom > .right-side > .right {
  width: 110px;
  align-self: flex-end;
}

.vote-status {
  color: #c9d1d8;
  font-size: 12px;
}

.voting-time-info {
  margin-left: 6px;
}
</style>
