import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../components/layout'
import home from '../pages/home'
import login from '../pages/login'

import UserList from '../pages/user'

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
        name: '主页',
        path: 'index',
        component: home,
      },
      {
        name: '人员信息管理',
        path: 'user',
        component: UserList,
        children: [
          {
            name: '人员信息列表',
            path: 'list',
            component: UserList
          },
          // {
          //   name: '人员信息列表',
          //   path: 'list',
          //   component: import('@/pages/user')
          // }
        ]
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
