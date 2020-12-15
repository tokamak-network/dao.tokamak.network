<template>
  <div class="footer">
    <div class="menu">
      <span class="company">© 2021 Onther</span>
      <a href="" target="_blank" class="clause">Terms</a>
      <a href="" target="_blank" class="clause">Privacy Policy</a>
      <a href="" target="_blank" class="clause">Status</a>
    </div>
    <div class="menu">
      <a href="" target="_blank">
        <img src="@/assets/telegram-sub.png" alt="">
      </a>
      <a href="" target="_blank">
        <img src="@/assets/discord-sub.png" alt="">
      </a>
      <a href="" target="_blank">
        <img src="@/assets/github-sub.png" alt="">
      </a>
      <a href="" target="_blank">
        <img src="@/assets/facebook-sub.png" alt="">
      </a>
      <a href="" target="_blank">
        <img src="@/assets/youtube-sub.png" alt="">
      </a>
      <a href="" target="_blank">
        <img src="@/assets/twitter-sub.png" alt="">
      </a>
      <a href="" target="_blank">
        <img src="@/assets/linkedin-sub.png" alt="">
      </a>
      <a href="" target="_blank">
        <img src="@/assets/medium-sub.png" alt="">
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
  background: #fafbfc;
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
  color: #3e495c;

  margin-right: 50px;
  text-decoration: none;
  white-space: nowrap;
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
  color: #86929d;

  margin-right: 30px;
  text-decoration: none;
  white-space: nowrap;
}

.menu img {
  width: 20px;
  height: 20px;
  padding: 4px;
  margin-right: 14px;
}

a:hover {
  text-decoration: underline;
  color: #000000;
}
</style>
