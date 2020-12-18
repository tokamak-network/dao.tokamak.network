<template>
  <div class="title">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style>
title {
  height: 32px;
  margin: 0 0px 12px 0;
  font-family: Roboto;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;
}
</style>
