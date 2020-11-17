import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../components/layout'
import home from '../pages/home'
import login from '../pages/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'home',
        component: home,
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
