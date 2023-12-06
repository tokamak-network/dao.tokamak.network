import Vue from 'vue';
import VueMq from 'vue-mq';

import App from './App.vue';
import store from './store';
import router from './router';
import VueApollo from 'vue-apollo';
import VueGtag from 'vue-gtag';
// import { ApolloClient, InMemoryCache } from '@apollo/client';
import apollo from '../graphql/apollo';

Vue.use(VueGtag, {
  config: {
    id: 'G-LFP6FR91CY',
  },
});

import * as filters from '@/utils/helpers';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]); // eslint-disable-line
});

// https://api.thegraph.com/subgraphs/name/cd4761/staking-v1-subgraph
// https://api.thegraph.com/subgraphs/name/cd4761/staking-v1-subgraph-goerli

Vue.prototype.$apollo = apollo;

Vue.use(VueApollo);

// const apolloProvider = new VueApollo({
//   defaultClient: apolloClient,
// });

Vue.config.productionTip = false;
Vue.use(VueMq, {
  breakpoints: {
    mobile: 840,
    tablet: 1270,
    desktop: Infinity,
  },
});

new Vue({
  // apolloProvider,
  store,
  router,
  render: h => h(App),
}).$mount('#app');
