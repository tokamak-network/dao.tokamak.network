<template>
  <div class="mobile-header">
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
};
</script>

<style scoped>
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
</style>
