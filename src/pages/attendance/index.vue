<template>
  <div>
    <TableLayout>
      <template v-slot:header>
        <div class="flexc filter">
          <div class="flexc">
            <a-date-picker :allowClear="false" v-model="date" @change="changeDate" />
          </div>
          <Auth></Auth>
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
          <div>{{ status[text] }}</div>
        </template>
      </a-table>
    </TableLayout>
  </div>
</template>

<script>
import TableLayout from "@/components/table";
import Search from "@/components/search";
import Auth from "@/components/auth";
import { UserService as DataService } from "@/api";
import { message } from "ant-design-vue";
import moment from "moment";
export default {
  name: "Train",
  components: {
    TableLayout,
    Search,
    Auth,
  },
  data() {
    return {
      status: ["", "正常", "迟到", "未签到", "补卡"],
      date: new moment().format("YYYY-MM-DD"),
      cols: [
        {
          title: "用户名",
          dataIndex: "userName",
        },
        {
          title: "打卡时间",
          dataIndex: "created",
        },
        {
          title: "打卡状态",
          dataIndex: "checkingStatus",
          scopedSlots: { customRender: "option" },
        },
      ],
      pagination: {},
      renderData: [],
      loading: false,
    };
  },

  methods: {
    getDataList(params) {
      this.loading = true;
      params = { checkingDay: this.date, ...params };
      DataService.signInList(params).then((res) => {
        this.renderData = res.data?.checkingIns.map(item =>({...item,created:moment(item.created*1000).format("YYYY-MM-DD")}));
        const pagination = { ...this.pagination };
        pagination.total = res.data?.total;
        this.pagination = pagination;
        this.loading = false;
      });
    },
    changeDate(e) {
      this.date = e.format("YYYY-MM-DD");
      this.getDataList({ checkingDay: e.format("YYYY-MM-DD"), page: 1 });
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
    handleTableChange(pagination) {
      this.getDataList({ page: pagination.current });
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
