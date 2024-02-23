<template>
  <div class="text-time">
    <img :src="getImg()" alt=""
         width="14" height="14"
    >
    <div class="time">Staking reward last updated {{ time }}</div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: '',
      validator: (value) => {
        return [
          'A',
          'B',
        ].indexOf(value) !== -1;
      },
    },
    time: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    getImg () {
      return !this.isActive ? require('../assets/poll-time-inactive-icon.svg') :
        this.type === 'A' ? require('../assets/poll-time-active-icon.svg') : require('../assets/poll-time-active-icon-typeB.svg');
    },
  },
};
</script>

<style lang="scss" scoped>
.text-time {
  display: flex;
  align-items: center;

  .time {
    font-family: Roboto;
    font-size: 10px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #86929d;

    margin-left: 7px;
  }
}
</style>
