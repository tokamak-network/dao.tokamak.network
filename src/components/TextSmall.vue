<template>
  <div class="text-small">
    <span class="label">{{ label }}</span>
    <span class="value"
          :class="{
            'value-type-a': type === 'A',
            'value-type-b': type === 'B',
          }"
    >
      {{ value }}
    </span>
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
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.text-small {
  .label {
    font-family: Roboto;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: 0.3px;
    text-align: left;
    color: #3e495c;
  }
  .value {
    font-family: Roboto;
    font-size: 12px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: 0.3px;
    text-align: left;

    margin-left: 2px;

    &-type-a {
      color: #2a72e5;
    }
    &-type-b {
      color: #f7981c
    }
  }
}
</style>
