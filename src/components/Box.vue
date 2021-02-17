<template>
  <div class="box"
       :style="[
         isHovered && type === 'A' ? { 'border': 'solid 1px #2a72e5' } : {},
         isHovered && type === 'B' ? { 'border': 'solid 1px #f7981c' } : {},
         $mq === 'mobile' ? { width: '100%', 'justify-content': ''} : { 'justify-content': 'center' },
       ]"
       @mouseover="isHovered=true" @mouseleave="isHovered=false"
  >
    <div class="function-name"
         :style="[
           status === 'selected' && type === 'A' ? { color: '#2a72e5' } : {},
           status === 'selected' && type === 'B' ? { color: '#ff7800' } : {},
         ]"
    >
      {{ functionName }}
    </div>
    <!-- <div>What is the temporary explanatory text insertion area.</div> -->
  </div>
</template>

<script>
export default {
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

  margin-right: 25px;
  margin-bottom: 8px;

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
</style>
