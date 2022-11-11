<template>
  <div class="gnb">
    <a
      href="https://vision-page.vercel.app/"
      :style="{ width: '100px' }"
      class="link"
    >
      <div>Vision</div>
    </a>
    <a
      href="https://renewal-homepage.vercel.app/#/"
      :style="{ width: '158px' }"
      class="link"
    >
      <div>Tokamak Network</div>
    </a>
    <a
      href="https://rinkeby.simple.staking.tokamak.network/"
      :style="{ width: '137px' }"
      class="link"
    >
      <div>Simple Staking</div>
    </a>
    <a
      href="https://rinkeby.dao.tokamak.network/#/"
      :style="{ width: '190px' }"
      class="active-link"
    >
      <div>Tokamak Network DAO</div>
    </a>
    <a
      href="https://tonswapper.vercel.app/"
      :style="{ width: '76px' }"
      class="link"
    >
      <div>Swap</div>
    </a>
    <a
      href="https://rinkeby.tonstarter.tokamak.network/"
      :style="{ width: '114px' }"
      class="link"
    >
      <div>TONStarter</div>
    </a>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.gnb {
  display: flex;
  min-width: 100%;
  background: #2775ff;
  color: #ffffff;
  font-weight: bold;
  justify-content: center;
  height: 45px;
}
.link {
  color: #ffffff;
  display: flex;
  align-items: center;
  font-size: 15px;
  line-height: 1.53;
  text-decoration: none;
  justify-content: center;
  font-family: 'Titillium Web', sans-serif;
  &:hover {
    cursor: pointer;
  }
}

.active-link {
  background: #ffffff;
    color: #353c48;
  display: flex;
  align-items: center;
  font-size: 15px;
  line-height: 1.53;
  text-decoration: none;
  justify-content: center;
  font-family: 'Titillium Web', sans-serif;
  &:hover {
    cursor: pointer;
  }
}
</style>
