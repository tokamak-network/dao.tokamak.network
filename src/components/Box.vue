<template>
  <div class="box-container">
    <div class="box"
         :style="[
           isHovered && type === 'A' && status !== 'disabled' ? { 'border': 'solid 1px #2a72e5', 'color': '#2a72e5' } : {},
           isHovered && type === 'B' && status !== 'disabled' ? { 'border': 'solid 1px #f7981c', 'color': '#f7981c' } : {},
           $mq === 'mobile' ? { width: '100%', 'justify-content': ''} : { 'justify-content': 'center' },
         ]"
         @mouseover="isHovered=true" @mouseleave="isHovered=false"
    >
      <div class="function-name"
           :style="[
             isHovered && type === 'A' ? { 'color': '#2a72e5' } : {},
             isHovered && type === 'B' ? { 'color': '#f7981c' } : {},
             status === 'selected' && type === 'A' ? { color: '#2a72e5' } : {},
             status === 'selected' && type === 'B' ? { color: '#ff7800' } : {},
             status === 'disabled' ? { 'color': '#bdc0c2' } : {}
           ]"
      >
        {{ functionName }}
      </div>
    </div>
    <div v-if="status === 'disabled'" class="tooltip">
      <img
        src="@/assets/tooltip-mobile.png" alt=""
        width="6" height="4"
        style="margin-right: 85px"
      >
      <div class="tooltip-content">
        This function will become available after the DAO contract is upgraded.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoxPage',
  props: {
    functionName: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'A',
      validator: (value) => {
        return [
          'A',
          'B',
        ].indexOf(value) !== -1;
      },
    },
    status: {
      type: String,
      default: 'unselected',
      validator: (value) => {
        return [
          'selected',
          'unselected',
          'disabled',
        ].indexOf(value) !== -1;
      },
    },
  },
  data () {
    return {
      isHovered: false,
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

  margin-bottom: -10px; // grid-gap: 20px

  position: relative;

  display: flex;
  align-items: center;

  word-break: break-all;

  &:hover {
    cursor: pointer;

    // .function-name {
    //   color: #2a72e5;
    // }
  }
  &:hover ~ .tooltip {
    display: flex
  }

  > img {
    position: absolute;
    right: 15px;
    top: 15px;
  }

  .function-name {
    font-family: Roboto;
    font-size: 13px;
    font-weight: 900;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;

    color: #434b52;
  }

  // > div {
  //   &:nth-child(3) {
  //     margin-top: 5px;

  //     font-family: Roboto;
  //     font-size: 9px;
  //     font-weight: 300;
  //     font-stretch: normal;
  //     font-style: normal;
  //     letter-spacing: normal;
  //     text-align: left;
  //     color: #818992;
  //   }
  // }
}
.box-container {

  .tooltip {
    display: none;
    flex-direction: column;
    align-items: center;
    position: absolute;
    margin-top:10px;
    z-index: 999;
    > img {
      // position: absolute;
      margin-left: 70px;
      right: 15px;
      top: 15px;
    }

}
.tooltip-content {
  width: 208px;
  background: #353c48;
  border-radius: 3px;

  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;

  padding: 8px;
}
}

</style>
