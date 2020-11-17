<template>
  <a-layout  class="container">
    <a-layout-header  class="header bgc">
      <Nav></Nav>
    </a-layout-header>
    <a-layout-content class="content">
      <a-layout>
        <a-layout-sider class="bgc sider" breakpoint="lg" collapsed-width="0">
          <Menu></Menu>
        </a-layout-sider>
        <a-layout-content> <router-view></router-view> </a-layout-content>
      </a-layout>
    </a-layout-content>
  </a-layout>
</template>
<script>
import Menu from "./menu";
import Nav from "./header";
export default {
  name: "Layout",
  components: {
    Menu,
    Nav,
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
