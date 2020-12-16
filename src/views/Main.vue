<template>
  <div class="main">
    Tokamak network
    <text-input :tooltip="'hi'" />
    <text-input :status="'disabled'" />
  </div>
</template>

<script>
import TextInput from '@/components/TextInput.vue';

export default {
  components: {
    'text-input': TextInput,
  },
};
</script>

<style scoped>
.main {
  /* All views must have this attribute.*/
  flex: 1;
}
</style>
