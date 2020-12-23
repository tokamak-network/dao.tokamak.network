<template>
  <div class="card-agenda-slot">
    <div class="card-title">
      DAO Vault is Foward Fund to 0xabcd…… - {{ deployedDate(agenda.date) }}
    </div>
    <div class="description">
      {{ agenda.name }}
    </div>
    <div class="time-comp">{{ fromNow(agenda.date) }}</div>
    <div class="button-section">
      <button-comp
        :name="'View Details'"
        :type="'primary'"
        class="button-left"
      />
      <div class="vote-status">
        <div v-if="voted !== true">You have not voted</div>
        <div v-else-if="voted === true" class="vote-selected">You have voted to {{ choice }}</div>
      </div>
      <div class="claimable">{{ agenda.claimableTon }} Ton claimable</div>
      <div class="right-side">
        <dropdown
          v-if="agenda.voted!==true"
          :items="['Yes', 'No']"
          :hint="'Your choice'"
          :button-type="'a'"
          :selector-type="'a'"
          class="dropdown"
          @on-selected="select"
        />
        <button-comp
          v-if="login!==false"
          :name="buttonClass.buttonName"
          :type="buttonClass.buttonType"
          :status="buttonClass.buttonStatus"
          class="button-right"
          @on-clicked="click"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import Dropdown from '@/components/Dropdown.vue';
import moment from 'moment';

export default {
  components: {
    'button-comp': Button,
    'dropdown': Dropdown,
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
    };
  },
  created () {
    this.changeButtonProperty();
  },
  methods: {
    shortAddress (account) {
      return `${account.slice(0, 7)}...`;
    },
    select (item) {
      this.choice = item;
      this.voted = true;
      this.buttonClass.buttonStatus = '';
    },
    href (address) {
      return 'https://etherscan.io/address/' + address;
    },
    deployedDate (timestamp) {
      const date = new Date(timestamp * 1000);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      return this.monthNames[parseInt(month)] + ' ' + day + ', ' + year;
    },
    fromNow (timestamp, suffix) {
      return moment.unix(timestamp).fromNow(suffix);
    },
    changeButtonProperty () {
      if (this.agenda.executed === false && this.agenda.voted === true) {
        this.buttonClass.buttonName = 'Execute';
        this.buttonClass.buttonType = 'secondary';
      } else if (this.agenda.executed === true && this.agenda.claim === false) {
        this.buttonClass.buttonName = 'Claim';
        this.buttonClass.buttonType = 'vote';
      } else if (this.agenda.claim === true) {
        this.buttonClass.buttonName = 'Claim';
        this.buttonClass.buttonStatus = 'disabled';
      } else if (this.agenda.choice === 'Not yet') {
        this.buttonClass.buttonName = 'Vote';
        this.buttonClass.buttonStatus = 'disabled';
      } else {
        this.buttonClass.buttonName = 'Vote';
      }
      return this.buttonClass;
    },
    click () {
      if (this.buttonClass.buttonName === 'Vote') {
        this.buttonClass.buttonName = 'Execute';
        this.buttonClass.buttonType = 'secondary';
      } else if (this.buttonClass.buttonName === 'Execute') {
        this.buttonClass.buttonName = 'Claim';
        this.buttonClass.buttonType = 'vote';
      } else if (this.buttonClass.buttonName === 'Claim') {
        this.buttonClass.buttonStatus = 'disabled';
      }
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
.time-comp {
  margin: 18px 0 19px 7px;
  height: 13px;
  font-size: 10px;
  padding-left: 18px;
  text-align: left;
  color: #86929d;
  background: url('../assets/poll-time-active-icon.svg') no-repeat 0% 45%;
  background-size: 13px;
}
.button-selection > div:first-child {
  display: inline-block;
}
.button-left {
  display: inline-block;
}
.vote-status {
  display: inline-block;
  color: #c9d1d8;
  font-size: 12px;
  margin-left: 20px;
}
.vote-status .vote-selected {
  color: #2a72e5;
}
.claimable {
  font-size: 10px;
  color: #3e495c;
  display: inline-block;
  margin-left: 15px;
}
.right-side {
  float: right;
  margin-right: 30px;
}
.right-side > div{
  display: inline-block;
}
.right-side .dropdown {
  width: 140px;
  right: 10px;
}
</style>
