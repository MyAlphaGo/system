<template>
  <div>
    <TableLayout>
      <template v-slot:header>
        <div class="flexc filter">
          <div class="flexc">
            <Search title="查询职位" v-bind:search="getDataList" />
          </div>
          <Auth><a-button v-on:click="addData">添加职位</a-button></Auth>
        </div>
      </template>

      <a-table
        :columns="cols"
        :dataSource="renderData"
        :scroll="{ y: 'calc(100vh - 270px)' }"
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
              <a-button type="link" v-on:click="delData({ id: record.id })"
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
import TableLayout from "@/components/table";
import Modal from "./Modal";
import Search from "@/components/search";
import Auth from "@/components/auth";
import { PositionService as DataService } from "@/api";
import { message } from "ant-design-vue";
export default {
  name: "Train",
  components: {
    TableLayout,
    Modal,
    Auth,
    Search,
  },
  data() {
    return {
      cols: [
        {
          title: "职位编号",
          dataIndex: "id",
        },
        {
          title: "职位名称",
          dataIndex: "position_name",
        },
        {
          title: "操作",
          dataIndex: "option",
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
      DataService.getPositionList(params).then((res) => {
        this.renderData = res.data;
        const pagination = { ...this.pagination };
        pagination.total = res.data?.length;
        this.pagination = pagination;
        this.loading = false;
      });
    },
    addData() {
      this.ModalProps = { visible: true, editData: {} };
    },
    delData(id) {
      DataService.delPosition(id).then(() => {
        message.success("删除成功");
        this.getDataList();
      });
    },
    editData(data) {
      this.ModalProps = { visible: true, editData: data };
    },
    handleTableChange(pagination) {
      this.getDataList({ page: pagination.current });
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
<style lang="less" scoped></style>
