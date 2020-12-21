<template>
  <div class="main">
    <text-input :type="'email'" :placeholder="'hihi@hihi'" />
    <text-input :type="'email'" :required="true" :placeholder="'hihi@hihi'" />
    <text-input :type="'email'" tooltip="'hi'" />
    <text-input :status="'disabled'" />
    <text-input :ton="true" />
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
