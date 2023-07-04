<template>
  <div class="gnb">
    <a
      href="https://tokamak.network/#/"
      :style="{ width: '158px' }"
      class="link"
    >
      <div>Tokamak Network</div>
    </a>
    <a
      href="https://titan.tokamak.network/"
      :style="{ width: '112px' }"
      class="link"
    >
      <div>L2 Mainnet</div>
    </a>
    <a
      href="https://bridge.tokamak.network/#/"
      style="width: 136px;"
      class="link"
      target="_blank"
    >
      <div>Bridge & Swap</div>
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
      class="active-link"
    >
      <div>DAO</div>
    </a>
    <a
      href="https://tonstarter.tokamak.network/"
      :style="{ width: '110px' }"
      class="link"
    >
      <div>Launchpad</div>
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
