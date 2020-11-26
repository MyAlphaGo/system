<template>
  <div>
    <slot v-if="flag"></slot>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    currentUser: state => state.User.user
  }),
  data() {
    return {
      flag: false
    };
  },
  methods: {
    auth(user) {
      const allowRole = [0];
      return allowRole.includes(user.role_id);
    }
  },
  mounted() {
    this.flag = this.auth(this.currentUser || {});
  },
  watch: {
    currentUser: function(val) {
      this.flag = this.auth(val || {});
    }
  }
};
</script>
