<template>
  <div>
    sdfsadf
      <a-table :columns="cols" :dataSource="userList"> </a-table>
  </div>

</template>

<script>
import { mapState } from "vuex";
export default {
  name: "userList",
  computed: mapState({
    userList: (state) => state.User.userList,
  }),
  // created() {
  //   console.log('?????')
  //   this.$store.dispatch("user/getUserList", params);
  // },
  data() {
    return {
      params: {
        search: "",
        dept_id: "",
        page: 1,
        limit: 10,
      },
      cols: [
        {
          title: "工号",
          dataIndex: "work_id",
        },
        {
          title: "用户名",
          dataIndex: "user_name",
        },
        {
          title: "邮箱",
          dataIndex: "email",
        },
        {
          title: "描述",
          dataIndex: "description",
        },
        {
          title: "性别",
          dataIndex: "sex",
        },
        {
          title: "年龄",
          dataIndex: "age",
        },
        {
          title: "部门名称",
          dataIndex: "dept",
        },
        {
          title: "职位",
          dataIndex: "position",
        },
        {
          title: "城市",
          dataIndex: "city",
        },
        {
          title: "入职时间",
          dataIndex: "join_time",
        },
        {
          title: "角色名称",
          dataIndex: "role_name",
        },
        {
          title: "数据权限",
          dataIndex: "dat_access",
        },
      ],
    };
  },
  
  methods: {
    getUserList(params) {
      this.$store.dispatch('User/getUserList', params);
    },
  },
  mounted(){
    this.getUserList(this.params)
  },
  // updated() {
  //   console.log('asdf')
  //   this.getUserList(this.params);
  // },
};
</script>

<style>
</style>