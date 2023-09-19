<template>
  <div
    class="main"
    :style="[
      events.length > 0 && $mq !== 'mobile' ? { 'margin-top': '-84px' } : {},
      {
        color: 'white',
        display: 'flex',
        justify: 'center',
        align: 'center',
        height: '100vh',
      },
    ]"
  >
    <div
      class="temp"
      :style="[
        {
          display: 'flex',
          flexDirection: 'column',
          justify: 'center',
          align: 'center',
          height: '100%',
          marginTop: '300px',
          marginLeft: '30%',
          marginRight: '30%',
        },
      ]"
    >
      <span :style="[{ marginBottom: '20px' }]">Notice for Service Interruption</span>
      <span>Tokamak Network's DAO service is currently undergoing maintenance. As
        part of this process, DAO contract is being paused to conduct safety
        checks. Consequently, DAO-related functions such as Election, Propose,
        and Committee may not be accessible until further notice.</span>
    </div>
  </div>
</template>

<script>
import { fromRay2, truncate, hexSlicer, date4 } from '@/utils/helpers';
import { getRecentEvents, getCandidates } from '@/api';
import { mapState, mapGetters } from 'vuex';
export default {
  data () {
    return {
      events: [],
      nameLoading: '-',
    };
  },
  computed: {
    ...mapState(['candidates', 'etherscanAddress']),
    ...mapGetters(['candidateName']),
    truncate () {
      return (amount) => truncate(amount);
    },
    hexSlicer () {
      return (address) => hexSlicer(address);
    },
    date4 () {
      return (timestamp) => date4(timestamp);
    },
  },
  async created () {
    const [candidates, events] = await Promise.all([
      getCandidates(),
      getRecentEvents(),
    ]);
    const filteredEvents = events.filter((event) => {
      const eventName = event.eventName;
      if (
        eventName === 'Deposited' ||
        eventName === 'WithdrawalRequested' ||
        eventName === 'WithdrawalProcessed' ||
        eventName === 'Comitted'
      ) {
        const found = candidates.find(
          (candidate) =>
            candidate.candidate.toLowerCase() ===
              event.data.layer2.toLowerCase() ||
            candidate.candidateContract.toLowerCase() ===
              event.data.layer2.toLowerCase(),
        );
        return found ? true : false;
      } else {
        return true;
      }
    });
    this.events = filteredEvents;
    this.loading();
  },
  methods: {
    loading () {
      let cnt = 1;
      const nameLoading = '-';
      const interval = setInterval(() => {
        if (!this.candidates || this.candidates.length === 0) {
          this.nameLoading = nameLoading.repeat(cnt);
          cnt++;
          if (cnt === 5) {
            cnt = 1;
          }
        } else {
          clearInterval(interval);
        }
      }, 1000); // 1s
    },
    newtab (txhash) {
      window.open(`${this.etherscanAddress}/tx/${txhash}`, "_blank"); // eslint-disable-line
    },
    explanation (event) {
      const eventName = event.eventName;
      if (eventName === 'AgendaCreated')
        return `Agenda #${event.data.id} Created`;
      else if (eventName === 'AgendaExecuted')
        return `Agenda #${event.data.id} Executed`;
      else if (eventName === 'AgendaVoteCasted')
        return `Agenda #${event.data.id} is Voted ${this.agendaVoted(
          event.data.voting,
        )}`;
      else if (eventName === 'CandidateContractCreated')
        return 'New Committee Candidate Created';
      else if (eventName === 'ChangedMember') return 'Committee Member Changed';
      else if (eventName === 'ChangedSlotMaximum')
        return `Committee Member Slot Maximum adjusted to ${event.data.slotMax}`;
      else if (eventName === 'ClaimedActivityReward')
        return `Activity Reward is Given to ${
          this.candidateName(event.data.candidate)
            ? this.candidateName(event.data.candidate)
            : this.nameLoading
        }`;
      else if (eventName === 'Layer2Registered')
        return `Candidate ${
          this.candidateName(event.data.candidateContract)
            ? this.candidateName(event.data.candidateContract)
            : this.nameLoading
        } Registered`;
      else if (eventName === 'AgendaStatusChanged')
        return `Agenda #${
          event.data.agendaID
        } Status Changed to ${this.agendaStatus(event.data.newStatus)}`;
      else if (eventName === 'AgendaResultChanged')
        return `Agenda #${
          event.data.agendaID
        } Result Changed to ${this.agendaResult(event.data.result)}`;
      else if (eventName === 'Deposited')
        return `${hexSlicer(event.data.depositor)} voted ${truncate(
          fromRay2(event.data.amount),
          2,
        )} TON to ${
          this.candidateName(event.data.layer2)
            ? this.candidateName(event.data.layer2)
            : this.nameLoading
        }`;
      else if (eventName === 'WithdrawalRequested')
        return `${hexSlicer(event.data.depositor)} unvoted ${truncate(
          fromRay2(event.data.amount),
          2,
        )} TON to ${
          this.candidateName(event.data.layer2)
            ? this.candidateName(event.data.layer2)
            : this.nameLoading
        }`;
      else if (eventName === 'WithdrawalProcessed')
        return `${truncate(
          fromRay2(event.data.amount),
          2,
        )} TON is withdrawn by ${hexSlicer(event.data.depositor)} from ${
          this.candidateName(event.data.layer2)
            ? this.candidateName(event.data.layer2)
            : this.nameLoading
        }`;
      else if (eventName === 'Comitted')
        return `${
          this.candidateName(event.data.layer2)
            ? this.candidateName(event.data.layer2)
            : this.nameLoading
        }'s rewards are updated by ${hexSlicer(event.txInfo.from)}`;
      else if (eventName === 'RoundStart')
        return `PowerTON round ${event.data.round} started ${date4(
          event.data.startTime,
        )} (ends ${date4(event.data.endTime)})`;
      else {
        return '-';
        console.log("bug", "events"); // eslint-disable-line
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
        console.log("bug", "agenda status"); // eslint-disable-line
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
        console.log("bug", "agenda result"); // eslint-disable-line
        return '""';
      }
    },
    agendaVoted (voted) {
      voted = parseInt(voted);
      if (voted === 0) return '"ABSTAIN"';
      else if (voted === 1) return '"YES"';
      else if (voted === 2) return '"NO"';
      else {
        console.log("bug", "agenda voted"); // eslint-disable-line
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
  background: url("../assets/logo-main.png") no-repeat;
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
}
.main-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
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
    .content-container {
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
