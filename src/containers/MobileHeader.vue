<template>
  <div class="mobile-header">
    <div v-if="$mq === 'mobile' && isOpen" class="menu-container">
      <img class="close-btn" src="@/assets/burger-close-icon.svg" alt="" @click="isOpen = false;">
      <div class="menu-btn" @click="route('/'); isOpen = false;">Home</div>
      <div class="menu-btn" @click="route('/election'); isOpen = false;">Election</div>
      <div class="menu-btn" @click="route('/propose'); isOpen = false;">Propose</div>
      <div class="menu-btn" @click="route('/agenda'); isOpen = false;">Agenda</div>
    </div>
    <div class="logo">
      <img src="@/assets/mobile-logo.png" alt=""
           width="105" height="30"
      >
    </div>
    <div class="menu">
      <connect-wallet />
      <img class="menu-icon"
           src="@/assets/mobile-menu.png" alt=""
           width="30" height="30"
           @click="isOpen = true;"
      >
    </div>
  </div>
</template>

<script>
import Connect from '@/components/Connect.vue';

export default {
  components: {
    'connect-wallet': Connect,
  },
  data () {
    return {
      isOpen: false,
    };
  },
  methods: {
    route (path) {
      if (this.$route.path === path) {
        return;
      }
      this.$router.push({ path });
    },
  },
};
</script>

<style lang="scss" scoped>
.mobile-header {
  display: flex;
  justify-content: space-between;

  height: 84px;
  background: #0062c2;
  padding-left: 20px;
  padding-right: 10px;
}

.logo {
  display: flex;
  align-items: center;
}

.menu {
  display: flex;
  align-items: center;
}

img {
  margin-left: 10px;
  margin-right: 10px;
}

.menu-icon {
  cursor: pointer;
}

.menu-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;

  z-index: 999;

  min-height: 100vh;
  max-height: 100vh;

  background: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  .menu-btn {
    font-family: Roboto;
    font-size: 36px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.50;
    letter-spacing: normal;
    text-align: center;
    color: #000000;
  }

  .close-btn {
    position: absolute;
    top: 28px;
    right: 10px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
