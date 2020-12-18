<template>
  <div>
    <input
      v-if="required===true"
      :value="value"
      :disabled="status === 'disabled'"
      :type="type"
      required
      @input="updateAmount($event.target.value)"
    >
    <input
      v-if="required===false"
      :value="value"
      :disabled="status === 'disabled'"
      :type="type"
      @input="updateAmount($event.target.value)"
    >
    <div v-if="tooltip!==''" class="tooltip">
      <span class="tooltiptext" :style="`margin-left: 10px;`">{{ tooltip }}</span>
    </div>
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
    type: {
      type: String,
      default: '',
      // validator: (value) => {
      //   return [
      //     'text',
      //     'number',
      //     'email',
      //   ].indexOf(value) !== -1;
      // },
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
  computed: {
    currencyAmount () {
      return amount => this.$options.filters.currencyAmount(amount);
    },
  },
  methods: {
    isNumber (evt) {
      evt = (evt) ? evt : window.event;
      const charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        // evt.preventDefault();
        console.log(this.valid);
      } else {
        return true;
      }
    },
    updateAmount (amount) {
      this.$emit('input', amount);
    },
  },
};
</script>

<style>
input {
  min-height: 32px;
  max-width: 170px;
  border-radius: 4px;
  position: relative;
  margin: 5px 0 6px 5px;
  padding-left: 10px;
  border: solid 1px #dfe4ee;
  background-color: #ffffff;
  outline-color: solid 1px #dfe4ee;
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
input:focus:valid {
  border: solid 1px #dfe4ee;
  background-color: #ffffff;
  background: url('../assets/input-icon-check.svg') no-repeat 95% 50%;
  background-size: 14px;
}
input:required:valid {
  border: solid 1px #dfe4ee;
  background-color: #ffffff;
  background: url('../assets/input-icon-check.svg') no-repeat 95% 50%;
  background-size: 14px;
}
input:focus:required:invalid {
  border: solid 1px #ff3b3b;
  background-color: #ffffff;
  background: url('../assets/input-icon-error.svg') no-repeat 95% 50%;
  background-size: 14px;
  z-index: 1;
}
input:required:invalid {
  border: solid 1px #ff3b3b;
  background-color: #ffffff;
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
