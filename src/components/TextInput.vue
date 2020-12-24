<template>
  <div>
    <input
      v-if="required === true && ton === false"
      :value="value"
      :disabled="status === 'disabled'"
      :type="type"
      :placeholder="placeholder"
      required
      @input="updateAmount($event.target.value)"
    >
    <input
      v-if="required === true && ton === false"
      :value="value"
      :placeholder="placeholder"
      :disabled="status === 'disabled'"
      :type="type"
      @input="updateAmount($event.target.value)"
    >
    <input
      v-if="ton === true"
      value="0"
      style="text-align: right; padding-right:40px; padding-left:0px; "
      :disabled="status === 'disabled'"
      :placeholder="placeholder"
      :type="type"
      @keypress="isNumber"
      @input="updateAmount($event.target.value)"
    >
    <div v-if="tooltip !== '' && ton === false" class="tooltip">
      <span class="tooltiptext" :style="`margin-left: 10px;`">{{ tooltip }}</span>
    </div>
    <div v-if="ton === true" class="ton">TON</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: '',
      validator: (value) => {
        return [
          '',
          'running',
          'disabled',
          'valid',
          'invalid',
        ].indexOf(value) !== -1;
      },
    },
    required: {
      type: Boolean,
      default: false,
    },
    ton: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type:String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    tooltip: {
      type: String,
      default: '',
    },
    tooltipType: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      valid: this.status,
    };
  },
  methods: {
    isNumber (evt) {
      evt = (evt) ? evt : window.event;
      const charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    updateAmount (amount) {
      this.$emit('on-input', amount);
    },
  },
};
</script>

<style scoped>
input {
  min-height: 32px;
  max-width: 170px;
  border-radius: 4px;
  position: relative;
  margin: 5px 0 6px 5px;
  padding-left: 10px;
  padding-right: 30px;
  border: solid 1px #dfe4ee;
  background-color: #ffffff;
}
input:hover {
  border-radius: 4px;
  border: solid 1px #c9d1d8;
  background-color: #ffffff;
}
input:focus {
  border-radius: 4px;
  border: solid 1px #2a72e5;
  background-color: #ffffff;
}
input:disabled {
  border-radius: 4px;
  border: solid 1px #dfe4ee;
  background-color: #e9edf1;
}
input:focus:required:valid {
  border: solid 1px #dfe4ee;
  background-color: #ffffff;
  background: url('../assets/input-icon-check.svg') no-repeat 95% 50%;
  background-size: 14px;
}
input:required:invalid {
  border: solid 1px #ff3b3b;
  background-color: #ffffff;
  color: #ff3b3b;
  background: url('../assets/input-icon-error.svg') no-repeat 95% 50%;
  background-size: 14px;
  z-index: 1;
}
.valid {
  width: 14px;
  height: 14px;
  object-fit: contain;
  display: inline-block;
  position: relative;
  right: 20px;
  top: 2px;
  background: url('../assets/input-icon-check.svg')
}
.input_question_icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
  position: relative;
}
.ton {
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: 0.2px;
  position: relative;
  display: inline-block;
  right: 35px;
  z-index: 2;
  color: #3e495c;
}
.tooltip {
  transition: all 0.8s;
  background: url('../assets/input-question-icon.svg');
  background-color: #ffffff;
  width: 14px;
  height: 14px;
  object-fit: contain;
  display: inline-block;
  position: relative;
  right: 20px;
  top: 2px;
  opacity: 1;
  z-index: 2;
}
/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  background-color: black;
  color: #fff;
  font-family: Roboto;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  font-size: 12px;
  text-align: center;
  padding: 7px;
  border-radius: 6px;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

.tooltip .tooltiptext::after {
  content: " ";
  position: absolute;
  top: 50%;
  right: 100%; /* To the left of the tooltip */
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent black transparent transparent;
}
</style>
