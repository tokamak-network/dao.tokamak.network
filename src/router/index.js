import VueRouter from 'vue-router';
import Vue from 'vue';

import Root from '@/views/Root.vue';
import Main from '@/views/Main.vue';
import PageNotFound from '@/views/PageNotFound.vue';
import Election from '@/views/Election.vue';
import Committee from '@/views/Committee.vue';
import CommitteeDetail from '@/views/CommitteeDetail.vue';

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
    path: '/election/:address',
    name: 'committee-detail',
    component: CommitteeDetail,
  },
  {
    path: '/committee',
    name: 'committee',
    component: Committee,
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
