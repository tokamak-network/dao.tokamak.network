<template>
  <div id="app">
    <mobile-header-container v-if="$mq === 'mobile'" />
    <header-container v-else />
    <button-comp :name="'SHOW MODAL'" :type="'primary'" @on-clicked="show()" />
    <modal-comp v-if="showModal"
                :width="150"
                @on-closed="showModal=false"
    >
      <template #body>
        <!-- container -->
        <div>
          hi!
        </div>
      </template>
    </modal-comp>
    <router-view />
    <mobile-footer-container v-if="$mq === 'mobile'" />
    <footer-container v-else />
  </div>
</template>

<script>
import Header from '@/containers/Header.vue';
import Footer from '@/containers/Footer.vue';
import MobileHeader from '@/containers/MobileHeader.vue';
import MobileFooter from '@/containers/MobileFooter.vue';
import Button from '@/components/Button.vue';
import Modal from '@/components/Modal.vue';

export default {
  name: 'App',
  components: {
    'header-container': Header,
    'footer-container': Footer,
    'mobile-header-container': MobileHeader,
    'mobile-footer-container': MobileFooter,
    'button-comp': Button,
    'modal-comp': Modal,
  },
  data () {
    return {
      showModal: false,
    };
  },
  methods: {
    select (item) {
      alert(item);
    },
    show () {
      this.showModal = true;
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
