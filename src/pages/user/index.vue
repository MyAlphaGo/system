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
          <Auth><a-button v-on:click="addUser">添加用户</a-button></Auth>
        </div>
      </template>

      <a-table
        :columns="cols"
        :dataSource="userList"
        :scroll="{ x: 1400, y: 'calc(100vh - 270px)' }"
        :rowKey="(record) => record.user_id"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template slot="option" slot-scope="text, record">
          <Auth>
            <div class="flexc">
              <a-button type="link" v-on:click="editUser(record)"
                >修改</a-button
              >
              <a-button type="link" v-on:click="delUser(record.user_id)"
                >删除</a-button
              >
            </div>
          </Auth>
        </template>
      </a-table>
    </TableLayout>
    <UserModal
      v-bind:visible="userModalProps.visible"
      v-bind:user="userModalProps.user"
      v-bind:onChangeVisible="handleVisible"
      v-bind:onSuccess="getUserList"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import TableLayout from "@/components/table";
import UserModal from "./userModal";
import Auth from "@/components/auth";
export default {
  name: "userList",
  components: {
    TableLayout,
    UserModal,
    Auth,
  },
  computed: mapState({
    userList: (state) => state.User.userList,
    total: (state) => state.User.total,
    loading: (state) => state.User.loading,
    user: (state) => state.User.user,
  }),
  data() {
    return {
      params: {
        search: "",
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
        user: {},
      },
      pagination: {},
      renderData: [],
    };
  },

  methods: {
    getUserList(params) {
      this.$store.dispatch("User/getUserList", params).then(() => {
        const pagination = { ...this.pagination };
        pagination.total = this.total;
        this.pagination = pagination;
      });
    },
    addUser() {
      this.userModalProps = { visible: true, user: {} };
    },
    delUser(id) {
      this.$store.dispatch("User/delUser", { user_id: id }).then(() => {
        this.getUserList();
      });
    },
    editUser(user) {
      this.userModalProps = { visible: true, user: user };
    },
    handleTableChange(pagination, filters, sorter) {
      this.getUserList({ page: pagination.current });
    },
    handleVisible(visible) {
      this.userModalProps = { visible, user: {} };
    },
  },
  mounted() {
    this.getUserList();
  },
  // updated() {
  //   this.getUserList(this.params);
  // },
  // watch: {
  //   user: function (newval, old) {
  //     if (auth(newval)) {
  //       console.log(newval);
  //       this.cols = this.cols.slice(0, this.cols.length - 1);
  //     }
  //   },
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
// .ant-table-content {
//   height: calc(100vh - 270px);
//   overflow-y: au;
// }
</style>
<style lang="less" scoped>
</style>