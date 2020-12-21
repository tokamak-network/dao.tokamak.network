<template>
  <div>
    <div class="vue-simple-progress" :style="progressStyle">
      <div v-if="remain===true" style="position: relative; " :style="backTextStyle">{{ 100-pct }}%</div>
      <div class="vue-simple-progress-bar" :style="barStyle">
        <div :style="textStyle">{{ pct }}%</div>
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
  },
  computed: {
    progressStyle () {
      const style = {
        'background': '#dfe4ee',
      };
      style.position = 'relative';
      style['min-height'] = '15px';
      style['z-index'] = '-2';
      style['margin-top'] = '10px';
      style['border-radius'] = '100px';

      return style;
    },
    barStyle () {
      const style = {
        'background': '#1f8efa',
        'width': this.pct+'%',
        'height': '15px',
        'font-weight': '500',
      };
      style['border-radius'] = '100px';
      style.position = 'absolute';
      style.top = '0';
      style.height = '100%';
      style['min-height'] = '15px';
      style['z-index'] = '-1';

      return style;
    },
    textStyle () {
      const style = {
        'color': '#ffffff',
        'font-size': '10px',
        'text-align': 'center',
        'font-family': 'Roboto',
        'font-weight': '500',
      };
      style['padding-bottom'] = '1px';
      style['padding-top'] = '2px';
      return style;
    },
    backTextStyle () {
      const style = {
        'color': '#3e495c',
        'font-size': '10px',
        'text-align': 'center',
        'font-family': 'Roboto',
      };
      style['padding-left'] = this.pct + '%';
      style['padding-bottom'] = '1px';
      style['padding-top'] = '2px';
      return style;
    },
  },
};
</script>
