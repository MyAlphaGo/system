<template>
  <div>
    <TableLayout>
      <template v-slot:header>
        <div class="flexc filter">
          <div class="flexc"></div>
          <Auth><a-button v-on:click="addData">添加培训</a-button></Auth>
        </div>
      </template>

      <a-table
        :columns="cols"
        :dataSource="renderData"
        :scroll="{ x: 1400, y: 'calc(100vh - 270px)' }"
        :rowKey="(record) => record.id"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template slot="option" slot-scope="text, record">
          <Auth>
            <div class="flexc">
              <a-button type="link" v-on:click="editData(record)"
                >修改</a-button
              >
              <a-button type="link" v-on:click="delData({id:record.id})"
                >删除</a-button
              >
            </div>
          </Auth>
        </template>
      </a-table>
    </TableLayout>
    <Modal
      v-bind:visible="ModalProps.visible"
      v-bind:editData="ModalProps.editData"
      v-bind:onChangeVisible="handleVisible"
      v-bind:onSuccess="getDataList"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import TableLayout from "@/components/table";
import Modal from "./Modal";
import Auth from "@/components/auth";
import { TrainService as DataService } from "@/api";
import { message } from "ant-design-vue";
export default {
  name: "Train",
  components: {
    TableLayout,
    Modal,
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
        editData: {},
      },
      pagination: {},
      renderData: [],
      loading: false,
    };
  },

  methods: {
    getDataList(params) {
      this.loading = true;
      DataService.getTrainList({...params, limit: 10}).then((res) => {
        this.renderData = res.data?.trains;
        const pagination = { ...this.pagination };
        pagination.total = res.data?.total;
        this.pagination = pagination;
        this.loading = false;
      });
    },
    addData() {
      this.ModalProps = { visible: true, editData: {} };
    },
    delData(id) {
      DataService.delTrain(id).then(() => {
        message.success("删除成功");
        this.getDataList();
      });
    },
    editData(data) {
      this.ModalProps = { visible: true, editData: data };
    },
    handleTableChange(pagination, filters, sorter) {
      this.getUserList({ page: pagination.current });
    },
    handleVisible(visible) {
      this.ModalProps = { visible, editData: {} };
    },
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