<template>
  <div id="app">
    <header-container />
    <router-view></router-view>
    <footer-container />
    <text-input />
  </div>
</template>

<script>
import Header from '@/containers/Header.vue';
import Footer from '@/containers/Footer.vue';
import TextInput from '@/components/TextInput.vue';

export default {
  name: 'App',
  components: {
    'text-input': TextInput,
    'header-container': Header,
    'footer-container': Footer,
  },
};
</script>

<style>
body { margin: 0 !important; }

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
