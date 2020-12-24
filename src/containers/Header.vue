<template>
  <div class="header" :class="{ 'header-sub': isSub }">
    <div class="logo">
      <img v-if="isSub" src="@/assets/logo-sub.png" alt="">
      <img v-else src="@/assets/logo.png" alt="">
    </div>
    <div class="menu">
      <router-link :to="'election'" class="menu-item" :class="{ 'menu-item-sub': isSub }">
        Election
      </router-link>
      <router-link :to="'propose'" class="menu-item" :class="{ 'menu-item-sub': isSub }">
        Propose
      </router-link>
      <router-link :to="'committee'" class="menu-item" :class="{ 'menu-item-sub': isSub }">
        Committee
      </router-link>
      <connect-wallet :is-sub="isSub" />
    </div>
  </div>
</template>

<script>
import Connect from '@/components/Connect.vue';

export default {
  components: {
    'connect-wallet': Connect,
  },
  computed: {
    isSub () {
      return this.$route.path !== '/';
    },
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

.header-sub {
  background: #fafbfc;
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
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;

  margin-right: 76px;
  text-decoration: none;
}

.menu-item-sub {
  color: #3e495c;
}

.menu-item-sub:hover {
  font-family: Roboto;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #2a72e5;
}

@media all and (max-width: 360px) {
}

@media all and (min-width: 361px) and (max-width: 1024px) {
  .header {
    padding-left: 25px;
    padding-right: 25px;
  }

  .menu-item {
    margin-right: 50px;
  }
}
</style>
