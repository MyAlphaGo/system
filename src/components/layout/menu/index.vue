<template>
  <div>
    <div class="logo"><img src="../../../assets/logo.jpg" alt="" /></div>
    <a-menu :selected-keys="currentPage" @select="onSelect">
      <a-menu-item v-bind:key="item.value" v-for="item in menuList">
        <router-link :to="item.value" :name="item.title"
          ><a-icon :type="item.type" />{{ item.title }}</router-link
        >
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
import router from "@/router";
export default {
  name: "Menu",
  data() {
    return {
      currentPage: ["/people/info"],
      menuList: [
        { title: "文件管理", value: "/file", type: "folder" },
        { title: "信息管理", value: "/people/info", type: "user" },
        { title: "档案管理", value: "/people/record", type: "inbox" },
        { title: "培训管理", value: "/learn", type: "book" },
        { title: "职称管理", value: "/rank", type: "contacts" },
        { title: "社保管理", value: "/welfare", type: "pound" },
        { title: "部门管理", value: "/department", type: "team" },
        { title: "考勤管理", value: "/attendance", type: "trademark" },
        { title: "日志管理", value: "/log", type: "history" },
      ],
    };
  },
  methods: {
    onSelect(...args) {
      // console.log(history);
    },
  },
  mounted() {
    const path = router.history?.current?.path;
    this.currentPage = this.menuList.map((item) => item.value).includes(path)
      ? path
      : "/people/info";
  },
};
</script>
<style lang="less">
.logo {
  height: 50px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 75%;
  }
}
</style>