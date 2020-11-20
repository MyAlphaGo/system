<template>
  <div class="container">
    <div>
      <a-dropdown>
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            <a-icon type="user" />1st menu item
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="user" />2nd menu item
          </a-menu-item>
          <a-menu-item key="3"> <a-icon type="user" />3rd item </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          {{ "name" }} <a-icon type="user" />
        </a-button>
      </a-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  name: "Nav",
  data() {
    return {};
  },
  methods: {
    handleMenuClick(...args) {
      console.log(args);
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