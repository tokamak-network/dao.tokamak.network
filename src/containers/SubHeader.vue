<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/logo-sub.png" alt="">
    </div>
    <div class="menu">
      <router-link :to="'election'" class="menu-item">Election</router-link>
      <router-link :to="'propose'" class="menu-item">Propose</router-link>
      <router-link :to="'committee'" class="menu-item">Committee</router-link>
      <ballot-counter :ballot="0" />
      <connect-wallet :is-sub="true" />
    </div>
  </div>
</template>

<script>
import BallotCounter from '@/components/BallotCounter.vue';
import Connect from '@/components/Connect.vue';

export default {
  components: {
    'ballot-counter': BallotCounter,
    'connect-wallet': Connect,
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;

  height: 84px;
  background: #fafbfc;
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
  color: #3e495c;

  margin-right: 76px;
}

.menu a {
  text-decoration: none;
}

.menu a:hover {
  font-family: Roboto;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.31;
  letter-spacing: normal;
  text-align: center;
  color: #2a72e5;
}
</style>
