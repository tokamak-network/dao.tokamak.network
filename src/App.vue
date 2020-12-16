<template>
  <div id="app">
    <header-container />
    <dropdown :items="['Abstain', 'Yes', 'No']" :hint="'Your choice'" style="margin-left: 60px;" @on-selected="select" />
    <router-view></router-view>
    <footer-container />
  </div>
</template>

<script>
import Header from '@/containers/Header.vue';
import Footer from '@/containers/Footer.vue';
import Dropdown from '@/components/Dropdown.vue';

export default {
  name: 'App',
  components: {
    'header-container': Header,
    'footer-container': Footer,
    'dropdown': Dropdown,
  },
  methods: {
    select (item) {
      alert(item);
    },
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
