<template>
  <div>
    <slot v-if="flag"></slot>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { adminAuth } from "@/consts";
export default {
  computed: mapState({
    currentUser: (state) => state.User.user,
  }),
  props: {
    allowRole: Array,
  },
  data() {
    return {
      flag: false,
    };
  },
  methods: {
    auth(user) {
      const allowRole = this.allowRole || adminAuth;
      return allowRole.includes(user.role_id);
    },
  },
  mounted() {
    this.flag = this.auth(this.currentUser || {});
  },
  watch: {
    currentUser: function (val) {
      this.flag = this.auth(val || {});
    },
  },
};
</script>
