<template>
  <a-table :columns=""> </a-table>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "user",
  computed: mapState({
    userList: (state) => state.User.userList,
  }),
  data() {
    return {
      cols: [
        {
          title: "工号",
          dataIndex: "work_id",
        },
        {
          title: '用户名',
          dataIndex: 'user_name',
        },
        {
          title: '邮箱',
          dataIndex: 'email',
        },
        {
          title: '描述',
          dataIndex: 'description',
        },
        {
          title: '性别',
          dataIndex: 'sex',
        },
        {
          title: '年龄',
          dataIndex: 'age',
        },
        {
          title: '年龄',
          dataIndex: 'age',
        },
        {
          title: '年龄',
          dataIndex: 'age',
        },
        {
          title: '年龄',
          dataIndex: 'age',
        },
        {
          title: '年龄',
          dataIndex: 'age',
        },
        {
          title: '年龄',
          dataIndex: 'age',
        },
        {
          title: '年龄',
          dataIndex: 'age',
        },
      ],
    };
  },
};
</script>

<style>
</style>