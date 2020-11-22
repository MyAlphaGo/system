import { UserService } from '@/api'
import router from '@/router'
import { message } from 'ant-design-vue'
const state = () => ({
  user: {},
  userList: [],
  total: 0,
})

// getters
const getters = {
}

// actions
const actions = {
  login({ commit, state }, params) {
    UserService.login({
      work_id: params.userName,
      password: params.password
    }).then(res => {
      if (res?.data) {
        message.success("登录成功！")
        router.push('/index')
        UserService.getUserInfo()
      } else {
        message.error('用户名或者密码错误')
      }
    }).then(res => {
      if (res.data) {
        console.log(res.data)
        commit('saveCurrentUser', res.data)
      }
    })

  },
  createUser({ commit }, params) {
    UserService.createUser(params).then(res => {

    })
  },
  getLoginInfo({ commit }, params) {
    UserService.getUserList(params).then(res => {
      const { userList } = res.data
      commit('saveUsers', userList)
    })
  },
  getUserList({ commit }, params) {
    UserService.getUserList(params).then(res => {
      console.log(res)
      const userList = res.data.users || []

      commit('saveUsers', {
        users: userList,
        total: res.data.total
      })
    })
  }
}

// mutations
const mutations = {
  saveCurrentUser(state, user) {
    state.user = user
  },
  saveUsers(state, { users, total }) {
    state.userList = users
    state.total = total
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}