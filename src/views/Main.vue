<template>
  <div class="main"
       :style="[events.length > 0 && $mq !== 'mobile' ? { 'margin-top': '-84px' } : {}]"
  >
    <div class="main-top">
      <div v-if="$mq === 'mobile'"
           class="main-logo-mobile"
      >
        <div v-if="events.length > 0"
             class="main-btn-mobile"
        >
          <div class="count">{{ events.length }}</div>
          <span class="label">Committee activities</span>
        </div>
      </div>
      <div v-else>
        <img class-="main-interaction"
             style="height: 600px"
             src="@/assets/main-interaction.gif"
        >
        <div v-if="events.length > 0"
             class="main-btn"
        >
          <div class="count">{{ events.length }}</div>
          <span class="label">Committee activities</span>
        </div>
      </div>
    </div>
    <div v-if="events.length > 0 && $mq !== 'mobile'"
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
          {{ explanation(event) }}
        </div>
        <div>
          {{ event.blockTimestamp | fromNow }}
        </div>
      </div>
    </div>

    <div v-if="events.length > 0 && $mq === 'mobile'"
         class="recent-committee-activities-mobile"
    >
      <div class="header">Recent Committee Activities</div>
      <div v-for="event in events" :key="event.data.transactionHash" class="content">
        <div class="content-container">
          <div class="tx-label">
            Tx
          </div>
          <div class="tx-hash" @click="newtab(event.transactionHash)">
            {{ event.transactionHash | hexSlicer }}
          </div>
          <div class="time">
            {{ event.blockTimestamp | fromNow }}
          </div>
        </div>
        <div class="event">
          {{ explanation(event) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getRecentEvents } from '@/api';

export default {
  data () {
    return {
      events: [],
    };
  },
  computed: {
    ...mapState([
      'etherscanAddress',
    ]),
  },
  async created () {
    this.events = await getRecentEvents();
  },
  methods: {
    newtab (txhash) {
      window.open(`${this.etherscanAddress}/tx/${txhash}`, '_blank'); // eslint-disable-line
    },
    explanation (event) {
      const eventName = event.eventName;

      if (eventName === 'AgendaCreated') return `Agenda #${event.data.id} Created`;
      else if (eventName === 'AgendaExecuted') return `Agenda #${event.data.id} Executed`;
      else if (eventName === 'AgendaVoteCasted') return `Agenda #${event.data.id} is Voted ${this.agendaVoted(event.data.voting)}`;
      else if (eventName === 'CandidateContractCreated') return 'New Committee Candidate Created';
      else if (eventName === 'ChangedMember') return 'Committee Member Changed';
      else if (eventName === 'ChangedSlotMaximum') return `Committee Member Slot Maximum adjusted to ${event.data.slotMax}`;
      else if (eventName === 'ClaimedActivityReward') return `Activity Reward is Given to ${event.data.candidate}`;
      else if (eventName === 'OperatorRegistered') return `Operator ${event.data.candidateContract} Registered`; // TODO: OperatorRegistered -> Layer2Registered
      else if (eventName === 'AgendaStatusChanged') return `Agenda #${event.data.agendaID} Status Changed to ${this.agendaStatus(event.data.newStatus)}`;
      else if (eventName === 'AgendaResultChanged') return `Agenda #${event.data.agendaID} Result Changed to ${this.agendaResult(event.data.result)}`;
      else {
        return '-';
        console.log('bug', 'events'); // eslint-disable-line
      }
    },
    agendaStatus (status) {
      status = parseInt(status);

      if (status === 0) return '"NONE"';
      else if (status === 1) return '"NOTICE"';
      else if (status === 2) return '"VOTING"';
      else if (status === 3) return '"WAITING"';
      else if (status === 4) return '"EXECUTED"';
      else if (status === 5) return '"ENDED"';
      else {
        console.log('bug', 'agenda status'); // eslint-disable-line
        return '""';
      }
    },
    agendaResult (result) {
      result = parseInt(result);

      if (result === 0) return '"PENDING"';
      else if (result === 1) return '"ACCEPT"';
      else if (result === 2) return '"REJECT"';
      else if (result === 3) return '"DISMISS"';
      else {
        console.log('bug', 'agenda result'); // eslint-disable-line
        return '""';
      }
    },
    agendaVoted (voted) {
      voted = parseInt(voted);

      if (voted === 0) return '"ABSTAIN"';
      else if (voted === 1) return '"YES"';
      else if (voted === 2) return '"NO"';
      else {
        console.log('bug', 'agenda voted'); // eslint-disable-line
        return '""';
      }
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

  position: relative;
}

.main-top {
  display: flex;
}

.main-logo-mobile {
  width: 350px;
  height: 253px;

  background: url('../assets/logo-main.png') no-repeat;
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
  top: 488px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;

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

    margin-left: 16px;
    margin-right: 12px;
  }

  .label {
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

  .arrow {
    margin-right: 15px;
  }
}

.main-btn-mobile {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 200px;
  height: 38px;
  border-radius: 25px;
  box-shadow: 0 0 10px 0 rgba(215, 222, 227, 0.4);
  background-color: #f6f8f9;
  position: absolute;
  top: 300px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;

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

    margin-left: 16px;
    margin-right: 12px;
  }

  .label {
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

  .arrow {
    margin-right: 15px;
  }
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
    min-width: 480px;
    max-width: 480px;
    flex: 1;
  }
}

.recent-committee-activities-mobile {
  min-width: 100%;
  max-width: 100%;

  .header {
    font-family: Roboto;
    font-size: 22px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.82;
    letter-spacing: 0.88px;
    text-align: center;
    color: #ffffff;

    margin-top: 163px;
    margin-bottom: 30px;
  }

  .content {
    min-height: 90px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    margin-left: 20px;
    margin-right: 20px;

    border-top: dotted 1px #256dc7;

    .content-container{
      display: flex;

      .tx-label {
        font-family: Roboto;
        font-size: 15px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: 0.6px;
        text-align: left;
        color: #ffffff;

        margin-right: 25px;
      }

      .tx-hash {
        font-family: Roboto;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.29;
        letter-spacing: 0.56px;
        text-align: left;
        color: #8fc7fd;

        flex: 1;

        &:hover {
          cursor: pointer;
        }
      }

      .time {
        font-family: Roboto;
        font-size: 10px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        text-align: right;
        color: #8fc7fd;
      }

    }
    .event {
      font-family: Roboto;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: 0.56px;
      text-align: left;
      color: #ffffff;

      margin-top: 19px;
    }
  }
}
#wrap {
  width: 100%;
  height: 1000px;
}
#canvas {
  width: 100%;
  height: 1080px;
}
</style>
