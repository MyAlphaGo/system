<template>
  <div>
    <div class="title">
      <h1>欢迎来到{{ systemName }}</h1>
    </div>
  </div>
</template>
<script>
import { TITLE } from "@/consts";
export default {
  name: "Home",
  data() {
    return {
      systemName: TITLE,
    };
  },
  methods: {
  },
};
</script>
