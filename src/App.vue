<template>
  <div id="app">
    <header-container />
    <router-view></router-view>
    <footer-container />
  </div>
</template>

<script>
import Header from '@/containers/Header.vue';
import Footer from '@/containers/Footer.vue';

export default {
  name: 'App',
  components: {
    'header-container': Header,
    'footer-container': Footer,
  },
};
</script>

<style scoped>
</style>
