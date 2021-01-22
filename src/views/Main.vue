<template>
  <div class="main"
       :style="[events.length > 0 ? { 'margin-top': '-84px' } : {}]"
  >
    <div class="main-logo">
      <div v-if="events.length > 0"
           class="main-btn"
           @click="$router.push({ path: 'agenda' })"
      >
        <div class="count">{{ events.length }}</div>
        <span>Committee activities</span>
        <img src="@/assets/arrow-next-main.png" alt=""
             width="4" height="8"
        >
      </div>
    </div>
    <div v-if="events.length > 0"
         class="recent-committee-activities"
    >
      <div class="header">Recent Committee Activities</div>
      <div v-for="event in events" :key="event.data.transactionHash" class="content">
        <div>
          Tx
        </div>
        <div class="tx-hash" @click="newtab(event.transactionHash)">
          {{ event.transactionHash | hexSlicer }}
        </div>
        <div class="event">
          ETH-B Debt Ceiling Instant Access Module - December 7, 2020
        </div>
        <div>
          {{ event.blockTimestamp | fromNow }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getEvents } from '@/api';

export default {
  data () {
    return {
      events: [],
    };
  },
  async created () {
    this.events = await getEvents('AgendaVoteCasted,AgendaExecuted,AgendaCreated');
  },
  methods: {
    newtab (txhash) {
      window.open(`https://etherscan.io/tx/${txhash}`, '_blank'); // eslint-disable-line
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  /* All views must have this attribute.*/
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: #0062c2;
}

.main-logo {
  width: 840px;
  height: 607px;

  background: url('../assets/logo-main.png') no-repeat;
  /* background-size: 840px; */
  background-size: contain;
  background-repeat: no-repeat;

  position: relative;
}

.main-btn {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 200px;
  height: 38px;
  border-radius: 25px;
  box-shadow: 0 0 10px 0 rgba(215, 222, 227, 0.4);
  background-color: #f6f8f9;

  position: absolute;
  bottom: 92px;

  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
.main-btn:hover {
  cursor: pointer;
}

.count {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #2a72e5;

  font-family: Roboto;
  font-size: 13px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;

  margin-left: 9px;
  margin-right: 12px;
}

.main-btn span {
  flex: 1;

  font-family: Roboto;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #354052;
}

.main-btn img {
  margin-right: 15px;
}

.recent-committee-activities {
}

.recent-committee-activities > .header {
  display: flex;
  justify-content: center;
  align-content: center;

  font-family: Roboto;
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: 0.96px;
  text-align: center;
  color: #ffffff;

  padding-bottom: 30px;

  border-bottom: dotted 1px #256dc7;
}
.recent-committee-activities > .content {
  display: flex;
  justify-content: content;
  align-items: center;

  padding-top: 18px;
  padding-bottom: 18px;

  border-bottom: dotted 1px #256dc7;

  > div {
    &:nth-child(1) {
      font-family: Roboto;
      font-size: 15px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: 0.6px;
      color: #ffffff;
    }
    &:nth-child(2) {
      text-decoration: underline;

      font-family: Roboto;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: 0.56px;
      color: #8fc7fd;

      margin-left: 30px;
      margin-right: 35px;

      &:hover {
        cursor: pointer;
      }
    }
    &:nth-child(3) {
      font-family: Roboto;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: 0.56px;
      text-align: left;
      color: #ffffff;

      margin-right: 64px;
    }
    &:nth-child(4) {
      font-family: Roboto;
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: normal;
      text-align: right;
      color: #8fc7fd;
    }
  }

  .tx-hash {
    width: 90px;
  }

  .event {
    flex: 1;
  }
}
</style>
