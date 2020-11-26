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
      <a-form-item label="职称名称">
        <a-input
          v-decorator="[
            'position_name',
            {
              rules: [{ required: true, message: '请输入职称名称！' }],
              initialValue: renderData.position_name
            }
          ]"
        >
        </a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { PositionService as DataService } from "@/api";
export default {
  props: {
    editData: Object,
    visible: Boolean,
    onChangeVisible: Function,
    onSuccess: Function
  },
  data() {
    return {
      userList: [],
      renderData: {},
      title: "创建职称"
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
      this.title = "创建职称";
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
        this.title = "修改职称";
      }
      this.renderData = newVal;
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
