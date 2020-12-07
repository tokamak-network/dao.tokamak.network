import VueRouter from 'vue-router';
import Vue from 'vue';

import Root from '@/views/Root.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Root',
    component: Root,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
