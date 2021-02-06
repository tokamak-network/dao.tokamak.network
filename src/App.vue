<template>
  <div id="app">
    <mobile-header-container v-if="$mq === 'mobile'" />
    <header-container v-else />
    <router-view />
    <mobile-footer-container v-if="$mq === 'mobile'" />
    <footer-container v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/containers/Header.vue';
import Footer from '@/containers/Footer.vue';
import MobileHeader from '@/containers/MobileHeader.vue';
import MobileFooter from '@/containers/MobileFooter.vue';

export default {
  name: 'App',
  components: {
    'header-container': Header,
    'footer-container': Footer,
    'mobile-header-container': MobileHeader,
    'mobile-footer-container': MobileFooter,
  },
  data () {
    return {
      polling: null,
    };
  },
  computed: {
    ...mapState([
      'account',
      'web3',
    ]),
  },
  created () {
    this.$store.dispatch('launch');
    // this.poll();
  },
  methods: {
    poll () {
      this.polling = setInterval(() => {
        if (this.account) {
          this.$store.dispatch('launch');
          this.$store.dispatch('connectEthereum', this.web3);
        }
      }, 60000); // 1m
    },
  },
};
</script>

<style>
/* https://stackoverflow.com/questions/16907518/css-input-with-width-100-goes-outside-parents-bound */
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}

body { margin: 0 !important; }

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
