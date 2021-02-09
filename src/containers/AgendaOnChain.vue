<template>
  <div class="agenda-on-chain">
    <span>For the spell at address </span>
    <span class="target" @click="toEtherscan">{{ target }}</span><br /><br />
    <div>{{ explanation }} </div><br />
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
      <div v-for="(input, index) in inputs" v-else :key="input.name" class="name">
        <span>{{ input.name }}: </span><span>{{ Object.values(values)[index] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getContractABIFromAddress } from '@/utils/contracts';
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
      'agendaOnChainEffects',
      'agendaCreator',
    ]),
    target () {
      const onChainEffects = this.agendaOnChainEffects(this.agendaId);
      if (!onChainEffects || onChainEffects.length === 0) return '';

      return onChainEffects[0].target;
    },
    explanation () {
      if (this.onChainEffects.length === 3) {
        return '**need explanation for setSeigRates agenda**';
      }
      const abi = getContractABIFromAddress(this.target);
      if (!abi || abi.length === 0) return '';

      return abi[0].explanation;
    },
    inputs () {
      const abi = getContractABIFromAddress(this.target);
      if (!abi || abi.length === 0) return [];

      return abi[0].inputs;
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

}
</style>
