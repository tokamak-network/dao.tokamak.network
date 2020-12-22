<template>
  <div class="time">{{ time }}</div>
</template>

<script>
export default {
  props: {
    time: {
      type: String,
      default: '',
    },
  },
};
</script>

<style>
.time {
  /* width: 67px; */
  /* height: 13px; */
  margin: 0 0 0 7px;
  font-family: Roboto;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.6;
  letter-spacing: normal;
  padding-left: 18px;
  text-align: left;
  color: #86929d;
  background: url('../assets/poll-time-active-icon.svg') no-repeat 0% 45%;
  background-size: 13px;
}
</style>
