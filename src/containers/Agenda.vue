<template>
  <div class="card-agenda-info">
    <div class="button">
      <button-step :type="'prev'" :name="'BACK TO ALL AGENDAS'" class="back" @on-clicked="back" />
      <div>
        <button-step :type="'prev'" :name="'PREVIOUS AGENDA'" class="prev" @on-clicked="prev" />
        <button-step :type="'next'" :name="'NEXT AGENDA'" class="next" @on-clicked="next" />
      </div>
    </div>
    <div class="content">
      <div class="content-sub-container">
        <div :class="{
          'agenda-typeA': agendaType(agendaId) === 'A',
          'agenda-typeB': agendaType(agendaId) === 'B',
        }"
        >
          #{{ $route.params.id }}
        </div>
        <div class="agenda-label">Type</div>
        <div :class="{
          'agenda-typeA': agendaType(agendaId) === 'A',
          'agenda-typeB': agendaType(agendaId) === 'B',
        }"
        >
          {{ agendaType(agendaId) }}
        </div>
        <div class="content-sub-date">
          is Posted {{ creationTime.tCreationDate | date3 }}
        </div>
        <img v-if="agendaType(agendaId) === 'A'"
             src="@/assets/poll-time-active-icon.svg" alt=""
             width="14" height="14"
        >
        <img v-else
             src="@/assets/poll-time-active-icon-typeB.svg" alt=""
             width="14" height="14"
        >
        <span class="content-sub-spare-time"> {{ creationTime | votingTime }}</span>
      </div>
      <div class="title">{{ title }} - {{ creationTime.tCreationDate | date1 }}</div>
      <div class="selector">
        <div :class="{ 'selected': currentSelector === 0,
                       'selected-typeB': agendaType(agendaId) === 'B' && currentSelector == 0 }"
             @click="currentSelector = 0"
        >
          Info
        </div>
        <div :class="{ 'selected': currentSelector === 1,
                       'selected-typeB': agendaType(agendaId) === 'B' && currentSelector == 1 }"
             @click="currentSelector = 1"
        >
          Description
        </div>
        <div :class="{ 'selected': currentSelector === 2,
                       'selected-typeB': agendaType(agendaId) === 'B' && currentSelector === 2 }"
             @click="currentSelector = 2"
        >
          On-Chain Effects
        </div>
        <div :class="{ 'selected': currentSelector === 3,
                       'selected-typeB': agendaType(agendaId) === 'B' && currentSelector === 3 }"
             @click="currentSelector = 3"
        >
          Comments ({{ voted }})
        </div>

        <span class="space" />
        <button v-if="account && checkStatus"
                class="update-btn"
                @click="endAgenda()"
        >
          End Agenda
        </button>
      </div>
      <div class="divider" />
      <agenda-info v-if="currentSelector === 0" />
      <agenda-description v-else-if="currentSelector === 1" />
      <agenda-info-vote v-else-if="currentSelector === 2" />
      <agenda-vote v-else-if="currentSelector === 3" />
    </div>
  </div>
</template>

<script>
import ButtonStep from '@/components/ButtonStep.vue';
import AgendaComments from '@/containers/AgendaComments.vue';
import AgendaInfo from '@/containers/AgendaInfo.vue';
import AgendaOnChain from '@/containers/AgendaOnChain.vue';
import AgendaDescription from '@/containers/AgendaDescription.vue';
import { mapState, mapGetters } from 'vuex';
import { getContractABIFromAddress, getContract } from '@/utils/contracts';
// import moment from 'moment';

