<template>
  <div class="text-smallest">
    <div class="label">{{ label }}</div>
    <div class="value">{{ value }}</div>
    <div v-if="withBar" class="bar"> | </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    withBar: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.text-smallest {
  display: flex;
  align-items: center;

  .label {
    font-family: Roboto;
    font-size: 9px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #2a72e5;
  }

  .value {
    font-family: Roboto;
    font-size: 9px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #3e495c;

    margin-left: 4px;
    margin-right: 4px;
  }

  .bar {
    font-family: Roboto;
    font-size: 9px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #cfd7db;

    margin-right: 4px;
  }
}
</style>
