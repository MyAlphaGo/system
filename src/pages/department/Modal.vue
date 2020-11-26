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
      <a-form-item label="部门名称">
        <a-input
          v-decorator="[
            'deptName',
            {
              rules: [{ required: true }],
              initialValue: renderData.dept_name
            }
          ]"
        >
        </a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { DeptService as DataService } from "@/api";
export default {
  props: {
    editData: Object,
    parent: Number,
    visible: Boolean,
    onChangeVisible: Function,
    onSuccess: Function
  },
  data() {
    return {
      userList: [],
      renderData: {},
      title: "添加部门"
    };
  },
  methods: {
    handleUser() {},
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.parentId = this.parent;
          if (Object.keys(this.editData).length === 0) {
            DataService.createDept(values).then(() => {
              if (this.onSuccess) {
                this.onSuccess();
              }
            });
          } else {
            DataService.editDept({
              ...values,
              id: this.renderData?.id
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
      this.title = "添加部门";
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
    visible: function() {},
    editData: function(newVal) {
      if (Object.keys(newVal).length !== 0) {
        this.title = "编辑部门";
        this.renderData = {
          ...newVal
        };
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
<style lang="less">
.ant-modal-body {
  // height: 400px;
  overflow: auto;
}
</style>
