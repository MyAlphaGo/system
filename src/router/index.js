import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../components/layout'
import home from '../pages/home'
import login from '../pages/login'

import UserList from '../pages/user'
import TrainList from '../pages/train'
import PositionList from '../pages/rank'
import WelfareList from '../pages/welfare'

import NotFind from '@/components/404'

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
        path: 'people',
        component: UserList,
        children: [
          {
            name: '人员信息列表',
            path: 'info',
            component: UserList
          },
        ]
      },
      {
        name: '培训管理',
        path: 'learn',
        component: TrainList,
        children: [
          {
            name: '培训列表',
            path: 'info',
            component: TrainList
          },
        ]
      },
      {
        name: '职称管理',
        path: 'rank',
        component: PositionList,
        children: [
          {
            name: '职称列表',
            path: 'info',
            component: PositionList
          },
        ]
      },
      {
        name: '社保管理',
        path: 'welfare',
        component: WelfareList,
        children: [
          {
            name: '社保列表',
            path: 'info',
            component: WelfareList
          },
        ]
      },
      {
        path: '*',
        name: 404,
        component: NotFind
      }
    ]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
