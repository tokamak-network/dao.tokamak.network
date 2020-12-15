import VueRouter from 'vue-router';
import Vue from 'vue';

import Root from '@/views/Root.vue';
import Main from '@/views/Main.vue';
import PageNotFound from '@/views/PageNotFound.vue';
import Election from '@/views/Election.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
  },
  {
    path: '/root',
    name: 'root',
    component: Root,
  },
  {
    path: '/election',
    name: 'election',
    component: Election,
  },
  {
    path: '*',
    component: PageNotFound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
