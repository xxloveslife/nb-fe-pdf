import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/index.vue'
import ClickPage from '../views/clickPage.vue'
import SyncPage from '../views/syncPage.vue'
import AsyncDownload from '../views/asyncDownload.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },

  {
    path: '/clickPage',
    name: 'clickPage',
    component: ClickPage,
  },

  {
    path: '/syncPage',
    name: 'syncPage',
    component: SyncPage,
  },
  {
    path: '/asyncDownload',
    name: 'asyncDownload',
    component: AsyncDownload,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
