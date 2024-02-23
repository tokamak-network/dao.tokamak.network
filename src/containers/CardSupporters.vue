<template>
  <div class="card-vote">
    <card-container :title="'List of Top 100 Stakers'">
      <template #body>
        <div v-if="!votersWithBalance || votersWithBalance.length === 0" class="label">
          No one voted yet
        </div>
        <div v-else>
          <supporters-table class="supporters-table" />
        </div>
      </template>
    </card-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Card from '@/components/Card.vue';
import Table from '@/components/Table.vue';

export default {
  components: {
    'card-container': Card,
    'supporters-table': Table,
  },
  computed: {
    ...mapGetters([
      'votersWithBalance',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.supporters-table {
  padding-top: 8px;
  padding-bottom: 8px;
}

.label {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 180px;

  font-family: Roboto;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.3;
  letter-spacing: normal;
  text-align: center;
  color: #3e495c;
}
</style>
