<template>
  <div class="main">
    <connect-wallet />
  </div>
</template>

<script>
import Connect from '@/components/Connect.vue';

export default {
  components: {
    'connect-wallet': Connect,
  },
};
</script>

<style scoped>
</style>
