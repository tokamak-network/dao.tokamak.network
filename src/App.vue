<template>
  <div id="app">
    <alert />
    <tokamak-gnb />
    <mobile-header-container v-if="$mq === 'mobile'" />
    <header-container v-else />
    <router-view />
    <mobile-footer-container v-if="$mq === 'mobile'" style="padding-top: 60px; padding-bottom: 60px;" />
    <footer-container v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Alert from '@/containers/Alert.vue';
import Header from '@/containers/Header.vue';
import Footer from '@/containers/Footer.vue';
import MobileHeader from '@/containers/MobileHeader.vue';
import MobileFooter from '@/containers/MobileFooter.vue';
import TokamakGNB from '@/containers/TokamakGNB.vue';
export default {
  name: 'App',
  components: {
    'alert': Alert,
    'header-container': Header,
    'footer-container': Footer,
    'mobile-header-container': MobileHeader,
    'mobile-footer-container': MobileFooter,
    'tokamak-gnb': TokamakGNB,
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

  width: 100%;
  min-width: 320px;
  position: absolute;
  right: 0;
  left: 0;
}

.modal-open {
  height: 100vh;
  overflow-y: hidden;
}
</style>
