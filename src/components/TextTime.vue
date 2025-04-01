<template>
  <div class="text-time">
    <img :src="getImg()" alt="" width="14" height="14" />
    <div class="time">
      <div v-if="isAgenda === false" style="margin-right: 3px">
        Staking reward last updated
      </div>
      {{ time }}
    </div>
  </div>
</template>

<script>
import pollTimeInactiveIcon from '../assets/poll-time-inactive-icon.svg';
import pollTimeActiveIcon from '../assets/poll-time-active-icon.svg';
import pollTimeActiveIconTypeB from '../assets/poll-time-active-icon-typeB.svg';

export default {
  props: {
    type: {
      type: String,
      default: '',
      validator: (value) => ['A', 'B'].includes(value),
    },
    time: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isAgenda: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getImg() {
      if (!this.isActive) return pollTimeInactiveIcon;
      return this.type === 'A' ? pollTimeActiveIcon : pollTimeActiveIconTypeB;
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
    display: flex;
    flex-direction: row;
    margin-left: 7px;
  }
}
</style>
