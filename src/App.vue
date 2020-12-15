<template>
  <div id="app">
    <header-container v-if="$route.path === '/'" />
    <sub-header-container v-else />
    <router-view></router-view>
    <footer-container v-if="$route.path === '/'" />
    <sub-footer-container v-else />
  </div>
</template>

<script>
import Header from '@/containers/Header.vue';
import Footer from '@/containers/Footer.vue';
import SubHeader from '@/containers/SubHeader.vue';
import SubFooter from '@/containers/SubFooter.vue';

export default {
  name: 'App',
  components: {
    'header-container': Header,
    'footer-container': Footer,
    'sub-header-container': SubHeader,
    'sub-footer-container': SubFooter,
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
