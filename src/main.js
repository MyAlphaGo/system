import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
   Button, 
  Layout, 
  Menu, 
  Dropdown, 
  Icon, 
  Card,
  Form,
  Input,
  Select,
  Checkbox,
} from 'ant-design-vue';

Vue.use(Button)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Dropdown)
Vue.use(Icon)
Vue.use(Card)
Vue.use(Form)
Vue.use(Input)
Vue.use(Select)
Vue.use(Checkbox)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
