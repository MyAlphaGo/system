<template>
  <div class="warpper">
    <div class="header">
       <slot name="header"></slot>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    // children
  },
  mounted(){
  }
};
</script>
<style lang="less" scoped>
.warpper {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    // background-color: #eee;
  }
  .content {
    flex: 1;
  }
}
</style>