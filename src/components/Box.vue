<template>
  <div class="box">
    <img src="@/assets/box-side.svg" alt="" width="2" height="10">
    <div :style="[
      status === 'selected' ? { color: '#2a72e5' } : {},
      status === 'unselected' ? { color: '#434b52' } : {},
      status === 'normal' ? { color: '#434b52' } : {},
    ]"
    >
      Normal
    </div>
    <div>What is the temporary explanatory text insertion area.</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: 'normal',
    };
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 174px;
  height: 67px;
  padding: 12px 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(223, 228, 238, 0.35);
  background-color: #ffffff;

  margin-right: 25px;
  margin-bottom: 8px;

  position: relative;

  &:hover {
    border: solid 1px #2a72e5;
    cursor: pointer;
  }

  > img {
    position: absolute;
    right: 15px;
    top: 15px;
  }

  > div {
    &:nth-child(2) {
      font-family: Roboto;
      font-size: 13px;
      font-weight: 900;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: normal;
      text-align: left;
      color: #434b52;
    }
    &:nth-child(3) {
      margin-top: 5px;

      font-family: Roboto;
      font-size: 9px;
      font-weight: 300;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: normal;
      text-align: left;
      color: #818992;
    }
  }
}
</style>
