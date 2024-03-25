<template>
  <div class="footer" :class="{ 'footer-sub': isSub() }">
    <div class="menu">
      <span class="company" :class="{ 'company-sub': isSub() }">Copyright © 2024 <span style="color: #1c1c1c;">Tokamak Network</span> All Rights Reserved.</span>
      <!-- <a href="" target="_blank" class="clause" :class="{ 'clause-sub': isSub() }">Terms</a>
      <a href="" target="_blank" class="clause" :class="{ 'clause-sub': isSub() }">Privacy Policy</a>
      <a href="" target="_blank" class="clause" :class="{ 'clause-sub': isSub() }">Status</a> -->
    </div>
    <div class="sns-container">
      <div class="sns">
        <a href="https://t.me/tokamak_network" target="_blank">
          <img v-if="isSub()" src="@/assets/telegram.svg" alt="" width="20" height="20">
          <img v-else src="@/assets/telegram-white.svg" alt="" width="20" height="20">
        </a>
      </div>
      <div class="sns">
        <a href="https://discord.gg/SZw2WSR" target="_blank">
          <img v-if="isSub()" src="@/assets/discord.svg" alt="" width="20" height="20">
          <img v-else src="@/assets/discord-white.svg" alt="" width="20" height="20">
        </a>
      </div>
      <div class="sns">
        <a href="https://github.com/tokamak-network/dao.tokamak.network" target="_blank">
          <img v-if="isSub()" src="@/assets/github.svg" alt="" width="20" height="20">
          <img v-else src="@/assets/github-white.svg" alt="" width="20" height="20">
        </a>
      </div>
      <!-- <div class="sns">
        <a href="https://www.youtube.com/channel/UCF6vtIKF_0QQVRG983czVEQ" target="_blank">
          <img v-if="isSub()" src="@/assets/youtube.svg" alt="" width="20" height="20">
          <img v-else src="@/assets/youtube-white.svg" alt="" width="20" height="20">
        </a>
      </div> -->
      <div class="sns">
        <a href="https://twitter.com/tokamak_network" target="_blank">
          <img v-if="isSub()" src="@/assets/twitter.svg" alt="" width="20" height="20">
          <img v-else src="@/assets/twitter-white.svg" alt="" width="20" height="20">
        </a>
      </div>
      <div class="sns">
        <a href="https://www.linkedin.com/company/tokamaknetwork/" target="_blank">
          <img v-if="isSub()" src="@/assets/linkedin.svg" alt="" width="20" height="20">
          <img v-else src="@/assets/linkedin-white.svg" alt="" width="20" height="20">
        </a>
      </div>
      <div class="sns">
        <a href="https://medium.com/onther-tech" target="_blank">
          <img v-if="isSub()" src="@/assets/medium.svg" alt="" width="20" height="20">
          <img v-else src="@/assets/medium-white.svg" alt="" width="20" height="20">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    isSub () {
      return this.$route.path !== '/';
    },
  },
};
</script>

<style lang="scss" scoped>
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
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;

  margin-right: 50px;
  text-decoration: none;
  white-space: nowrap;
}

.company-sub {
  color: #999999;
}

.clause {
  /* font styles */
  font-family: Roboto;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
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
  margin-right: 14px;
}

a:hover {
  text-decoration: underline;
  color: #ffffff;
}

.sns-container {
  display: flex;
  align-items: center;

  .sns {
    padding-left: 8px;
    padding-right: 8px;

    margin-left: 4px;
  }
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
