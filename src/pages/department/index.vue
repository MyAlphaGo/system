<template>
  <div>
    <TableLayout>
      <template v-slot:header>
        <div class="flexc filter">
          <div class="flexc"></div>
          <!-- <Auth><a-button v-on:click="addUser">添加用户</a-button></Auth> -->
        </div>
      </template>

      <a-table
        :columns="cols"
        :dataSource="renderData"
        :scroll="{ x: 1400, y: 'calc(100vh - 270px)' }"
        :rowKey="(record) => record.user_id"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <!-- <template slot="option" slot-scope="text, record">
          <Auth>
            <div class="flexc">
              <a-button type="link" v-on:click="editTrain(record)"
                >修改</a-button
              >
              <a-button type="link" v-on:click="delTrain(record.user_id)"
                >删除</a-button
              >
            </div>
          </Auth>
        </template> -->
      </a-table>
    </TableLayout>
    <!-- <UserModal
      v-bind:visible="userModalProps.visible"
      v-bind:user="userModalProps.user"
      v-bind:onChangeVisible="handleVisible"
      v-bind:onSuccess="getUserList"
    /> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import TableLayout from "@/components/table";
import UserModal from "./userModal";
import Auth from "@/components/auth";
import { TrainService } from "@/api";
export default {
  name: "Train",
  components: {
    TableLayout,
    UserModal,
    Auth,
  },
  data() {
    return {
      cols: [
        {
          title: "培训名称",
          dataIndex: "train_name",
        },
        {
          title: "主题",
          dataIndex: "topic",
        },
        {
          title: "分享人",
          dataIndex: "speaker",
        },
        {
          title: "分享时间",
          dataIndex: "show_time",
        },
        {
          title: "描述",
          dataIndex: "description",
        },
        // {
        //   title: "年龄",
        //   dataIndex: "age",
        // },
        {
          title: "操作",
          dataIndex: "option",
          width: 150,
          fixed: "right",
          scopedSlots: { customRender: "option" },
        },
      ],
      ModalProps: {
        visible: false,
        user: {},
      },
      pagination: {},
      renderData: [],
      loading: false
    };
  },

  methods: {
    getDataList(params) {
      this.loading = true
      TrainService.getTrainList(params).then(res => {
        this.renderData = res.data?.trains
        this.loading = false
        const pagination = { ...this.pagination };
        pagination.total = res.data?.length;
        this.pagination = pagination;
      })
    },
    // addUser() {
    //   this.userModalProps = { visible: true, user: {} };
    // },
    // delTrain(id) {
    //   this.$store.dispatch("User/delUser", { user_id: id }).then(() => {
    //     this.getUserList();
    //   });
    // },
    // editTrain(user) {
    //   this.userModalProps = { visible: true, train: train };
    // },
    handleTableChange(pagination, filters, sorter) {
      this.getUserList({ page: pagination.current });
    },
    // handleVisible(visible) {
    //   this.userModalProps = { visible, user: {} };
    // },
  },
  mounted() {
    this.getDataList();
  },
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