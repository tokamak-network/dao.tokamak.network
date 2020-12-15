import VueRouter from 'vue-router';
import Vue from 'vue';

import Root from '@/views/Root.vue';
import Main from '@/views/Main.vue';
import PageNotFound from '@/views/PageNotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/root',
    name: 'Root',
    component: Root,
  },
  { path: '*',
    component: PageNotFound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
