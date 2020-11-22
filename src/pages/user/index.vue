<template>
  <div>
    <TableLayout>
      <template v-slot:header>
        <div class="flexc filter">
          <div class="flexc">
            <span>查询用户： </span>
            <span
              ><a-input-search placeholder="还没有做"></a-input-search
            ></span>
          </div>
          <a-button v-on:click="addUser">添加用户</a-button>
        </div>
      </template>
      <a-table
        :columns="cols"
        :dataSource="userList"
        :scroll="{ x: 1400, y: 'calc(100vh - 40px)' }"
        :rowKey="(record) => record.user_id"
      >
        <template slot="option" slot-scope="text, record">
          <div class="flexc">
            <a-button type="link" v-on:click="editUser(record)">修改</a-button>
            <a-button type="link" v-on:click="delUser(record.user_id)"
              >删除</a-button
            >
          </div>
        </template>
      </a-table>
    </TableLayout>
    <UserModal
      v-bind:visible="userModalProps.visible"
      v-bind:title="userModalProps.title"
      v-bind:user="userModalProps.user"
      v-bind:onChangeVisible="handleVisible"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import TableLayout from "@/components/table";
import UserModal from "./userModal";
export default {
  name: "userList",
  components: {
    TableLayout,
    UserModal,
  },
  computed: mapState({
    userList: (state) => state.User?.userList,
  }),
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
          title: "操作",
          dataIndex: "option",
          width: 150,
          fixed: "right",
          scopedSlots: { customRender: "option" },
        },
      ],
      userModalProps: {
        visible: false,
        title: "",
        user: {},
      },
    };
  },

  methods: {
    getUserList(params) {
      this.$store.dispatch("User/getUserList");
    },
    addUser() {
      this.userModalProps = { visible: true, title: "创建用户", user: {} };
    },
    delUser(id) {},
    editUser(user) {
      this.userModalProps = { visible: true, title: "编辑用户", user };
    },
    handleVisible(visible) {
      this.createVisible = visible;
    },
  },
  mounted() {
    this.getUserList(this.params);
  },
  // updated() {
  //   console.log('asdf')
  //   this.getUserList(this.params);
  // },
};
</script>

<style lang="less">
.flexc {
  display: flex;
  align-items: center;
}
.filter {
  width: 100%;
  justify-content: space-between;
}
</style>