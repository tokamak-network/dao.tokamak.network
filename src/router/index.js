import VueRouter from 'vue-router';
import Vue from 'vue';

import Wallet from '@/views/Wallet.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Wallet',
    component: Wallet,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
