import { UserService } from '@/api'
const state = () => ({
  user: {},
  userList: []
})

// getters
const getters = {
  cartProducts: (state, getters, rootState) => {
    console.log(state, getters, rootState)
    // return state.items.map(({ id, quantity }) => {
    //   const product = rootState.products.all.find(product => product.id === id)
    //   return {
    //     title: product.title,
    //     price: product.price,
    //     quantity
    //   }
    // })
  },

  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  }
}

// actions
const actions = {
  login({ commit, state }, params) {
    UserService.login(params).then(res => {
      console.log(1111)
    })
    commit('saveCurrentUser', params)
  },
  createUser({ commit }, params) {
    UserService.createUser(params).then(res => {

    })
  },
  getLoginInfo({ commit }, params) {
    UserService.getUserList(params).then(res => {
      const { userList } = res.data
      commit('saveUsers',userList)
    })
  }
}

// mutations
const mutations = {
  saveCurrentUser(state, user) {

  },
  saveUsers(state, users) {
    state.userList = users
  }
  // pushProductToCart(state, { id }) {
  //   state.items.push({
  //     id,
  //     quantity: 1
  //   })
  // },

  // incrementItemQuantity(state, { id }) {
  //   const cartItem = state.items.find(item => item.id === id)
  //   cartItem.quantity++
  // },

  // setCartItems(state, { items }) {
  //   state.items = items
  // },

  // setCheckoutStatus(state, status) {
  //   state.checkoutStatus = status
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}