<template>
  <Layout />
</template>

<script>
import Layout from "components/layouts/Layout";
import storage from "util/storage";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Layout
  },
  mounted() {
    this.uploadPageSaveUser();
  },
  methods: {
    ...mapActions({ actionLogin: "login/loginSync" }),
    uploadPageSaveUser() {
      const {
        isLogin: storageLogin,
        username: storageUsername
      } = storage.getStorage("loginStatus");
      if (storageLogin && storageUsername) {
        this.actionLogin({ isLogin: storageLogin, username: storageUsername });
      };
    }
  },
  destroyed() {
    storage.removeStorage('loginStatus');
    this.actionLogin({});
  },
};
</script>
