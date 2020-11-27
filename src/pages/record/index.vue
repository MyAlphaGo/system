<template>
  <div>
    <TableLayout>
      <template v-slot:header>
        <div class="flexc filter">
          <div class="flexc">
            <Search title="搜索文件" v-bind:search="getDataList" />
          </div>
          <Auth v-bind:allowRole="auth"
            ><a-button v-on:click="addData">添加文件</a-button></Auth
          >
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
          <div class="flexc">
            <Auth>
              <a-button type="link" v-on:click="delData({ id: record.id })"
                >删除</a-button
              ></Auth
            >
            <a-button
              @click="pushApprove(record)"
              type="link"
              v-if="!record.path"
              >提交审批</a-button
            >
          </div>
        </template>
        <template slot="path" slot-scope="text, record">
          <div class="flexc">
            <a
              target="_blank"
              v-bind:href="`${baseURL}${record.path}`"
              :download="record.fileName"
              v-if="record.path"
              >{{ text }}</a
            >
            <span v-else>{{ text }}</span>
          </div>
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
import Auth from "@/components/auth";
import Search from "@/components/search";
import { FileService as DataService } from "@/api";
import { message } from "ant-design-vue";
import { baseURL, fileAuth } from "@/consts";
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
      baseURL: baseURL.slice(0, baseURL.length - 1),
      auth: fileAuth,
      cols: [
        {
          title: "#",
          dataIndex: "id",
        },
        {
          title: "文件名",
          dataIndex: "fileName",
          scopedSlots: { customRender: "path" },
        },
        {
          title: "上传时间",
          dataIndex: "createTime",
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
      params = { ...params, page: params?.page || 1, limit: 10 };
      this.loading = true;
      DataService.getRecordList(params).then((res) => {
        this.renderData = res.data?.recordsWorkList;
        const pagination = { ...this.pagination };
        pagination.total = res.data?.total;
        this.pagination = pagination;
        this.loading = false;
      });
    },
    pushApprove(file) {
      DataService.createApprove({
        recordsId: file.id,
        file_name: file.fileName,
      }).then((res) => {
        message.success("提交审批成功！");
      });
    },
    addData() {
      this.ModalProps = { visible: true, editData: {} };
    },
    delData(id) {
      DataService.delFile(id).then(() => {
        message.success("删除成功");
        this.getDataList();
      });
    },
    editData(data) {
      this.ModalProps = { visible: true, editData: data };
    },
    getFile(params) {
      DataService.getFile(params);
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
