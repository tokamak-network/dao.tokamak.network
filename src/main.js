import Vue from 'vue';
import VueMq from 'vue-mq';

import App from './App.vue';
import store from './store';
import router from './router';

import * as filters from '@/utils/helpers';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]); // eslint-disable-line
});

Vue.config.productionTip = false;
Vue.use(VueMq, {
  breakpoints: {
    mobile: 840,
    tablet: 1270,
    desktop: Infinity,
  },
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
