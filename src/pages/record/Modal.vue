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
        action="http://101.37.76.80:9001/os/file/work_upload"
        :withCredentials="true"
        :multiple="true"
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
export default {
  props: {
    editData: Object,
    visible: Boolean,
    onChangeVisible: Function,
    onSuccess: Function
  },
  data() {
    return {
      title: "添加文件"
    };
  },
  methods: {
    handleOk() {
      if (this.onSuccess) {
        this.onSuccess();
      }
      this.clearState();
      this.onChangeVisible(false);
    },
    handleCancel() {
      this.clearState();
      this.onChangeVisible(false);
    },
    clearState() {
      this.title = "添加文件";
    }
  }
};
</script>

<style lang="less" scoped></style>
<style lang="less"></style>
