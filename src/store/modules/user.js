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
        commit('saveUserToLoc',{
          userName: params.userName,
          password: params.password,
          remember: params.remember,
        })
      } else {
        commit('saveUserToLoc',{
          userName: params.userName,
          password: '',
          remember: false,
        })
        message.error('用户名或者密码错误')
        router.push('/login')
      }
    })
  },
  beforeLogin({ commit }, cb) {
    commit('getUserForLoc',cb)
  },
  createUser({ commit }, params) {
    UserService.createUser(params).then(res => {

    })
  },
  getLoginInfo({ commit }, params) {
    UserService.getUserInfo(params).then(res => {
      const user = res?.data
      commit('saveCurrentUser', user)
    })
  },
  getUserList({ commit }, params) {
    UserService.getUserList(params).then(res => {
      console.log(res)
      const userList = res.data?.users || []

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
  },
  saveUserToLoc(_, loginInfo) {
    localStorage.setItem('userName', loginInfo.userName)
    if(loginInfo.remember) {
      localStorage.setItem('password', loginInfo.password)
      localStorage.setItem('remember',true)
    }
  },
  getUserForLoc(_, cb) {
    cb({
      userName: localStorage.getItem('userName'),
      password: localStorage.getItem('password'),
      remember: localStorage.getItem('remember'),
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}