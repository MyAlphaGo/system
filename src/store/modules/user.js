import { UserService } from "@/api";
import router from "@/router";
import { message } from "ant-design-vue";
const state = () => ({
  user: {}, // 当前登录用户
  userList: [], // 用户列表
  total: 0,
  loading: true
});

// getters
const getters = {};

// actions
const actions = {
  login({ commit }, params) {
    UserService.login({
      work_id: params.userName,
      password: params.password
    }).then(res => {
      if (res?.data) {
        message.success("登录成功！");
        router.push("/index");
        commit("saveUserToLoc", {
          userName: params.userName,
          password: params.password,
          remember: params.remember
        });
      } else {
        commit("saveUserToLoc", {
          userName: params.userName,
          password: "",
          remember: false
        });
        message.error("用户名或者密码错误");
        router.push("/login");
      }
    });
  },
  beforeLogin({ commit }, cb) {
    commit("getUserForLoc", cb);
  },
  async createUser(_, params) {
    await UserService.createUser(params);
    message.success("创建成功！");
  },
  async editUser(_, params) {
    const { code } = await UserService.editUser(params);
    if (code === 0) {
      message.success("编辑成功！");
    } else {
      message.error("修改出错！");
    }
  },
  async delUser(_, params) {
    await UserService.delUser(params);
    message.success("删除成功！");
  },
  async getLoginInfo({ commit }, params) {
    UserService.getUserInfo(params).then(res => {
      const user = res?.data;
      commit("saveCurrentUser", user);
    });
  },
  async getUserList({ commit }, params) {
    commit("changeLoading", true);
    await UserService.getUserList(params).then(res => {
      const userList = res.data?.users || [];
      commit("saveUsers", {
        users: userList,
        total: res.data?.total
      });
      commit("changeLoading", false);
    });
  }
};

// mutations
const mutations = {
  saveCurrentUser(state, user) {
    state.user = user;
  },
  changeLoading(state, params) {
    state.loading = params;
  },
  saveUsers(state, { users, total }) {
    state.userList = users;
    state.total = total;
  },
  saveUserToLoc(_, loginInfo) {
    localStorage.setItem("userName", loginInfo.userName);
    if (loginInfo.remember) {
      localStorage.setItem("password", loginInfo.password);
      localStorage.setItem("remember", true);
    }
  },
  getUserForLoc(_, cb) {
    cb({
      userName: localStorage.getItem("userName"),
      password: localStorage.getItem("password"),
      remember: localStorage.getItem("remember")
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
