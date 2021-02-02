<template>
  <div class="agenda-on-chain">
    <span>For the spell at address </span>
    <span class="target" @click="toEtherscan">{{ target }}</span><br /><br />
    <div>{{ explanation }} </div><br />
    <div>
      <div v-for="(input, index) in inputs" :key="input.name" class="name">
        <span>{{ input.name }}: </span><span>{{ Object.values(values)[index] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getContractABIFromAddress } from '@/utils/contracts';
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      agendaId: -1,
    };
  },
  computed: {
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
      window.open('https://rinkeby.etherscan.io/address/' + this.target, '_blank'); // eslint-disable-line
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
