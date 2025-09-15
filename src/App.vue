<template>
  <div id="app">
    <alert />

    <!-- Community Banner -->
    <div class="community-banner">
      <div class="banner-content">
        <span class="banner-text">Let's go to the Community version!</span>
        <a 
          href="https://community.dao.tokamak.network" 
          target="_blank" 
          rel="noopener noreferrer"
          class="banner-link"
        >
          Go to Community version →
        </a>
      </div>
    </div>

    <!-- <mobile-tokamak-gnb v-if="$mq === 'mobile'" />
    <tokamak-gnb v-else /> -->
    <mobile-header-container v-if="$mq === 'mobile'" />
    <header-container v-else />
    <router-view />
    <mobile-footer-container
      v-if="$mq === 'mobile'"
      style="padding-top: 60px; padding-bottom: 60px;"
    />
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
// import TokamakGNB from '@/containers/TokamakGNB.vue';
// import MobileTokamakGNB from '@/containers/MobileTokamakGNB.vue';
export default {
  name: 'App',
  components: {
    alert: Alert,
    'header-container': Header,
    'footer-container': Footer,
    'mobile-header-container': MobileHeader,
    'mobile-footer-container': MobileFooter,
    // 'tokamak-gnb': TokamakGNB,
    // 'mobile-tokamak-gnb': MobileTokamakGNB,
  },
  data () {
    return {
      polling: null,
    };
  },
  computed: {
    ...mapState(['account', 'web3']),
  },
  created () {
    this.$store.dispatch('candidateLaunch');
    this.$store.dispatch('agendaLaunch');
    // this.poll();
  },
  methods: {
    poll () {
      this.polling = setInterval(() => {
        if (this.account) {
          this.$store.dispatch('candidateLaunch');
          this.$store.dispatch('agendaLaunch');
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
*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin: 0 !important;
}

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

/* Community Banner Styles */
.community-banner {
  background: linear-gradient(135deg, #2a72e5 0%, #0062c2 100%);
  color: white;
  padding: 12px 20px;
  text-align: center;
  position: relative;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.banner-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.banner-text {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: white;
}

.banner-link {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.banner-link:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Mobile responsive */
@media (max-width: 768px) {
  .community-banner {
    padding: 10px 16px;
  }
  
  .banner-content {
    flex-direction: column;
    gap: 8px;
  }
  
  .banner-text {
    font-size: 14px;
  }
  
  .banner-link {
    font-size: 13px;
    padding: 6px 12px;
  }
}
</style>
