<template>
  <div class="card-agenda-slot">
    <modal v-if="showModal"
           :width="786"
           @on-closed="showModal=false"
    >
      <template #body>
        <modal-vote :id="agenda.agendaid" @on-closed="showModal=false" />
      </template>
    </modal>
    <div class="card-title">
      <div>
        {{ title }} {{ shortAddress(agenda.creator) }} - {{ deployedDate(agenda.tCreationDate) }}
      </div>
      <div class="info-slot">
        <span>Agenda </span>
        <span class="slot">#{{ agenda.agendaid }}</span>
      </div>
    </div>
    <div class="description">
      Created by {{ shortAddress(agenda.creator) }}
    </div>
    <div class="info-time">
      <img src="@/assets/poll-time-active-icon.svg" alt=""
           width="14" height="14"
      >
      <span>{{ dDay() }}</span>
    </div>
    <div class="bottom">
      <div class="left-side">
        <button-comp
          :name="'View Detail'"
          :type="'primary'"
          class="left"
          :width="'118px'"
          @on-clicked="detail(agenda.agendaid)"
        />
        <div class="vote-status" :style="voteResultStyle">
          {{ votedResult() }}
        </div>
      </div>
      <div v-if="agenda.executed === false" class="right-side">
        <button-comp
          v-if="login!==false"
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
import { getContracts, getContractABIFromAddress } from '@/utils/contracts';

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
      endedShow: false,
      login: true,
      buttonClass: {
        'buttonName': 'Vote',
        'buttonType': 'vote',
        'buttonStatus': 'disabled',
      },
      choice: '',
      monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      showModal: false,
    };
  },
  computed: {
    ...mapState([
      'web3',
      'account',
      'members',
      'myVote',
      'voteCasted',
    ]),
    ...mapGetters([
      'agendaOnChainEffects',
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
      if (this.agenda.voting !== undefined) {
        return {
          'color': '#2a72e5',
        };
      }
      return 0;
    },
    shortAddress () {
      return account => `${account.slice(0, 7)}...`;
    },
    href () {
      return address => 'https://etherscan.io/address/' + address;
    },
    deployedDate () {
      return (timestamp) => {
        const date = new Date(timestamp * 1000);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        return this.monthNames[parseInt(month)] + ' ' + day + ', ' + year;
      };
    },
    dDay () {
      return () => {
        if (this.agenda.tNoticeEndTime * 1000 > new Date().getTime() || this.agenda.tVotingEndTime === 0) {
          return 'VOTE IS NOT STARTED';
        } else {
          const dDay = new Date(this.agenda.tVotingEndTime);
          const now = new Date();
          const gap = dDay.getTime() * 1000 - now.getTime();
          if (gap < 0) {
            return 'ENDED POLL';
          } else {
            const days = Math.floor(gap / (1000 * 60 * 60 * 24));
            const hours = Math.floor((gap - days * 86400000) / 3600000);

            return days + 'D ' + hours + 'H REMAINING';
          }
        }
      };
    },
    buttonName () {
      switch (this.agenda.status) {
      case 3: return 'Execute';
      case 4: return 'Execute';
      case 5: return 'Execute';
      }
      return 'Vote';
    },
    buttonType () {
      switch (this.agenda.status) {
      case 4: return 'secondary';
      case 5: return 'secondary';
      }
      return 'vote';
    },
    buttonStatus () {
      switch (this.agenda.status) {
      case 1: return '';
      case 2: return '';
      case 3: return '';
      }
      return 'disabled';
    },
  },
  created () {
    console.log(this.title);
  },
  methods: {
    votedResult () {
      if (this.agenda.voting !== undefined) {
        switch (this.agenda.voting) {
        case '0': return 'You have voted to Abstain';
        case '1': return 'You have voted Yes';
        case '2': return 'You have voted No';
        }
      } else {
        return 'You have not voted';
      }
    },

    click () {
      if (this.agenda.status === 2 || this.agenda.status === 1) {
        const operator = [];
        this.members.forEach(async member => operator.push(member.operator));
        (!operator.includes(this.account.toLowerCase()) ? alert('not members!') : this.showModal=true);
      } else if (this.agenda.status === 3) {
        this.execute();
      }
      this.$store.dispatch('setAgendas');
    },
    async execute () {
      const daoCommittee = getContracts('DAOCommittee', this.web3);
      const gasLimit = await daoCommittee.methods.executeAgenda(
        this.agenda.agendaid,
      ).send({
        from: this.account,
      });

      await daoCommittee.methods.executeAgenda(
        this.agenda.agendaid,
      ).send({
        from: this.account,
        gasLimit: Math.floor(gasLimit * 1.2),
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

<style scoped>
.card-agenda-slot {
  flex: 1;
  padding: 25px 0 25px 30px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(96, 97, 112, 0.16);
  background-color: #ffffff;
}
.card-agenda-slot > div {
  font-family: Roboto;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
}
.card-title {
  height: 26px;
  margin: 0 0 5px;
  font-size: 20px;
  text-align: left;
  color: #3e495c;

  display: flex;
}

.info-slot {
  flex: 1;

  display: flex;
  justify-content: flex-end;
  margin-right: 30px;
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
.description {
  font-size: 14px;
  height: 19px;
  text-align: left;
  color: #86929d;
}

.info-time {
  display: flex;
  align-items: center;

  margin-top: 24px;
  margin-bottom: 3px;
}
.info-time > span {
  font-family: Roboto;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #86929d;

  margin-left: 7px;
}

.card-agenda-slot > .bottom {
  display: flex;
  justify-content: space-between;
}
.card-agenda-slot > .bottom > .left-side {
  display: flex;
  align-self: flex-end;
  justify-content: flex-start;
  height: 55px;
}
.card-agenda-slot > .bottom > .left-side > .left {
  width: 110px;
  align-self: flex-end;
}
.card-agenda-slot > .bottom > .left-side > .vote-status {
  color: #c9d1d8;
  font-size: 12px;
  margin: 0 0 8px 20px;
  align-self: flex-end;
}
.vote-status .vote-selected {
  color: #2a72e5;
}
.card-agenda-slot > .bottom > .left-side > .claimable {
  font-size: 10px;
  color: #3e495c;
  margin: 0 0 10px 15px;
  align-self: flex-end;
}
.card-agenda-slot > .bottom > .right-side {
  display: flex;
  justify-content: flex-end;
}
.card-agenda-slot > .bottom > .right-side > .right {
  width: 110px;
  margin-right: 30px;
  align-self: flex-end;
}
.card-agenda-slot > .bottom > .right-side > .dropdown-section > .your-vote{
  margin: 3px 0px 10px 0px;
  font-size: 10px;
  color: #3e495c;
}
.right-side .dropdown {
  width: 140px;
  right: 10px;
}
</style>
