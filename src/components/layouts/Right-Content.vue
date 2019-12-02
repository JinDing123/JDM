<template>
  <div class="right-content-wrapper">
    <div v-if="vuexIsLogin">
      <login-success :username="vuexUsername" @logout="logout" />
    </div>
    <div class="content">
      <transition name="fade">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import LoginSuccess from "./LoginSuccess";
import storage from "util/storage";
import { mapGetters } from "vuex";
export default {
  name: "right-content",
  computed: {
    ...mapGetters({
      vuexIsLogin: "login/login",
      vuexUsername: "login/username"
    })
  },
  components: {
    LoginSuccess
  },
  methods: {
    logout() {
      this.$router.push('/login');
      storage.removeStorage("loginStatus");
    }
  }
};
</script>

<style lang="stylus" scoped>
.right-content-wrapper
    display: flex
    flex-direction: column
    height: 100%
    .login-wrapper
        display: flex
        justify-content: space-between
        align-items: center
        height: 50px
        padding:0 25px
        background: #fff
    .content
        min-height: 1000px
        padding: 25px
        background: #f0f0f0
// .fade-enter-active, .fade-leave-active 
//   transition: all .5s;

// .fade-enter, .fade-leave-to 
//   opacity: 0;

</style>
