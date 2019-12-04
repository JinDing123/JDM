<template>
  <div>
    <tips :tipInfo="tipInfo" />
    <div class="login-position">
      <div class="input-group input-group-lg">
        <span class="input-group-addon" id="sizing-addon3">@</span>
        <input
          type="text"
          class="form-control"
          placeholder="username"
          aria-describedby="sizing-addon1"
          v-model="username"
        />
      </div>

      <div class="input-group input-group-lg">
        <span class="input-group-addon" id="sizing-addon3">@</span>
        <input
          type="password"
          class="form-control"
          placeholder="password"
          aria-describedby="sizing-addon1"
          v-model="password"
          @keyup.enter="login"
        />
      </div>
      <button class="btn btn-success" @click="login" @keyup.enter="login">
        登录
      </button>
    </div>
  </div>
</template>

<script>
import getTip from "util/getTip";
import storage from "util/storage";
import Tips from "components/tips/Tips";
import loginModel from "models/login";
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      username: "rosen",
      password: "admin",
      tipInfo: {}
    };
  },
  components: {
    Tips
  },
  methods: {
    ...mapActions({ actionLogin: "login/loginSync" }),
    login() {
      const check = this.checkLogin();
      if (!check) return;
      const { username, password } = this;
      const parseParams = new URLSearchParams();
      parseParams.append('username', username);
      parseParams.append('password', password)
      loginModel
        .login({
          data: parseParams
        })
        .then(res => {
          if (typeof res !== "object") {
            this.tipInfo = getTip(res, 2);
          } else {
            this.$router.push("/");
            this.actionLogin({ isLogin: true, username: res.username });
            storage.setStorage("loginStatus", {
              isLogin: true,
              username: res.username
            });
          }
        })
        .catch(err => {
          this.tipInfo = getTip(err, 2);
        });
    },
    checkLogin() {
      if (!this.username) {
        this.tipInfo = getTip("用户名不能为空", 2);
        return false;
      } else if (!this.password) {
        this.tipInfo = getTip("密码不能为空", 2);
        return false;
      }
      return true;
    }
  }
};
</script>

<style lang="stylus" scoped>
.login-position
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    position: absolute
    top: 30%
    left: 50%
    .input-group
        width: 330px
        margin-bottom: 20px
    .btn
      width: 330px
</style>
