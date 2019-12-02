<template>
  <div class="login-success">
    <span>欢迎你, {{ username }}</span>
    <span @click="logout">退出登录</span>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import storage from 'util/storage';


export default {
  name: "login-success",
  props: {
    username: String
  },
  computed: {
    ...mapState({
      isLogin: state => state["login"].isLogin
    })
  },
  methods: {
      ...mapActions({actionLogin: 'login/loginSync'}), 
      logout() {
          this.actionLogin({});
          this.$emit('logout');   // 传一个值出去不就行了，直接父组件把storeage的login干掉
      }
  }
};
</script>

<style lang="stylus" scoped>
.login-success
  display: flex
  height: 50px
  justify-content: space-between
  align-items: center
  padding: 0 20px
</style>
