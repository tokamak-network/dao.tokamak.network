<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/logo.png" alt="">
    </div>
    <div class="menu">
      <router-link :to="'election'" class="menu-item">Election</router-link>
      <router-link :to="'propose'" class="menu-item">Propose</router-link>
      <router-link :to="'committee'" class="menu-item">Committee</router-link>
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

  height: 84px;
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

.menu a {
  text-decoration: none;
}
</style>
