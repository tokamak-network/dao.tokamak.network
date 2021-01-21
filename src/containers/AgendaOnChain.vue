<template>
  <div>
    {{ onChainEffects(agendaId) }}
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
      'onChainEffects',
    ]),
  },
  async created () {
    this.agendaId = this.$route.params.id;
  },
};
</script>

<style scoped>

</style>
