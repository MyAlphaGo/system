<template>
  <a-modal
    :title="title"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    class="user"
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
              initialValue: renderUser.user_name,
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
              initialValue: renderUser.email,
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
              initialValue: renderUser.sex,
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
              initialValue: renderUser.age,
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
              initialValue: renderUser.dept_id,
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
              initialValue: renderUser.position_id,
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
              initialValue: renderUser.city,
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
              initialValue: renderUser.role_id,
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
              initialValue: renderUser.description,
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
    user: Object,
    visible: Boolean,
    onChangeVisible: Function,
    editUser: Object,
    onSuccess: Function,
  },
  data() {
    return {
      roleList: [],
      positionList: [],
      deptList: [],
      // test
      // renderUser: {
      //   user_name: "test",
      //   email: "126133@qq.com",
      //   description: "hhh",
      //   sex: "男",
      //   age: 19,
      //   dept_id: "1",
      //   position_id: "1",
      //   city: "成都",
      //   role_id: 1,
      // },
      renderUser: {},
      title: "创建用户",
    };
  },
  methods: {
    handleUser() {},
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (Object.keys(this.renderUser).length === 0) {
            this.$store.dispatch("User/createUser", { ...values }).then(() => {
              if (this.onSuccess) {
                this.onSuccess();
              }
            });
          } else {
            this.$store
              .dispatch("User/editUser", {
                ...values,
                user_id: this.renderUser?.user_id,
              })
              .then(() => {
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
      this.title = "创建用户";
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
    visible: function (newVal) {
      if (newVal) {
        RoleService.getRoleList().then((res) => {
          this.roleList = res.data || [];
        });
        PositionService.getPositionList().then((res) => {
          this.positionList = res.data || [];
          const renderUser = { ...this.renderUser };
          res.data.find((item) => {
            if (item.position_name === renderUser.position) {
              renderUser.position_id = item.position_id;
              return true;
            }
          });
          this.renderUser = renderUser;
        });
        DeptService.getDeptList().then((res) => {
          this.deptList = res.data || [];
          const renderUser = { ...this.renderUser };
          res.data.find((item) => {
            if (item.deptName === renderUser.dept) {
              renderUser.dept_id = item.deptId;
            }
          });
          this.renderUser = renderUser;
        });
      }
    },
    user: function (newVal) {
      this.renderUser = newVal;
    },
  },
};
</script>

<style lang="less" scoped>
</style>
<style lang="less">
.user {
  .ant-modal {
    margin-top: -30px;
  }
  .ant-modal-body {
    height: 400px;
    overflow: auto;
  }
}
</style>
