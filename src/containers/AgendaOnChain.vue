<template>
  <div>
    {{ agendaCreator(agendaId) }}
    {{ agendaOnChainEffects(agendaId) }}
  </div>
</template>

<script>
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

<style scoped>

</style>
