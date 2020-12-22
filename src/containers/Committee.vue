<template>
  <div class="committee">
    <div class="title">Elected Operator</div>
    <div class="slot-info">
      3 SLOT - POSTED DEC 7, 2020, 16:00 UTC
    </div>
    <div v-for="operator in electedOperators" :key="operator.index" class="committee-card">
      <card-committee>
        <template #committee-body>
          <div>
            <card-header
              :status="operator.header.status"
              :elected="operator.header.elected"
              :votes="operator.header.voted"
              class="card-header"
            />
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
        </template>
      </card-committee>
    </div>
  </div>
</template>

<script>
import CardCommittee from '@/components/CardCommittee.vue';
import CardHeader from '@/components/CardHeader.vue';
import Time from '@/components/Time.vue';
import Button from '@/components/Button.vue';

import moment from 'moment';
import dummy from '../../dummy-committee.json';

export default {
  components:{
    'card-committee': CardCommittee,
    'card-header': CardHeader,
    'time-comp': Time,
    'button-comp': Button,
  },
  data () {
    return {
      electedOperators: [],
      endedShow: false,
      login: true,
      monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    };
  },
  created (){
    this.cards ();
  },
  methods: {
    cards () {
      return dummy.operators.map((operator) => {
        this.electedOperators.push(operator);
      });
    },
    shortAddress (account) {
      return `${account.slice(0, 7)}...`;
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
.committee {
  flex: 1;
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
  /* float:left; */
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
  /* display: inline-block; */
  float: right;
}
.slot-info {
  margin-bottom: 12px;
  width: 204px;
  height: 15px;
  font-family: Roboto;
  font-size: 11px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #86929d;
}
.time-comp {
  margin: 25px 0 26px;
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
