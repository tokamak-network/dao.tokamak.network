import VueRouter from 'vue-router';
import Vue from 'vue';

import Root from '@/views/Root.vue';
import Main from '@/views/Main.vue';
import PageNotFound from '@/views/PageNotFound.vue';
import Election from '@/views/Election.vue';
import Agenda from '@/views/Agenda.vue';
import CommitteeDetail from '@/views/CommitteeDetail.vue';
import AgendaDetail from '@/views/AgendaDetail.vue';
import Propose from '@/views/Propose.vue';

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
    path: '/agenda',
    name: 'agenda',
    component: Agenda,
  },
  {
    path: '/agenda/:id',
    name: 'agenda-detail',
    component: AgendaDetail,
  },
  {
    path: '/propose',
    name: 'propose',
    component: Propose,
  },
  {
    path: '*',
    component: PageNotFound,
  },
];

const router = new VueRouter({
  scrollBehavior () {
    return { x: 0, y: 0 };
  },
  routes,
});

export default router;
