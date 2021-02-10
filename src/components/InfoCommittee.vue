<template>
  <div class="committee">
    <div class="container">
      <div class="title">
        <span>{{ title }}</span>
        <img v-if="tooltip !== ''"
             src="@/assets/tooltip.png" alt=""
             width="14" height="14"
        >
        <div class="tooltip"
             :style="tooltipWidth"
        >
          <img src="@/assets/arrow-tooltip.png" alt=""
               width="4" height="6"
          >
          <div class="tooltip-content">
            {{ tooltip }}
          </div>
        </div>
      </div>
      <div v-if="typeof(content) === 'string'" class="content">
        <span :class="{
                'url': type === 'url',
                'description': type === 'description',
                'address': type === 'address',
                'description2': type === 'time',
              }"
              @click="redirect(content)"
        >
          {{ content }}
        </span>
      </div>
      <div v-if="type === 'time' && typeof(content) === 'number'" class="content">
        <span :class="{ 'description': type === 'time' }">
          {{ content | date2 }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
      required: true,
    },
    content: {
      type: [String, Number],
      default: '',
      required: true,
    },
    type: {
      type: String,
      default: '',
      validator: (value) => {
        return [
          '',
          'url',
          'description',
          'description2',
          'address',
          'name',
          'website',
          'time',
        ].indexOf(value) !== -1;
      },
    },
    tooltip: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '',
    },
  },
  computed: {
    tooltipWidth () {
      return { width: this.width + 'px' };
    },
  },
  methods: {
    redirect (link) {
      if (this.type === 'url' || this.type === 'address') {
        window.open(link, '_blank'); // eslint-disable-line
      }
    },
  },
};
</script>

<style scoped>
.committee {
  max-height: 20px;
}
.committee .container {
  width: 100%;
  display: flex;

  align-items: center;
  justify-content: center;
}
.committee .title {
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;

  display: flex;
  align-items: center;
}
.committee .content {
  display: flex;
  flex-direction: row;
}

.container {
  margin-bottom: 18px;
}

.title {
  position: relative;
}
.title img {
  margin-left: 3px;
}

.title img:hover ~ .tooltip {
  display: flex;
}

.tooltip {
  display: none;
  position: absolute;

  left: 105%;
  top: -3px;

  z-index: 999;
}
.tooltip img {
  margin-top: 9px;
}
.tooltip-content {
  max-width: 317px;
  background: #353c48;
  border-radius: 3px;

  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;

  padding: 8px;
}

.content {
  flex: 1;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  font-family: Roboto;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: right;
  color: #818992;
}

.url {
  color: #2a72e5;

  text-decoration: underline;
  cursor: pointer;
}
.name {
  font-size: 14px;
  color: #3e495c;
  font-weight: 500;
}
.website {
  font-size: 14px;
  color: #3e495c;
  font-weight: 500;
}
.description {
  font-size: 14px;
  color: #3e495c;
  font-weight: 500;
}
.description2 {
  font-size: 14px;
  color: #3e495c;
  font-weight: 500;
}
.address {
  color: #818992;

  text-decoration: underline;
  cursor: pointer;
}
</style>
