<template>
  <div class="header">
    <div class="logo">
      <img
        src="@/assets/logo.png"
        alt=""
      >
    </div>
    <div class="menu">
      <a
        class="menu-item"
        href=""
      >
        Eleciton
      </a>
      <a
        class="menu-item"
        href=""
      >
        Eleciton
      </a>
      <a
        class="menu-item"
        href=""
      >
        Eleciton
      </a>
      <connect-wallet />
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
.header {
  display: flex;
  justify-content: space-between;

  height: 76px;
  background: #0062c2;
  padding-left: 40px;
  padding-right: 40px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  width: 306px;
  height: 30px;
}

.menu {
  display: flex;
  align-items: center;
}

.menu-item {
  /* font styles */
  font-family: Roboto;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.31;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;

  margin-right: 76px;
}
</style>
