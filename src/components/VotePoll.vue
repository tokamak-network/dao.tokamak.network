<template>
  <div>
    <div class="progress" :style="progressStyle">
      <div v-if="remain === true"
           class="background-text"
           :style="backTextStyle"
      >
        {{ 100-pct }}%
      </div>
      <div class="progress-bar"
           :style="barStyle"
      >
        <div class="text">{{ roundNumber(pct) }}%</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    'pct': {
      default: 0,
      type: Number,
    },
    'remain': {
      default: false,
      type: Boolean,
    },
    'margin': {
      default: 0,
      type: Number,
    },
  },
  computed: {
    barStyle () {
      const style = {
        'width': this.pct+'%',
      };
      return style;
    },
    backTextStyle () {
      const style = {
        'padding-left': this.pct + '%',
      };
      return style;
    },
    progressStyle () {
      const style = {
        'margin-left': this.margin + 'px',
        'margin-right': this.margin + 'px',
      };
      return style;
    },
  },
  methods: {
    roundNumber (pct) {
      if(isNaN (pct) === false && Number.isInteger(pct) === false) {
        return pct.toFixed(2);
      } else {
        return pct;
      }
    },
  },
};
</script>

<style>
.progress {
  background: #dfe4ee;
  position: relative;
  min-height: 15px;
  z-index: 1;
  border-radius: 100px;
}
.progress-bar {
  background: #1f8efa;
  max-height: 15px;
  font-weight: 500;
  border-radius: 100px;
  position: absolute;
  top: 0;
  height: 100%;
  min-height: 15px;
  z-index: 2;
}
.text {
  color: #ffffff;
  font-size: 10px;
  text-align: center;
  font-family: Roboto;
  font-weight: 500;
  padding-bottom: 1px;
  padding-top: 2px;
}
.background-text {
  position: relative;
  color: #3e495c;
  font-size: 10px;
  text-align: center;
  font-family: Roboto;
  padding-bottom: 1px;
  padding-top: 2px;
}
</style>
