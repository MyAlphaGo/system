import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
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
  FormModel,
  Table,
  Modal,
  Radio,
  DatePicker,
  InputNumber,
  Tree,
  Upload,
} from "ant-design-vue";

Vue.use(Button);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Dropdown);
Vue.use(Icon);
Vue.use(Card);
Vue.use(Form);
Vue.use(FormModel);
Vue.use(Input);
Vue.use(Select);
Vue.use(Checkbox);
Vue.use(Table);
Vue.use(Modal);
Vue.use(Radio);
Vue.use(DatePicker);
Vue.use(InputNumber);
Vue.use(Tree);
Vue.use(Upload);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
