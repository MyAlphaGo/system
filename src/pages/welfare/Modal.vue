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
        <a-select
          v-decorator="[
            'user_id',
            {
              rules: [{ required: true }],
              initialValue: renderData.user_id
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
      <a-form-item label="缴纳年">
        <a-date-picker
          format="YYYY"
          mode="year"
          v-bind:style="{ width: '100%' }"
          @panelChange="panelChange"
          @openChange="openChange"
          :open="open"
          v-decorator="[
            'surrender_year',
            {
              rules: [{ required: true, message: '请选择缴纳年！' }],
              initialValue: renderData.surrender_year
            }
          ]"
        >
        </a-date-picker>
      </a-form-item>
      <a-form-item label="缴纳额">
        <a-input-number
          v-bind:style="{ width: '100%' }"
          v-decorator="[
            'money',
            {
              rules: [{ required: true, message: '请输入缴纳额！' }],
              initialValue: renderData.money
            }
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
              initialValue: renderData.surrender_time
            }
          ]"
        >
        </a-date-picker>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { SocialService as DataService, UserService } from "@/api";
import moment from "moment";
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
      title: "添加社保",
      //特殊处理年份选择
      open: false
    };
  },
  methods: {
    handleUser() {},
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.user_name = this.userList.find(
            user => user.user_id === values.user_id
          ).user_name;
          values.surrender_year = moment(values.surrender_year).format("YYYY");
          values.surrender_time = moment(values.surrender_time).format(
            "YYYY-MM-DD"
          );
          if (Object.keys(this.editData).length === 0) {
            DataService.createSocial(values).then(() => {
              if (this.onSuccess) {
                this.onSuccess();
              }
            });
          } else {
            DataService.editSocial({
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
      this.title = "添加社保";
      this.roleList = [];
      this.positionList = [];
      this.deptList = [];
      this.form.resetFields();
    },
    panelChange(value) {
      this.form.setFields({ surrender_year: { value: value } });
      this.open = false;
    },
    openChange(status) {
      if (status) {
        this.open = true;
      } else {
        this.open = false;
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "form" });
  },
  watch: {
    visible: function(newVal) {
      if (newVal) {
        UserService.getAllUsers().then(res => {
          this.userList = res.data || [];
        });
      }
    },
    editData: function(newVal) {
      if (Object.keys(newVal).length !== 0) {
        this.title = "编辑社保";
        this.renderData = {
          ...newVal,
          surrender_year: moment(newVal.surrender_year),
          surrender_time: moment(newVal.surrender_time)
        };
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
