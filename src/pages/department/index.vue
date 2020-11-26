<template>
  <div>
    <TableLayout>
      <template v-slot:header>
        <div class="flexc filter">
          <div class="flexc"></div>
          <Auth><a-button v-on:click="addData">添加社保</a-button></Auth>
        </div>
      </template>

      <div class="deptContainer">
        <div class="tree">
          <a-tree
            :replace-fields="replaceFields"
            :tree-data="renderData"
            @select="onSelect"
            :defaultExpandAll="true"
            :selected-keys="selectedKeys"
          >
          </a-tree>
        </div>
        <div>
          <a-table
            :columns="cols"
            :dataSource="tableData"
            :scroll="{ y: 'calc(100vh - 270px)' }"
            :rowKey="(record) => record.id"
            :loading="loading"
            :pagination="pagination"
            @change="handleTableChange"
          >
            <template slot="option" slot-scope="text, record">
              <Auth>
                <div class="flexc">
                  <a-button type="link" v-on:click="editData(data)"
                    >修改</a-button
                  >
                  <a-button type="link" v-on:click="delData({ id: record.id })"
                    >删除</a-button
                  >
                </div>
              </Auth>
            </template>
          </a-table>
        </div>
      </div>
    </TableLayout>
    <Modal
      v-bind:visible="ModalProps.visible"
      v-bind:editData="ModalProps.editData"
      v-bind:parent="ModalProps.parent"
      v-bind:onChangeVisible="handleVisible"
      v-bind:onSuccess="getDataList"
    />
  </div>
</template>

<script>
import TableLayout from "@/components/table";
import Modal from "./Modal";
import Auth from "@/components/auth";
import { DeptService as DataService } from "@/api";
import { message } from "ant-design-vue";
export default {
  name: "Train",
  components: {
    TableLayout,
    Modal,
    Auth,
  },
  data() {
    return {
      cols: [
        {
          title: "部门编号",
          dataIndex: "id",
        },
        {
          title: "部门名称",
          dataIndex: "dept_name",
        },
        {
          title: "操作",
          dataIndex: "option",
          scopedSlots: { customRender: "option" },
        },
      ],
      selectedKeys: [2],
      tableData: [],
      ModalProps: {
        visible: false,
        editData: {},
        parent: "2",
      },
      pagination: {},
      renderData: [],
      replaceFields: {
        title: "dept_name",
        children: "child",
        key: "dept_id",
      },
      loading: false,
    };
  },

  methods: {
    onSelect(selectedKeys, info) {
      this.currentDept = selectedKeys[0];
      this.tableData = info.node.getNodeChildren()?.map((item) => ({
        id: item.data.props?.id,
        dept_name: item.data.props?.title,
      }));
      this.ModalProps.parent = selectedKeys[0] + "";
      this.selectedKeys = selectedKeys;
    },
    getDataList(params) {
      this.loading = true;
      DataService.getDeptTree(params).then((res) => {
        this.renderData = res.data;
        this.ModalProps.parent = res.data[0].dept_id + "";
        this.selectedKeys = [res.data[0].id];
        this.tableData = res.data[0].child;
        this.loading = false;
      });
    },
    addData() {
      this.ModalProps = { ...this.ModalProps, visible: true, editData: {} };
    },
    delData(id) {
      DataService.delDept(id).then(() => {
        message.success("删除成功");
        this.getDataList();
      });
    },
    editData(data) {
      this.ModalProps = { ...this.ModalProps, visible: true, editData: data };
    },
    handleTableChange(pagination) {
      this.getDataList({ page: pagination.current });
    },
    handleVisible(visible) {
      this.ModalProps = { visible, editData: {} };
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
  // align-items: center;
}
.filter {
  width: 100%;
  justify-content: space-between;
}
.deptContainer {
  display: flex;
  .tree {
    ul {
      text-align: left;
    }
  }
  & > div:first-child {
    width: 200px;
    border-right: 1px solid #eee;
  }
  & > div:last-child {
    flex: 1;
  }
}
.ant-table-content {
  height: calc(100vh - 270px);
  // overflow-y: au;
}
</style>
<style lang="less" scoped></style>
