<template>
  <div class="warpper">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="contentTable">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // children
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.warpper {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px);
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    // background-color: #eee;
  }
  .contentTable {
    flex: 1;
  }
}
</style>
<style lang="less">
  .contentTable {
    flex: 1;
    .ant-table-wrapper {
      height: 100%;
      .ant-table-pagination {
        margin-top: 70px;
      }
    }
  }
</style>
