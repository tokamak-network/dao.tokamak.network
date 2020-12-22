<template>
  <div class="card-committee-slot">
    <div>
      <div class="card-header">
        <div class="subject">Status</div>
        <div class="colon">:</div>
        <div class="content">{{ operator.status }}</div>
        <div class="colon">|</div>
        <div class="subject">Elected</div>
        <div class="colon">:</div>
        <div class="content">
          <a class="link" target="_blank" rel="noopener noreferrer" :href="href(operator.address)">
            {{ shortAddress(operator.address) }}
          </a>
        </div>
        <div class="colon">|</div>
        <div class="subject"># of Votes</div>
        <div class="colon">:</div>
        <div class="content">{{ operator.votes }}</div>
      </div>
      <div class="slot-number">
        <div style="display: inline-block;">Slot </div>
        <div style="display: inline-block; color: #2a72e5; margin-left: 3px;">#{{ operator.index }}</div>
      </div>
    </div>
    <div class="card-title">
      {{ shortAddress(operator.address) }} is elected to Committee member since {{ deployedDate(operator.date) }}
    </div>
    <div class="operator-name">
      {{ operator.name }}
    </div>
    <time-comp :time="fromNow(operator.date)" class="time-comp" />
    <div class="button-section">
      <button-comp
        :name="'View Details'"
        :type="'primary'"
        style="display: inline-block;"
      />
      <button-comp
        v-if="login!==false"
        :name="'Challenge'"
        :type="'secondary'"
        style="float: right; margin-right:30px;"
      />
    </div>
  </div>
</template>

<script>
import Time from '@/components/Time.vue';
import Button from '@/components/Button.vue';

import moment from 'moment';

export default {
  components:{
    'time-comp': Time,
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
  methods: {
    shortAddress (account) {
      return `${account.slice(0, 7)}...`;
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
.card-header {
  height: 11px;
  margin: 0 0 12px 0;
  font-family: Roboto;
  font-size: 9px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.89;
  letter-spacing: normal;
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
  margin: 6px 0 5px;
  font-family: Roboto;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;
}
.operator-name {
  font-family: Roboto;
  font-size: 14px;
  height: 19px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #86929d;
}
.card-header {
  display: inline-block;
}
.slot-number {
  width: 38px;
  height: 16px;
  margin: 0 30px 1px 0px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: right;
  color: #3e495c;
  float: right;
}
.time-comp {
  margin: 18px 0 19px;
}
.title {
  height: 32px;
  margin: 0px 0px 12px 0;
  font-family: Roboto;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;
}
</style>
