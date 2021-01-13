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
      DAO Vault is Foward Fund to {{ shortAddress(agenda.creator) }} - {{ deployedDate(agenda.tCreationDate) }}
    </div>
    <div class="description">
      {{ agenda.target }}
    </div>
    <div class="info-time">
      <img src="@/assets/poll-time-active-icon.svg" alt=""
           width="14" height="14"
      >
      <span>{{ dDay(agenda.tCreationDate) }}</span>
    </div>
    <div class="bottom">
      <div class="left-side">
        <button-comp
          :name="'View Details'"
          :type="'primary'"
          class="left"
          :width="'118px'"
          @on-clicked="detail(agenda.agendaid)"
        />
        <div class="vote-status">
          <div v-if="voted !== true">You have not voted</div>
          <div v-else-if="voted === true" class="vote-selected">You have voted to {{ choice }}</div>
        </div>
        <!-- <div class="claimable">{{ agenda.claimableTon }} Ton claimable</div> -->
      </div>
      <div class="right-side">
        <div v-if="agenda.status < 3" class="dropdown-section">
          <div class="your-vote">YOUR VOTE</div>
          <dropdown
            :items="['Yes', 'No']"
            :hint="'Your choice'"
            :button-type="'a'"
            :selector-type="'a'"
            class="dropdown"
            @on-selected="select"
          />
        </div>
        <button-comp
          v-if="login!==false"
          :name="buttonClass.buttonName"
          :type="buttonClass.buttonType"
          :status="buttonClass.buttonStatus"
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
import Dropdown from '@/components/Dropdown.vue';
import Modal from '@/components/Modal.vue';
import ModalVote from '@/containers/ModalVote.vue';

import { mapState } from 'vuex';
import { getContracts } from '@/utils/contracts';

import moment from 'moment';

export default {
  components: {
    'button-comp': Button,
    'dropdown': Dropdown,
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
        'buttonStatus': '',
      },
      choice: this.agenda.choice,
      voted: this.agenda.voted,
      monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      showModal: false,
    };
  },
  computed: {
    ...mapState([
      'web3',
      'account',
      'members',
    ]),
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
      return (timestamp) => {
        const dDay = new Date(moment.unix(timestamp).add(14, 'days'));
        const now = new Date();
        const gap = dDay.getTime() - now.getTime();
        if (gap < 0) {
          return 'ENDED POLL';
        } else {
          const days = Math.floor(gap / (1000 * 60 * 60 * 24));
          const hours = Math.floor((gap - days * 86400000) / 3600000);

          return days + 'D ' + hours + 'H REMAINING';
        }
      };
    },
  },
  created () {
    this.changeButtonProperty();
  },
  methods: {
    select (item) {
      this.choice = item;
      this.voted = true;
      this.buttonClass.buttonStatus = '';
    },
    async changeButtonProperty () {
      // const agendaManager = getContracts('DAOAgendaManager', this.web3);
      // const a = await agendaManager.methods.getVoters(5).call();
      // console.log(a[11]);
      // console.log(a[10]);
      // console.log(a);
      if (this.agenda.voters.includes(this.account) || this.agenda.status === 3) {
        this.buttonClass.buttonName = 'Execute';
        this.buttonClass.buttonType = 'secondary';
      } else if (this.agenda.status === 5) {
        this.buttonClass.buttonName = 'Claim';
        this.buttonClass.buttonType = 'vote';
      } else if (this.agenda.status === 4 && this.agenda.executed === true) {
        this.buttonClass.buttonName = 'Claim';
        this.buttonClass.buttonStatus = 'disabled';
      } else if (this.agenda.status === 0) {
        this.buttonClass.buttonName = 'voting start';
        this.buttonClass.buttonStatus = 'disabled';
      } else if (this.agenda.status === 1) {
        this.buttonClass.buttonName = 'voting start';
        this.buttonClass.buttonStatus = '';
      } else {
        this.buttonClass.buttonName = 'Vote';
        this.buttonClass.buttonStatus = '';
      }
      return this.buttonClass;
    },
    click () {
      if (this.buttonClass.buttonName === 'Vote') {
        const operator = [];
        this.members.forEach(async member => operator.push(member.operator));
        (!operator.includes(this.account.toLowerCase()) ? alert('not members!') : this.showModal=true);
      } else if (this.buttonClass.buttonName === 'Execute') {
        this.execute();
      } else if (this.buttonClass.buttonName === 'Claim') {
        this.buttonClass.buttonStatus = 'disabled';
      } else if (this.buttonClass.buttonName === 'voting start') {
        this.start();
      }
    },
    async start () {
      const agendaManager = getContracts('DAOAgendaManager', this.web3);

      agendaManager.methods.startVoting(this.agenda.agendaid).send({ from:this.account });
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
