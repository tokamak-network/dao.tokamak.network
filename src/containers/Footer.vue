<template>
  <div class="footer">
    <div class="menu">
      <span class="company">© 2021 Onther</span>
      <span class="clause">Terms</span>
      <span class="clause">Privacy Policy</span>
      <span class="clause">Status</span>
    </div>
    <div class="menu">
      <a href="" target="_blank">
        <img src="@/assets/telegram.png" alt="">
      </a>
      <a href="" target="_blank">
        <img src="@/assets/discord.png" alt="">
      </a>
      <a href="" target="_blank">
        <img src="@/assets/github.png" alt="">
      </a>
      <a href="" target="_blank">
        <img src="@/assets/facebook.png" alt="">
      </a>
      <a href="" target="_blank">
        <img src="@/assets/youtube.png" alt="">
      </a>
      <a href="" target="_blank">
        <img src="@/assets/twitter.png" alt="">
      </a>
      <a href="" target="_blank">
        <img src="@/assets/linkedin.png" alt="">
      </a>
      <a href="" target="_blank">
        <img src="@/assets/medium.png" alt="">
      </a>
    </div>
  </div>
</template>

<script>
export default {
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
}

.menu img {
  width: 20px;
  height: 20px;
  padding: 4px;
  margin-right: 14px;
}
</style>
