<template>
  <div>
    <TableLayout>
      <template v-slot:header>
        <div class="flexc filter">
          <div class="flexc">
            <Search title="查询日志信息" v-bind:search="getDataList" />
          </div>
          <Auth></Auth>
        </div>
      </template>

      <a-table
        :columns="cols"
        :dataSource="renderData"
        :scroll="{ y: 'calc(100vh - 270px)' }"
        :rowKey="record => record.id"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
      >
      </a-table>
    </TableLayout>
  </div>
</template>

<script>
import TableLayout from "@/components/table";
import Search from "@/components/search";
import Auth from "@/components/auth";
import { LogService as DataService } from "@/api";
import { message } from "ant-design-vue";
export default {
  name: "Train",
  components: {
    TableLayout,
    Search,
    Auth
  },
  data() {
    return {
      cols: [
        {
          title: "操作者",
          dataIndex: "create_by"
        },
        {
          title: "操作类型",
          dataIndex: "what_do"
        },
        {
          title: "操作时间",
          dataIndex: "created"
        }
      ],
      ModalProps: {
        visible: false,
        editData: {}
      },
      pagination: {},
      renderData: [],
      loading: false
    };
  },

  methods: {
    getDataList(params) {
      this.loading = true;
      DataService.getDataList(params).then(res => {
        this.renderData = res.data?.logs;
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
      DataService.delSocial(id).then(() => {
        message.success("删除成功");
        this.getDataList();
      });
    },
    editData(data) {
      this.ModalProps = { visible: true, editData: data };
    },
    handleTableChange(pagination) {
      this.getDataList({ page: pagination.current });
    }
  },
  mounted() {
    this.getDataList();
  }
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
