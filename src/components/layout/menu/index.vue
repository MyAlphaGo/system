<template>
  <a-menu>
    <a-menu-item v-bind:key="item.value" v-for="item in menuList">{{
      item.title
    }}</a-menu-item>
  </a-menu>
</template>
<script>
export default {
  name: "Menu",
  data() {
    return {
      menuList: [
        { title: "文件管理", value: "/file" },
        { title: "人员信息管理", value: "/people/info" },
        { title: "人员档案管理", value: "/people/record" },
        { title: "培训管理", value: "/learn" },
        { title: "职称管理", value: "/rank" },
        { title: "社保管理", value: "/welfare" },
        { title: "部门管理", value: "/department" },
        { title: "考勤管理", value: "/attendance" },
        { title: "日志管理", value: "/log" },
      ],
    };
  },
};
</script>