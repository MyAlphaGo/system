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
      <a-form-item label="审批状态">
        <a-radio-group
          v-decorator="[
            'status',
            {
              initialValue: '审批通过',
            },
          ]"
        >
          <a-radio value="审批通过">审批通过</a-radio>
          <a-radio value="审批不通过">审批不通过</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="描述">
        <a-textarea
          v-decorator="[
            'desc',
            {
              rules: [{ max: 255, message: '不得超过255字' }],
            },
          ]"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        >
        </a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { FileService as DataService, UserService } from "@/api";
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
      title: "添加部门",
    };
  },
  methods: {
    handleUser() {},
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.id = this.editData.id;
          DataService.opApprove(values).then(() => {
            if (this.onSuccess) {
              this.onSuccess();
              this.clearState();
              this.onChangeVisible(false);
            }
          });
        }
      });
    },
    handleCancel() {
      this.clearState();
      this.onChangeVisible(false);
    },
    clearState() {
      this.renderUser = {};
      this.title = "添加部门";
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
    visible: function (val) {
      if (val) {
        UserService.getUserList().then((res) => {
          this.userList = res.data?.users || [];
        });
      }
    },
    editData: function (newVal) {
      if (Object.keys(newVal).length !== 0) {
        this.title = "编辑部门";
        this.renderData = {
          ...newVal,
        };
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
<style lang="less"></style>
