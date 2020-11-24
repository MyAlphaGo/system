<template>
  <div>
    <TableLayout>
      <template v-slot:header>
        <div class="flexc filter">
          <div class="flexc"></div>
          <Auth
            ><a-button v-on:click="addData({ parent: currentDept })"
              >添加社保</a-button
            ></Auth
          >
        </div>
      </template>

      <div class="deptContainer">
        <div>
          <a-tree
            :replace-fields="replaceFields"
            :tree-data="renderData"
            @select="onSelect"
            :defaultExpandAll="true"
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
                  <a-button
                    type="link"
                    v-on:click="editData({ data: record, parent: currentDept })"
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
      v-bind:onChangeVisible="handleVisible"
      v-bind:onSuccess="getDataList"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
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
      ],
      tableData: [],
      currentDept: 0,
      ModalProps: {
        visible: false,
        editData: {},
      },
      pagination: {},
      renderData: [],
      replaceFields: {
        title: "dept_name",
        children: "child",
        key: "id",
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
      this.currentDept = selectedKeys[0];
      // this.tableData = info.node.getNodeChildren()
    },
    getDataList(params) {
      this.loading = true;
      DataService.getDeptTree(params).then((res) => {
        this.renderData = res.data;
        this.loading = false;
      });
    },
    addData(data) {
      this.ModalProps = { visible: true, editData: data };
    },
    delData(id) {
      DataService.delSocial(id).then(() => {
        message.success("删除成功");
        this.getDataList();
      });
    },
    editData(data) {
      this.ModalProps = { visible: true, editData: data };
    },
    handleTableChange(pagination, filters, sorter) {
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
  align-items: center;
}
.filter {
  width: 100%;
  justify-content: space-between;
}
.deptContainer {
  display: flex;
  & > div:first-child {
    width: 200px;
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
<style lang="less" scoped>
</style>