<template>
  <a-modal
    :title="title"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div class="dropbox">
      <a-upload-dragger
        name="filename"
        action="http://101.37.76.80:9001/os/file/upload"
        :withCredentials="true"
        headers
      >
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">单击或拖动文件到此区域上载</p>
        <p class="ant-upload-hint">支持单个或批量上传</p>
      </a-upload-dragger>
    </div>
  </a-modal>
</template>

<script>
import { SocialService as DataService } from "@/api";
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
      title: "添加文件",
    };
  },
  methods: {
    handleOk() {
      if(this.onSuccess) {
        this.handleOk()
      }
      this.clearState();
      this.onChangeVisible(false);
      
    },
    handleCancel() {
      this.clearState();
      this.onChangeVisible(false);
    },
    clearState() {
      this.renderUser = {};
      this.title = "添加文件";
      this.form.resetFields();
    },
  },
};
</script>

<style lang="less" scoped></style>
<style lang="less">
.ant-modal-body {
  // height: 400px;
  overflow: auto;
}
</style>
