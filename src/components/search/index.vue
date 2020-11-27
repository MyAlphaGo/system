<template>
  <div class="searchLine">
    <span>{{ title }}： </span>
    <span
      ><a-input-search
        @search="handleEnter"
        placeholder="按下回车或者搜索按钮搜索"
      ></a-input-search
    ></span>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    search: Function
  },
  methods: {
    handleEnter(value) {
      this.search({ page: 1, search: value });
    }
  }
};
</script>
<style>
.searchLine {
  display: flex;
  align-items: center;
}
</style>
