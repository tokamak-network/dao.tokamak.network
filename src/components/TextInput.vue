<template>
  <div class="text-input"
       :class="{
         'clickable': clickable,
       }"
       @click="click()"
  >
    <span v-if="label !== ''" class="label">{{ label }}</span>
    <input ref="input"
           :placeholder="hint"
           :style="inputPadding"
           :class="{
             'with-unit': unit !== '',
             'big': big,
           }"
           :readonly="readonly"
           :value="value"
           @keypress="keypress"
    >
    <div v-if="unit !== ''" ref="unit">{{ unit }}</div>
  </div>
</template>

<script>
export default {
  props: {
    hint: {
      type: String,
      default: '',
    },
    unit: {
      type: String,
      default: '',
    },
    big: {
      type: Boolean,
      default: false,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: undefined,
    },
    label: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      unitWidth: 0,
      index: 0,
    };
  },
  computed: {
    inputPadding () {
      return {
        'padding-right': this.unit !== '' ? (7+this.unitWidth+16)+'px' : 0,
      };
    },
  },
  mounted () {
    if (this.unit !== '') {
      this.unitWidth = this.$refs.unit.clientWidth;
    }
  },
  methods: {
    keypress (evt) {
      if (this.unit !== '') {
        evt = (evt) ? evt : window.event;
        const charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          evt.preventDefault();
        } else {
          return true;
        }
      }
      return true;
    },
    click () {
      if (this.clickable) {
        this.$emit('on-clicked');
      }
    },
  },
};
</script>

<style scoped>
.text-input {
  display: flex;
  align-items: center;
  position: relative;
}
.text-input input {
  width: 100%;
  height: 32px;

  font-family: Roboto;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: 0.22px;
  color: #3e495c;

  border: solid 1px #dfe4ee;
  border-radius: 4px;

  outline: none;

  padding-left: 16px;
}
.text-input input::placeholder {
  color: #86929d;
}
.text-input input:hover {
  border: 1px solid #c9d1d8;
}
.text-input input:focus {
  border: 1px solid #2a72e5;
}
.text-input > div {
  position: absolute;
  font-family: Roboto;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: 0.22px;
  text-align: right;
  color: #3e495c;

  right: 16px;
}

.with-unit {
  text-align: right;
}
.big {
  min-height: 43px;
}

.clickable {
  cursor: pointer;
}

.label {
  width: 100%;
  height: 42px;

  position: absolute;

  display: flex;
  align-items: center;

  font-family: Roboto;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: 0.22px;
  text-align: left;
  color: #3e495c;

  left: 16px;
}
</style>
