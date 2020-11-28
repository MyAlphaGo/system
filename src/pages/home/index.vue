<template>
  <div class="homeContainer">
    <div class="homeHeader">
      <div class="title">
        欢迎回来，{{ user.user_name }}
        <div class="subTitle">
          今天是2020年11月26日 星期四，欢迎您使用{{ systemName }}
        </div>
      </div>
      <div class="extra">
        <div v-if="currentStatus === status.signIned">
          <span class="signIned">今日已成功签到，真棒！</span>
        </div>

        <a-button v-else-if="currentStatus === status.notSignIn" @click="signIn"
          >签到</a-button
        >
        <span class="lated" v-else-if="currentStatus === status.lated"
          >今天迟到了哦，明天早点到哦
        </span>
        <span class="lated" v-else-if="currentStatus === status.temp"
          >今天迟到了哦，明天早点到哦
          <a-button @click="signIn">补卡</a-button>
        </span>
      </div>
    </div>
    <div class="homeContent">
      <a-card :bordered="false" title="审批列表">
        <a-table
          :columns="cols"
          :dataSource="renderData"
          :scroll="{ y: 'calc(100vh - 270px)' }"
          :rowKey="(record) => record.id"
          :loading="loading"
          :pagination="pagination"
        >
          <template slot="option" slot-scope="text, record">
            <div v-if="approvesFlag">
              <div v-if="text !== 1">{{ approvesStatus[text] }}</div>
              <a-button v-else type="link" @click="pushApprove(record)">审批</a-button>
            </div>
            <div v-else>
              {{ approvesStatus[text] }}
            </div>
          </template>
        </a-table>
      </a-card>
    </div>
    <Modal
      v-bind:visible="ModalProps.visible"
      v-bind:editData="ModalProps.editData"
      v-bind:onChangeVisible="handleVisible"
      v-bind:onSuccess="getDataList"
    />
  </div>
</template>
<script>
import { TITLE, apporveAuth } from "@/consts";
import { mapState } from "vuex";
import { FileService, UserService } from "@/api";
import Modal from "./Modal";
export default {
  name: "Home",
  computed: mapState({
    user: (state) => state.User.user,
  }),
  components: {
    Modal,
  },
  data() {
    return {
      systemName: TITLE,
      apporveAuth: apporveAuth,
      approvesFlag: false,
      approvesStatus: ["通过", "审批中", "审批不通过"],
      status: {
        signIned: 1,
        lated: 2,
        notSignIn: 3,
        temp: 4,
      },

      currentStatus: 3,

      renderData: [
        {
          id: 1,
          recordsId: 1,
          submitter: 1,
          created: 1,
          currentUser: 1,
          status: 0,
        },
      ],
      pagination: {},
      loading: false,
      ModalProps: {
        visible: false,
        editData: {},
      },
      cols: [
        {
          title: "提交者",
          dataIndex: "submitter",
        },
        {
          title: "提交时间",
          dataIndex: "created",
        },
        {
          title: "当前审批人",
          dataIndex: "currentUser",
        },
        {
          title: "审批状态",
          dataIndex: "status",
          scopedSlots: { customRender: "option" },
        },
      ],
    };
  },
  methods: {
    checkSignIn(signInState) {
      this.currentStatus = signInState;
    },
    signIn() {
      UserService.signIn().then((res) => {
        if (res.data) {
          this.checkSignIn(status.signIned);
        }
      });
    },
    getDataList(params = {}) {
      FileService.getCurrentUserApprove(params).then((res) => {
        this.renderData = res.data?.approves;
        const pagination = { ...this.pagination };
        pagination.total = res.data?.total;
        this.pagination = pagination;
        this.loading = false;
      });
    },
    handleVisible(v) {
      this.ModalProps = { visible: v,editData:{} };
    },
    pushApprove(file) {
      this.ModalProps = { visible: true, editData: file };
    },
  },
  mounted(){
    this.checkSignIn(this.user.checking_status);
      this.approvesFlag = this.apporveAuth.includes(this.user.role_id);
  },
  watch: {
    user: function (val) {
      this.checkSignIn(val.checking_status);
      this.approvesFlag = this.apporveAuth.includes(val.role_id);
    },
  },
  created() {
    this.getDataList();
  },
};
</script>
<style lang="less" scoped>
.homeContainer {
  .homeHeader {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    // background-color: #efefef;
    .title {
      text-align: left;
      font-size: 26px;
      font-weight: 700;
      color: #1890ff;
      .subTitle {
        font-size: 14px;
        font-weight: 400;
        color: #656565;
      }
    }
    .extra {
      line-height: 65px;
      .signIned {
        color: #1890ff;
        font-weight: 700;
      }
      .lated {
        color: #fa8c16;
      }
    }
  }
  .homeContent {
    // padding: 0 20px 20px;
  }
}
</style>
<style lang="less">
.homeContent {
  .ant-card-head-title {
    display: flex;
  }
}
</style>
