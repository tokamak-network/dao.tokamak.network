import Vue from 'vue';
import VueMq from 'vue-mq';

import App from './App.vue';
import store from './store';
import router from './router';

Vue.config.productionTip = false;
Vue.use(VueMq, {
  breakpoints: {
    mobile: 700,
    tablet: 1270,
    desktop: Infinity,
  },
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
