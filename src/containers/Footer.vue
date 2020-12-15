<template>
  <div class="footer" :class="{ 'footer-sub': isSub }">
    <div class="menu">
      <span class="company" :class="{ 'company-sub': isSub }">© 2021 Onther</span>
      <a href="" target="_blank" class="clause" :class="{ 'clause-sub': isSub }">Terms</a>
      <a href="" target="_blank" class="clause" :class="{ 'clause-sub': isSub }">Privacy Policy</a>
      <a href="" target="_blank" class="clause" :class="{ 'clause-sub': isSub }">Status</a>
    </div>
    <div class="menu">
      <a href="" target="_blank"><img v-if="!isSub" src="@/assets/telegram.png" alt=""><img v-else src="@/assets/telegram-sub.png" alt=""></a>
      <a href="" target="_blank"><img v-if="!isSub" src="@/assets/discord.png" alt=""><img v-else src="@/assets/discord-sub.png" alt=""></a>
      <a href="" target="_blank"><img v-if="!isSub" src="@/assets/github.png" alt=""><img v-else src="@/assets/github-sub.png" alt=""></a>
      <a href="" target="_blank"><img v-if="!isSub" src="@/assets/facebook.png" alt=""><img v-else src="@/assets/facebook-sub.png" alt=""></a>
      <a href="" target="_blank"><img v-if="!isSub" src="@/assets/youtube.png" alt=""><img v-else src="@/assets/youtube-sub.png" alt=""></a>
      <a href="" target="_blank"><img v-if="!isSub" src="@/assets/twitter.png" alt=""><img v-else src="@/assets/twitter-sub.png" alt=""></a>
      <a href="" target="_blank"><img v-if="!isSub" src="@/assets/linkedin.png" alt=""><img v-else src="@/assets/linkedin-sub.png" alt=""></a>
      <a href="" target="_blank"><img v-if="!isSub" src="@/assets/medium.png" alt=""><img v-else src="@/assets/medium-sub.png" alt=""></a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isSub () {
      return this.$route.path !== '/';
    },
  },
};
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;

  height: 76px;
  background: #0062c2;
  padding-left: 40px;
  padding-right: 40px;
}

.footer-sub {
  background: #fafbfc;
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

.company {
  /* font styles */
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;

  margin-right: 50px;
  text-decoration: none;
  white-space: nowrap;
}

.company-sub {
  color: #3e495c;
}

.clause {
  /* font styles */
  font-family: Roboto;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: normal;
  text-align: right;
  color: #a6c8e9;

  margin-right: 30px;
  text-decoration: none;
  white-space: nowrap;
}

.clause-sub {
  color: #86929d;
}

.clause-sub:hover {
  color: #000000;
}

.menu img {
  width: 20px;
  height: 20px;
  padding: 4px;
  margin-right: 14px;
}

a:hover {
  text-decoration: underline;
  color: #ffffff;
}

@media all and (min-width: 361px) and (max-width: 1024px) {
  .footer {
    padding-left: 25px;
    padding-right: 25px;
  }

  .menu img {
    margin-right: 12px;
  }
}
</style>
