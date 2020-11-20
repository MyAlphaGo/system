<template>
  <a-form :form="form" class="form">
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
        <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          {
            rules: [{ required: true, message: '请输入邮箱！' }],
            initialValue: user.pwd,
          },
        ]"
        type="password"
        placeholder="密码"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-checkbox
        v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: false,
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
</template>

<script>
export default {};
</script>

<style>
</style>