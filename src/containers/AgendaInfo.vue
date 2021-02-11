<template>
  <div class="agenda-info">
    <info-committee :title="'Agenda Creator'" :content="getAgendaByID(agendaId).creator" :type="'address'" />
    <info-committee :title="'Agenda Creation Time'" :content="getAgendaByID(agendaId).tCreationDate" :type="'time'" style="margin-top: 12px;" />
    <info-committee :title="'Notice End Time'" :content="getAgendaByID(agendaId).tNoticeEndTime" :type="'time'" style="margin-top: 12px;" />
    <info-committee :title="'Voting Start Time'" :content="checkVotingTime('tVotingStartTime')" :type="'time'" style="margin-top: 12px;" />
    <info-committee :title="'Voting End Time'" :content="checkVotingTime('tVotingEndTime')" :type="'time'" style="margin-top: 12px;" />
    <info-committee :title="'Agenda Status'" :content="checkStatusCode" :type="'description'" style="margin-top: 12px;" />
    <info-committee :title="'Agenda Result'" :content="checkResultCode" :type="'description'" style="margin-top: 12px;" />
    <info-committee :title="'Executed Time'" :content="checkVotingTime('tExecTime')" :type="'time'" style="margin-top: 12px;" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import InfoCommittee from '@/components/InfoCommittee.vue';

export default {
  components: {
    'info-committee': InfoCommittee,
  },
  data () {
    return {
      agendaId: -1,
      edit: false,
      desc: '',
      statusCode: ['', 'Notice', 'Voting', 'Waiting Execute', 'Executed', 'Ended'],
      resultCode: ['Pending', 'Accepted', 'Reject', 'Dismiss'],
    };
  },
  computed: {
    ...mapState([
      'account',
      'web3',
    ]),
    ...mapGetters([
      'getAgendaByID',
      'agendaContents',
    ]),
    checkStatusCode () {
      return this.statusCode[this.getAgendaByID(this.agendaId).status];
    },
    checkResultCode () {
      return this.resultCode[this.getAgendaByID(this.agendaId).result];
    },
    checkVotingTime () {
      return (time) => {
        if (this.getAgendaByID(this.agendaId)[time] === 0) {
          if (time === 'tVotingStartTime' || time === 'tVotingEndTime') {
            return 'Not Started Yet';
          } else {
            return 'Not Executed Yet';
          }
        } else {
          return this.getAgendaByID(this.agendaId)[time];
        }
      };
    },
  },
  watch: {
    '$route.params.id': {
      handler: async function () {
        this.agendaId = this.$route.params.id;
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.agenda-info {
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
}
.agenda-info > div:first-child > div:nth-child(2) {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #dfe4ee;

  margin-top: 10px;
  margin-bottom: 25px;
}
.resource {
  width: 100%;

  /* display: flex; */
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;

  white-space: pre-wrap;
}
.resource > div:first-child {
  /* width: 100%; */
  font-size: 16px;
  margin-bottom: 5px;
}
.resource > div:nth-child(2) {
  flex: 1;

  /* display: flex; */
  justify-content: flex-end;
  align-items: center;
}
.resource > div:nth-child(2) > img {
  margin-right: 7px;
}
.resource > div:nth-child(2) > span {
  color: #86929d;

  white-space: pre-wrap;
}
.resource > div:nth-child(2) > .black {
  color: #3e495c;
}
.resource > div:nth-child(2) > span > .blue {
  color: #2a72e5;
}
.button {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

textarea {
    width: 100%;

    border: solid 1px #dfe4ee;
    border-radius: 4px;

    outline: none;

    padding: 8px 16px;

    font-family: Roboto;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: 0.22px;
    color: #3e495c;

    resize: none;

    &::placeholder {
      color: #86929d;
    }

    &:hover {
      border: 1px solid #c9d1d8;
    }

    &:focus {
      border: 1px solid #2a72e5;
    }
  }
.edit > div:nth-child(2) {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.left {
  margin-right: 15px;
}
</style>
