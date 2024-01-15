import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Charts from '../views/Charts.vue'
import Statistics from '../views/Statistics.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/upload',
    name: 'upload',
    component: function () {
      return import(/* webpackChunkName: "upload" */ '../views/FileUpload.vue')
    }
  },
  {
    path: '/charts/:type?',
    name: 'charts',
    component: Charts
  },
  {
    path: '/statistics/:type?',
    name: 'statistics',
    component: Statistics
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
