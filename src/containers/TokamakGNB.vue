<template>
  <div class="gnb">
    <a
      href=""
      :style="{ width: '100px' }"
      class="link"
    >
      <div>Vision</div>
    </a>
    <a
      href="https://tokamak.network/#/"
      :style="{ width: '158px' }"
      class="link"
    >
      <div>Tokamak Network</div>
    </a>
    <a
      href="https://rinkeby.tonstarter.tokamak.network/"
      :style="{ width: '114px' }"
      class="link"
    >
      <div>TONStarter</div>
    </a>
    <a
      href="https://simple.staking.tokamak.network/"
      :style="{ width: '90px' }"
      class="link"
    >
      <div>Staking</div>
    </a>
    <a
      href="https://dao.tokamak.network/#/"
      :style="{ width: '68px' }"
      class="link"
    >
      <div>DAO</div>
    </a>
    <a
      href="https://swap.tokamak.network/"
      :style="{ width: '76px' }"
      class="link"
    >
      <div>Swap</div>
    </a>
  </div>
</template>

<script>
import '@fontsource/titillium-web';
export default {};
</script>
<style lang="scss" scoped>
.gnb {
  display: flex;
  min-width: 100%;
  background: #2775ff;
  color: #ffffff;
  font-weight: bold;
  // height: 45px;
  justify-content: center;
}
.link {
  color: #ffffff;
  display: flex;
  align-items: center;
  font-size: 15px;
  height: 45px;
  text-decoration: none;
  justify-content: center;
  font-family: 'Titillium Web', sans-serif;
  &:hover {
    cursor: pointer;
    background: #ffffff;
    color: #353c48;
  }
}
</style>
