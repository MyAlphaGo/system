<template>
  <a-layout  class="container">
    <a-layout-header  class="header bgc">
      <header-nav></header-nav>
    </a-layout-header>
    <a-layout-content class="content">
      <a-layout>
        <a-layout-sider class="bgc sider" breakpoint="lg" collapsed-width="0">
          <sider-menu></sider-menu>
        </a-layout-sider>
        <a-layout-content> Content </a-layout-content>
      </a-layout>
    </a-layout-content>
  </a-layout>
</template>
<script>
import menu from "./menu";
import nav from "./header";
export default {
  name: "Layout",
  components: {
    siderMenu: menu,
    headerNav: nav,
  },
};
</script>
<style lang="less">
.container {
  height: 100vh;
  display: flex;
  .header {
    height: 50px;
    border-bottom: 1px solid #eaecef;
  }
  .content {
    flex: 1;
    background-color: skyblue;
    .ant-layout {
      height: 100%;
    }
    .sider {
      border-right: 1px solid #eaecef;
    }
  }
  .bgc {
    background-color: #fff;
  }
}
</style>
