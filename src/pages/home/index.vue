<template>
  <div>
    <div class="title">
      <h1>欢迎来到{{ systemName }}</h1>
      <button @click="getData">dianji</button>
    </div>
  </div>
</template>
<script>
import { TITLE } from "@/consts";
// import { test } from "@/api";
import { mapState } from "vuex";
export default {
  name: "Home",
  // computed: mapState({
  //   User: state => state.User.name?.sdf,
  // }),
  data() {
    return {
      systemName: TITLE,
    };
  },
  methods: {
    getData() {
      // this.$store.dispatch('User/login')
    },
  },
  // created() {
  //   test().then((res) => {
  //     console.log(res);
  //   });
  // },
};
</script>
