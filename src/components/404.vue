<template>
  <div class="container">
    <div class="box">
        <p>404</p>
        <p>not found</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="less" scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    .box {
      margin-top: -10%;
      &>p:first-child {
        font-size: 25px;
      }
      p {
        color: #ddd;
        margin-bottom: 10px;
        font-size: 20px;
      }
    }
}
</style>