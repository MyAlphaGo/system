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
    console.log(this.$slots)
  }
};
</script>
<style lang="less" scoped>
.warpper {
  padding: 10px 20px;
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    // background-color: #eee;
  }
  .content {
  }
}
</style>