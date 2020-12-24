<template>
  <div class="card-committee-slot">
    <div>
      <div class="card-header">
        <span class="subject">Status</span>
        <span class="colon">:</span>
        <span class="content">{{ operator.status }}</span>
        <span class="colon">|</span>
        <span class="subject">Elected</span>
        <span class="colon">:</span>
        <span class="content">
          <a class="link" target="_blank" rel="noopener noreferrer" :href="href(operator.address)">
            {{ shortAddress(operator.address) }}
          </a>
        </span>
        <span class="colon">|</span>
        <span class="subject"># of Votes</span>
        <span class="colon">:</span>
        <span class="content">{{ operator.votes }}</span>
      </div>
      <div class="slot">
        <div class="slot-title">Slot </div>
        <div class="slot-number">#{{ operator.index }}</div>
      </div>
    </div>
    <div class="card-title">
      {{ shortAddress(operator.address) }} is elected to Committee member since {{ deployedDate(operator.date) }}
    </div>
    <div class="operator-name">
      {{ operator.name }}
    </div>
    <div class="time-comp">{{ fromNow(operator.date) }}</div>
    <div class="button-section">
      <button-comp
        :name="'View Details'"
        :type="'primary'"
        class="button-left"
      />
      <button-comp
        v-if="login!==false"
        :name="'Challenge'"
        :type="'secondary'"
        class="button-right"
      />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

import moment from 'moment';

export default {
  components: {
    'button-comp': Button,
  },
  props: {
    operator: {
      type: Object,
      default: () => {},
    },
  },
  data () {
    return {
      electedOperators: [],
      endedShow: false,
      login: true,
      monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    };
  },
  computed: {
    shortAddress () {
      return account => `${account.slice(0, 7)}...`;
    },
    href () {
      return address => 'https://etherscan.io/address/' + address;
    },
    deployDate () {
      return (timestamp) => {
        const date = new Date(timestamp * 1000);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        return this.monthNames[parseInt(month)] + ' ' + day + ', ' + year;
      };
    },
    fromNow () {
      return (timestamp, suffix) => moment.unix(timestamp).fromNow(suffix);
    },
  },
};
</script>

<style scoped>
.card-committee-slot {
  flex: 1;
  padding: 25px 0 25px 30px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(96, 97, 112, 0.16);
  background-color: #ffffff;
}
.card-committee-slot > div {
  font-family: Roboto;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
}
.card-header {
  height: 11px;
  margin: 0 0 11px 0;
  font-size: 9px;
  text-align: left;
  color: #3e495c;
}
.card-header .subject {
  color: #2a72e5;
  display: inline-block;
  margin-right: 2px;
}
.card-header .colon {
  color: #cfd7db;
  display: inline-block;
  margin-right: 2px;
}
.card-header .content {
  color: #3e495c;
  display: inline-block;
  margin-right: 2px;
}
.card-header .content .link {
  text-decoration: underline;
  color: #3e495c;
}
.card-title {
  height: 26px;
  margin: 0 0 5px;
  font-size: 20px;
  text-align: left;
  color: #3e495c;
}
.operator-name {
  font-size: 14px;
  height: 19px;
  text-align: left;
  color: #86929d;
}
.card-header {
  display: inline-block;
}
.slot {
  width: 38px;
  height: 16px;
  margin: 0 30px 1px 0px;
  font-size: 12px;
  font-weight: 500;
  text-align: right;
  color: #3e495c;
  float: right;
}
.slot .slot-title {
  display: inline-block;
}
.slot .slot-number {
  display: inline-block;
  color: #2a72e5;
  margin-left: 3px;
}
.time-comp {
  margin: 18px 0 19px 7px;;
  font-size: 10px;
  padding-left: 18px;
  text-align: left;
  color: #86929d;
  background: url('../assets/poll-time-active-icon.svg') no-repeat 0% 45%;
  background-size: 13px;
}
.title {
  height: 32px;
  margin: 0px 0px 12px 0;
  font-size: 24px;
  text-align: left;
  color: #3e495c;
}
.button-left {
  display: inline-block;
}
.button-right {
  float: right;
  margin-right: 30px;
}
</style>
