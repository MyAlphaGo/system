<template>
  <a-modal
    :title="title"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      :form="form"
      class="form"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 19 }"
    >
      <a-form-item label="培训名称">
        <a-input
          v-decorator="[
            'train_name',
            {
              rules: [{ required: true, message: '请输入培训名称！' }],
              initialValue: renderData.train_name
            }
          ]"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="主题">
        <a-input
          v-decorator="[
            'topic',
            {
              rules: [{ required: true, message: '请输入主题！' }],
              initialValue: renderData.topic
            }
          ]"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="分享人">
        <a-select
          v-decorator="[
            'speaker',
            {
              rules: [{ required: true }],
              initialValue: renderData.speaker || user.user_id
            }
          ]"
        >
          <a-select-option
            v-for="item in userList"
            :key="item.user_id"
            :value="item.user_id"
          >
            {{ item.user_name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="分享时间">
        <a-date-picker
          v-bind:style="{ width: '100%' }"
          v-decorator="[
            'show_time',
            {
              initialValue: renderData.show_time
            }
          ]"
        />
      </a-form-item>
      <!-- <a-form-item label="参与人">
        <a-select
          v-decorator="[
            'user_ids',
            {
              rules: [{ required: true, message: '请选择参与人！' }],
              initialValue: renderData.user_ids,
            },
          ]"
          mode="multiple"
          allowClear
        >
          <a-select-option
            v-for="item in userList"
            :key="item.user_id"
            :value="item.user_id"
          >
            {{ item.user_name }}
          </a-select-option>
        </a-select>
      </a-form-item> -->
      <a-form-item label="描述">
        <a-textarea
          v-decorator="[
            'description',
            {
              rules: [{ max: 255, message: '不得超过255字' }],
              initialValue: renderData.description
            }
          ]"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        >
        </a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { UserService, TrainService as DataService } from "@/api";
import { mapState } from "vuex";
import moment from "moment";
export default {
  props: {
    editData: Object,
    visible: Boolean,
    onChangeVisible: Function,
    onSuccess: Function
  },
  computed: mapState({
    user: state => state.User.user
  }),
  data() {
    return {
      userList: [],
      renderData: {},
      title: "创建培训"
    };
  },
  methods: {
    handleUser() {},
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (Object.keys(this.editData).length === 0) {
            DataService.createTrain(values).then(() => {
              if (this.onSuccess) {
                this.onSuccess();
              }
            });
          } else {
            DataService.editTrain({ ...values, id: this.renderData?.id }).then(
              () => {
                if (this.onSuccess) {
                  this.onSuccess();
                }
              }
            );
          }
          this.clearState();
          this.onChangeVisible(false);
        }
      });
    },
    handleCancel() {
      this.clearState();
      this.onChangeVisible(false);
    },
    clearState() {
      this.renderUser = {};
      this.title = "创建培训";
      this.roleList = [];
      this.positionList = [];
      this.deptList = [];
      this.form.resetFields();
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "form" });
  },
  watch: {
    visible: function(newVal) {
      if (newVal) {
        UserService.getUserList().then(res => {
          this.userList = res.data?.users || [];
        });
      }
    },
    editData: function(newVal) {
      if (Object.keys(newVal).length !== 0) {
        this.title = "修改培训";
      }
      this.renderData = { ...newVal, show_time: new moment(newVal) };
    }
  }
};
</script>

<style lang="less" scoped></style>
<style lang="less">
.ant-modal-body {
  height: 400px;
  overflow: auto;
}
</style>
