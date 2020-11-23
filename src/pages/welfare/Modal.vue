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
      <a-form-item label="用户名">
        <a-input
          v-decorator="[
            'user_name',
            {
              rules: [{ required: true, message: '请输入用户名！' }],
              initialValue: renderData.position_name,
            },
          ]"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="缴纳年">
        <a-year-picker
          v-decorator="[
            'surrender_year',
            {
              rules: [{ required: true, message: '请选择缴纳年！' }],
              initialValue: renderData.position_name,
            },
          ]"
        >
        </a-year-picker>
      </a-form-item>
      <a-form-item label="缴纳额">
        <a-input-number
          v-bind:style="{ width: '100%' }"
          v-decorator="[
            'money',
            {
              rules: [{ required: true, message: '请输入缴纳额！' }],
              initialValue: renderData.position_name,
            },
          ]"
        >
        </a-input-number>
      </a-form-item>
      <a-form-item label="缴纳时间">
        <a-date-picker
          v-bind:style="{ width: '100%' }"
          v-decorator="[
            'surrender_time',
            {
              rules: [{ required: true, message: '请选择缴纳时间！' }],
              initialValue: renderData.position_name,
            },
          ]"
        >
        </a-date-picker>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { PositionService as DataService } from "@/api";
import { mapState } from "vuex";
import moment from "moment";
export default {
  props: {
    editData: Object,
    visible: Boolean,
    onChangeVisible: Function,
    onSuccess: Function,
  },
  data() {
    return {
      userList: [],
      renderData: {},
      title: "创建职称",
    };
  },
  methods: {
    handleUser() {},
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (Object.keys(this.editData).length === 0) {
            DataService.createPosition(values).then(() => {
              if (this.onSuccess) {
                this.onSuccess();
              }
            });
          } else {
            DataService.editPosition({
              ...values,
              id: this.renderData?.id,
            }).then(() => {
              if (this.onSuccess) {
                this.onSuccess();
              }
            });
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
      this.title = "创建职称";
      this.roleList = [];
      this.positionList = [];
      this.deptList = [];
      this.form.resetFields();
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "form" });
  },
  watch: {
    visible: function (newVal) {},
    editData: function (newVal) {
      if (Object.keys(newVal).length !== 0) {
        this.title = "修改职称";
      }
      this.renderData = newVal;
    },
  },
};
</script>

<style lang="less" scoped>
</style>
<style lang="less">
.ant-modal-body {
  // height: 400px;
  overflow: auto;
}
</style>