export default {
  components: {
    'button-step': ButtonStep,
    'agenda-info': AgendaInfo,
    'agenda-info-vote': AgendaOnChain,
    'agenda-vote': AgendaComments,
    'agenda-description': AgendaDescription,
  },
  data () {
    return {
      agendaId: -1,
      currentSelector: 0,
    };
  },
  computed: {
    ...mapState([
      'web3',
      'agendas',
      'account',
    ]),
    ...mapGetters([
      'getAgendaByID',
      'getVotedListByID',
      'agendaOnChainEffects',
      'agendaType',
    ]),
    checkStatus () {
      const agenda = this.getAgendaByID(this.agendaId);
      const date = new Date();
      if (agenda.status === 2 && agenda.tVotingEndTime * 1000 < date.getTime()) return true;
      else return false;
    },
    target () {
      const onChainEffects = this.agendaOnChainEffects(this.agendaId);
      if (!onChainEffects || onChainEffects.length === 0) return '';

      return onChainEffects[0].target;
    },
    title () {
      const abi = getContractABIFromAddress(this.target);
      if (!abi || abi.length === 0) return '';
      return abi[0].title;
    },
    voted () {
      return this.getVotedListByID(this.agendaId).length;
    },
    creationTime () {
      return this.getAgendaByID(this.agendaId);
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
  methods: {
    async endAgenda () {
      const DAOCommitteeProxy = getContract('DAOCommitteeProxy', this.web3);
      await DAOCommitteeProxy.methods.endAgendaVoting(Number(this.agendaId)).send({
        from: this.account,
      }).on('transactionHash', (hash) => {
        this.$store.commit('SET_PENDING_TX', hash);
      })
        .on('confirmation', async (confirmationNumber) => {
          if (this.confirmBlock === confirmationNumber) {
            this.$store.commit('SET_PENDING_TX', '');
            await this.$store.dispatch('launch');
            await this.$store.dispatch('connectEthereum', this.web3);
          }
        })
        .on('receipt', () => {
        })
        .on('error', () => {
          this.$store.commit('SET_PENDING_TX', '');
        });
    },
    back () {
      this.$router.push({
        path: '/agenda',
      });
    },
    prev () {
      let index = Number(this.agendaId) + 1;
      if (index === this.agendas.length ? index = this.agendas.length : this.$router.push({ path: `/agenda/${index}` }));
    },
    next () {
      let index = Number(this.agendaId) - 1 ;
      if (index === -1 ? index = 0 : this.$router.push({ path: `/agenda/${index}` }));
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(96, 97, 112, 0.16);
  background-color: #ffffff;

  padding: 30px;

  margin-top: 12px;
}
.date {
  font-family: Roboto;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;
}
.title {
  font-family: Roboto;
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.3;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;

  margin-top: 8px;
  margin-bottom: 30px;
}
.selector {
  display: flex;
}
.selector .selected {
  color: #2a72e5;
  font-weight: 500;
}
.selector .selected-typeB {
  color: #ff7800;
}
.selector > div {
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #86929d;
}
.selector > div:hover {
  cursor: pointer;
}
.selector > div:nth-child(2) {
  margin-left: 35px;
  margin-right: 35px;
}
.selector > div:nth-child(3) {
  margin-right: 35px;
}
.divider {
  width: 100%;
  height: 1px;
  background-color: #dfe4ee;

  margin-top: 10px;
  margin-bottom: 25px;
}

.space {
  flex: 1;
}

.content-sub-container {
  display: flex;
  align-items: center;

  .agenda-label {
    font-family: Roboto;
    font-size: 10px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.6;
    letter-spacing: normal;
    text-align: left;

    white-space: pre-wrap;
  }
  .agenda-typeA {
    font-family: Roboto;
    font-size: 10px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.6;
    letter-spacing: normal;
    text-align: left;
    color: #2a72e5;

    white-space: pre-wrap;

    margin-right: 2px;
  }

  .agenda-typeB {
    font-family: Roboto;
    font-size: 10px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.6;
    letter-spacing: normal;
    text-align: left;
    color: #ff7800;

    white-space: pre-wrap;

    margin-right: 2px;
  }

  .content-sub-date {
    font-family: Roboto;
    font-size: 10px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.6;
    letter-spacing: normal;
    text-align: left;
    color: #3e495c;

    flex: 1;
  }

  .content-sub-spare-time {
    font-family: Roboto;
    font-size: 10px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.6;
    letter-spacing: normal;
    text-align: left;
    color: #86929d;

    margin-left: 7px;
  }
}

.timeline {
  display: flex;

  .agenda-label {
    font-family: Roboto;
    font-size: 10px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.6;
    letter-spacing: normal;
    text-align: left;

    white-space: pre-wrap;
  }

  .agenda-type {
    font-family: Roboto;
    font-size: 10px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.6;
    letter-spacing: normal;
    text-align: left;
    color: var(--slate);

    white-space: pre-wrap;
  }
}
.timeline > div:nth-child(3) {
  flex: 1;

  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.timeline > div:nth-child(3) > img {
  margin-right: 7px;
}
.timeline > div:nth-child(3) > span {
  font-family: Roboto;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #86929d;

  white-space: pre-wrap;
}
.timeline > div:nth-child(2) > .black {
  color: #3e495c;
}
.timeline > div:nth-child(2) > .blue {
  color: #2a72e5;
}

.button {
  display: flex;
  justify-content: space-between;
}
.button > div {
  display: flex;
}
.button .back {
  width: 173px;
}
.button .prev {
  width: 157px;
}
.button .next {
  width: 134px;
}
.update-btn {
  outline: none;

  width: 102px;
  height: 25px;

  border-radius: 4px;
  border: solid 1px #257eee;

  background: #ffffff;

  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: #2a72e5;

  &:hover {
    border-radius: 4px;
    background-color: #257eee;

    color: #ffffff;
    cursor: pointer;
  }
}

.update-btn-disabled {
  border: solid 1px #dfe4ee;
  background-color: #ffffff;

  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #86929d;

  &:hover {
    border: solid 1px #dfe4ee;
    background-color: #ffffff;

    color: #86929d;
  }
}
</style>
