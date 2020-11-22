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
              initialValue: user.user_name,
            },
          ]"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="邮箱">
        <a-input
          v-decorator="[
            'email',
            {
              rules: [{ required: true, message: '请输入邮箱！' }],
              initialValue: user.email,
            },
          ]"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="性别">
        <a-radio-group
          v-decorator="[
            'sex',
            {
              initialValue: user.sex,
            },
          ]"
        >
          <a-radio value="男">男</a-radio>
          <a-radio value="女">女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="年龄">
        <a-input
          v-decorator="[
            'age',
            {
              initialValue: user.age,
            },
          ]"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="部门">
        <a-select
          v-decorator="[
            'dept_id',
            {
              rules: [{ required: true, message: '请选择部门！' }],
              initialValue: user.dept_id,
            },
          ]"
        >
          <a-select-option
            v-for="item in deptList"
            :key="item.deptId"
            :value="item.deptId"
          >
            {{ item.deptName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="职位">
        <a-select
          v-decorator="[
            'position_id',
            {
              rules: [{ required: true, message: '请选择职位！' }],
              initialValue: user.position_id,
            },
          ]"
        >
          <a-select-option
            v-for="item in positionList"
            :key="item.id"
            :value="item.position_id"
          >
            {{ item.position_name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="城市">
        <a-input
          v-decorator="[
            'city',
            {
              rules: [{ required: true, message: '请选择城市！' }],
              initialValue: user.city,
            },
          ]"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="角色">
        <a-select
          v-decorator="[
            'role_id',
            {
              rules: [{ required: true, message: '请选择角色！' }],
              initialValue: user.role_id,
            },
          ]"
        >
          <a-select-option
            v-for="item in roleList"
            :key="item.id"
            :value="item.id"
            >{{ item.role_name }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item label="描述">
        <a-textarea
          v-decorator="[
            'description',
            {
              rules: [{ max: 100, message: '不得超过100字' }],
              initialValue: user.description,
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
import { RoleService, PositionService, DeptService } from "@/api";
export default {
  props: {
    title: String,
    visible: Boolean,
    user: Object,
    onChangeVisible: Function,
    editUser: Object,
    onSuccess: Function,
  },
  data() {
    return {
      roleList: [],
      positionList: [],
      deptList: [],
      userLoc: {
        user_name: "test",
        email: "126133@qq.com",
        description: "hhh",
        sex: "男",
        age: 19,
        dept_id: "1",
        position_id: "1",
        city: "成都",
        role_id: 1,
      },
    };
  },
  methods: {
    handleUser() {},
    handleOk() {
      console.log(this.userf)
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch("User/createUser", { ...values });
          this.onChangeVisible(false);
        }
      });
    },
    handleCancel() {
      this.onChangeVisible(false);
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "form" });
  },
  watch: {
    visible: function (newVal, oldVal) {
      if (newVal) {
        RoleService.getRoleList().then((res) => {
          this.roleList = res.data || [];
        });
        PositionService.getPositionList().then((res) => {
          this.positionList = res.data || [];
        });
        DeptService.getDeptList().then((res) => {
          this.deptList = res.data || [];
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>
<style lang="less">
.ant-modal-body {
  height: 400px;
  overflow: auto;
}
</style>