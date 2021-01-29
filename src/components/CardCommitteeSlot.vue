<template>
  <div class="card-committee-slot">
    <div class="info-committee">
      <span class="title">Status</span>
      <span> : </span>
      <span class="content">{{ occupied() ? 'Occupied' : 'Empty' }}</span>
      <span> | </span>

      <span class="title">Elected</span>
      <span> : </span>
      <span class="content"
            :class="{ 'link': occupied() }"
            @click="etherscan()"
      >
        {{ (occupied() ? members[slotnumber].layer2 : '-') | hexSlicer }}
      </span>
      <span> | </span>

      <span class="title"># of Votes</span>
      <span> : </span>
      <span class="content">{{ occupied() ? members[slotnumber].vote : '0' | WTON }} TON</span>

      <div class="info-slot">
        <span>Slot </span>
        <span class="slot">#{{ slotnumber }}</span>
      </div>
    </div>
    <div class="operator-name">{{ occupied() ? members[slotnumber].name : '-' }}</div>
    <div class="card-title">
      {{ occupied() ? desc : '-' }}
    </div>
    <div class="info-time">
      <img src="@/assets/poll-time-active-icon.svg" alt=""
           width="14" height="14"
      >
      <span>{{ occupied() ? fromNow(members[slotnumber].info.memberJoinedTime) : '-' }}</span>
    </div>
    <div class="button">
      <button-comp :name="'View Detail'"
                   :type="'primary'"
                   :status="occupied() ? '' : 'disabled'"
                   class="left"
                   :width="'118px'"
                   @on-clicked="detail()"
      />
      <button-comp v-if="login!==false"
                   :name="'Challenge'"
                   :type="'secondary'"
                   :width="'118px'"
                   class="right"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { getContract } from '@/utils/contracts';
import { hexSlicer } from '@/utils/helpers';

import { mapState } from 'vuex';
import Button from '@/components/Button.vue';

export default {
  components: {
    'button-comp': Button,
  },
  props: {
    slotnumber: {
      type: Number,
      default: 0,
    },
  },
  data () {
    return {
      login: true,
    };
  },
  computed: {
    ...mapState([
      'members',
    ]),
    deployedDate () {
      return (timestamp) => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const date = new Date(timestamp * 1000);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        return monthNames[parseInt(month)] + ' ' + day + ', ' + year;
      };
    },
    fromNow () {
      return (timestamp, suffix) => moment.unix(timestamp).fromNow(suffix);
    },
    desc () {
      return `${hexSlicer(this.members[this.slotnumber].candidateContract)} is elected to Committee member since ${this.deployedDate(this.members[this.slotnumber].info.memberJoinedTime)}`;
    },
    shortAddress () {
      return account => `${account.slice(0, 7)}...`;
    },
    href () {
      return address => 'https://etherscan.io/address/' + address;
    },
  },
  methods: {
    occupied () {
      return this.members[this.slotnumber];
    },
    etherscan (address) {
      address ?
        window.open('https://etherscan.io/address/' + address, '_blank') : // eslint-disable-line
        window.open('https://etherscan.io/address/' + this.members[this.slotnumber].operator, '_blank');  // eslint-disable-line
    },
    detail () {
      if (this.occupied()) {
        this.$router.push({
          path: `/election/${this.members[this.slotnumber].candidateContract}`,
        });
      }
    },
  },
};
</script>

<style scoped>
.card-committee-slot {
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(96, 97, 112, 0.16);
  background-color: #ffffff;

  padding: 25px 30px;

  margin-bottom: 20px;
}
.info-committee {
  display: flex;
}
.info-committee > span {
  font-family: Roboto;
  font-size: 9px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #cfd7db;

  white-space: pre-wrap;
}
.info-committee > .title {
  color: #2a72e5;
}
.info-committee > .content {
  color: #3e495c;
}
.info-committee > .link {
  text-decoration: underline;
  cursor: pointer;
}

.info-slot {
  flex: 1;

  display: flex;
  justify-content: flex-end;
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

.info-time {
  display: flex;
  align-items: center;

  margin-top: 24px;
  margin-bottom: 24px;
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

.operator-name {
  font-family: Roboto;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;

  margin-top: 6px;
  margin-bottom: 6px;
}

.card-title {
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #86929d;
}

.card-committee-slot > .button {
  display: flex;
  justify-content: space-between;
}
.card-committee-slot > .button > .left {
  width: 110px;
}
.card-committee-slot > .button > .right {
  width: 110px;
}
</style>
