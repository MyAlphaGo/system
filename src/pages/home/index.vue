<template>
  <div>Home</div>
</template>
<script>
import { getGantList } from "@/api";
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    getData() {},
  },
  created() {
    // console.log(getGantList)
    getGantList().then((res) => {
      console.log(res);
    });
  },
};
</script>
