<template>
  <div class="container">
    <div>
      <a-dropdown>
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="info"> <a-icon type="user" />个人信息 </a-menu-item>
          <a-menu-item key="signOut">
            <a-icon type="user" />退出登录
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          {{ user.user_name }} <a-icon type="user" />
        </a-button>
      </a-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import router from '@/router'

export default {
  name: "Nav",
  data() {
    return {};
  },
  computed: mapState({
    user: (state) => state.User.user,
  }),
  beforeCreate(){
    this.$store.dispatch('User/getLoginInfo')
  },
  methods: {
    handleMenuClick(e) {
      if(e.key === 'signOut'){
        router.push('/login')
      }
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  justify-content: flex-end;
  height: 100%;
  line-height: 50px;
}
</style>
<style lang="less">
</style>