<template>
  <div class="card-vote">
    <card-container :title="'Supporters'">
      <template #body>
        <supporters-table class="supporters-table" />
      </template>
    </card-container>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import Table from '@/components/Table.vue';

export default {
  components: {
    'card-container': Card,
    'supporters-table': Table,
  },
};
</script>

<style lang="scss" scoped>
.supporters-table {
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
