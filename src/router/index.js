import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../components/layout";
import home from "../pages/home";
import login from "../pages/login";

import UserList from "../pages/user";
import TrainList from "../pages/train";
import PositionList from "../pages/rank";
import WelfareList from "../pages/welfare";
import Department from "../pages/department";
import FileList from "@/pages/file";
import LogList from "@/pages/log";
import RecordList from '@/pages/record'
import SignIn from '@/pages/attendance'

import NotFind from "@/components/404";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: login
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        name: "主页",
        path: "/",
        component: home
      },
      {
        name: "人员信息管理",
        path: "people",
        component: UserList,
        children: [
          {
            name: "人员信息列表",
            path: "info",
            component: UserList
          }
        ]
      },
      {
        name: "部门信息管理",
        path: "department",
        component: Department,
        children: [
          {
            name: "部门信息树",
            path: "info",
            component: Department
          }
        ]
      },
      {
        name: "培训管理",
        path: "learn",
        component: TrainList,
        children: [
          {
            name: "培训列表",
            path: "info",
            component: TrainList
          }
        ]
      },
      {
        name: "职称管理",
        path: "rank",
        component: PositionList,
        children: [
          {
            name: "职称列表",
            path: "info",
            component: PositionList
          }
        ]
      },
      {
        name: "社保管理",
        path: "welfare",
        component: WelfareList,
        children: [
          {
            name: "社保列表",
            path: "info",
            component: WelfareList
          }
        ]
      },
      {
        name: "文件管理",
        path: "file",
        component: FileList,
        children: [
          {
            name: "文件列表",
            path: "info",
            component: FileList
          }
        ]
      },
      {
        name: "档案管理",
        path: "record",
        component: RecordList,
        children: [
          {
            name: "档案列表",
            path: "info",
            component: RecordList
          }
        ]
      },
      {
        name: "日志管理",
        path: "log",
        component: LogList,
        children: [
          {
            name: "日志列表",
            path: "info",
            component: LogList
          }
        ]
      },
      {
        name: "考勤管理",
        path: "attendance",
        component: SignIn,
        children: [
          {
            name: "考勤列表",
            path: "info",
            component: SignIn
          }
        ]
      },
      {
        path: "*",
        name: 404,
        component: NotFind
      }
    ]
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
