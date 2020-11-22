<template>
  <div class="container">
    <div class="warpper">
      <div class="title">
        {{ title }}
      </div>
      <div class="login_box">
        <div>
          <h2>用户登录</h2>
        </div>
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
        >
          <a-form-item>
            <a-input
              v-decorator="[
                'userName',
                {
                  rules: [{ required: true, message: '请输入用户名！' }],
                  initialValue: user.name,
                },
              ]"
              placeholder="用户名"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [{ required: true, message: '请输入密码！' }],
                  initialValue: user.pwd,
                },
              ]"
              type="password"
              placeholder="密码"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-checkbox
              v-decorator="[
                'remember',
                {
                  valuePropName: 'checked',
                  initialValue: true,
                },
              ]"
            >
              记住密码
            </a-checkbox>
            <a class="login-form-forgot" href=""> 忘记密码 </a>
            <a-button type="primary" @click="login" class="login-form-button">
              登录
            </a-button>
            <a href=""> 注册用户 </a>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
import { TITLE } from "@/consts";
export default {
  name: "Login",
  data() {
    return {
      title: TITLE,
      user: {
        name: "",
        pwd: "",
      },
    };
  },
  methods: {
    login() {
      //登录
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch("User/login", {
            userName: values.userName,
            password: values.password,
            remember: values.remember
          });
          this.form.resetFields(['password']);
        }
      });
    },
    beforeLogin({ userName, password, remember }) {
      this.user.name = userName;
      this.user.pwd = password;
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  beforeMount() {
    this.$store.dispatch("User/beforeLogin", this.beforeLogin);
  },
};
</script>

<style lang="less" scoped>
.container {
  background-image: url("../../assets/loginbg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .title {
    font-size: 20px;
    font-weight: 600;
    color: #fff;
  }
  .login_box {
    width: 350px;
    padding: 20px;
    margin-top: 25px;
    border: 1px solid #eee;
    background-color: #fff;
  }
}
</style>
<style lang="less">
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .ant-checkbox-wrapper {
  float: left;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.ant-form-item {
  margin-bottom: 15px;
}
</style>