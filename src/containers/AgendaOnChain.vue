<template>
  <div class="agenda-on-chain">
    <span>For the spell at address </span>
    <span class="target" @click="toEtherscan">{{ target }}</span><br /><br />
    <div class="explanation">{{ agendaExplanation(agendaId, type) }} </div><br />
    <div>
      <!-- for setSeigRates -->
      <div v-if="onChainEffects.length === 3">
        <div style="margin-bottom: 6px;">
          <span>powerTONSeigRate_: </span><span>{{ onChainEffects[0].values[0] }}</span><br />
        </div>
        <div style="margin-bottom: 6px;">
          <span>daoSeigRate_: </span><span>{{ onChainEffects[1].values[0] }}</span><br />
        </div>
        <div>
          <span>pseigRate_: </span><span>{{ onChainEffects[2].values[0] }}</span><br />
        </div>
      </div>
      <div v-else-if="onChainEffects.length === 2 && onChainEffects[0].name === 'setPowerTONSeigRate'">
        <div style="margin-bottom: 6px;">
          <span>powerTONSeigRate_: </span><span>{{ onChainEffects[0].values[0] }}</span><br />
        </div>
        <div style="margin-bottom: 6px;">
          <span>powerton: </span><span>{{ onChainEffects[1].values[0] }}</span><br />
        </div>
      </div>
      <div v-for="(input, index) in agendaInputs(agendaId, type)" v-else :key="input.name" class="name">
        <span>{{ input.name }}: </span><span>{{ Object.values(values)[index] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  data () {
    return {
      agendaId: -1,
    };
  },
  computed: {
    ...mapState([
      'etherscanAddress',
    ]),
    ...mapGetters([
      'getAgendaByID',
      'agendaOnChainEffects',
      'agendaCreator',
      'agendaExplanation',
      'agendaInputs',
    ]),
    type () {
      const agenda = this.getAgendaByID(this.agendaId);
      if (!agenda) {
        return '';
      }
      return agenda.type;
    },
    target () {
      const onChainEffects = this.agendaOnChainEffects(this.agendaId);
      if (!onChainEffects || onChainEffects.length === 0) return '';

      return onChainEffects[0].target;
    },
    values () {
      const onChainEffects = this.agendaOnChainEffects(this.agendaId);
      if (!onChainEffects || onChainEffects.length === 0) return {};

      return onChainEffects[0].values;
    },
    onChainEffects () {
      const onChainEffects = this.agendaOnChainEffects(this.agendaId);
      return onChainEffects;
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
    toEtherscan () {
      window.open(this.etherscanAddress + '/address/' + this.target, '_blank'); // eslint-disable-line
    },
  },
};
</script>

<style lang="scss" scoped>
.agenda-on-chain {
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;

  .target {
    color: #2a72e5;

    &:hover {
      cursor: pointer;
    }
  }

  .name {
    margin-right: 8px;
  }

  .explanation {
    white-space: pre-wrap;
  }
}
</style>
