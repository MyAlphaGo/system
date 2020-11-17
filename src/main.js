import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Layout, Menu,Dropdown,Icon } from 'ant-design-vue';

Vue.use(Button)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Dropdown)
Vue.use(Icon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')