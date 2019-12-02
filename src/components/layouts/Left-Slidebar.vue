<template>
  <div class="navbar-side-wrapper">
    <div class="siderbar">
      <router-link to="/" tag="p" class="title">JDM</router-link>
      <ul class="nav">
        <li class="s">
          <router-link to="/">
            <i class="iconfont icon-barchart"></i>
            <span>首页</span>
          </router-link>
        </li>
        <li>
          <div @click="sList('product')">
            <i class="iconfont icon-list"></i>
            <span>商品</span>
          </div>
          <ul class="second-level">
            <li>
              <router-link to="/product">
                <span>商品管理</span>
              </router-link>
            </li>
            <li>
              <router-link to="/category">
                <span>品类管理</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <div @click="sList('order')">
            <i class="iconfont icon-check-square"></i>
            <span>订单</span>
          </div>
          <ul class="second-level">
            <li>
              <router-link to="/order">
                <span>订单管理</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li v-if="!vuexIsLogin">
          <router-link to="/login">
            <i class="iconfont icon-log-in"></i>
            <span>登录</span>
          </router-link>
        </li>
        <li>
          <div @click="sList('user')">
            <i class="iconfont icon-me"></i>
            <span>用户</span>
          </div>
          <ul class="second-level">
            <li>
              <router-link to="/user">
                <span>用户列表</span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "slide-bar",
  computed: {
    ...mapGetters({
      vuexIsLogin: "login/login"
    })
  },
  methods: {
    sList(tag) {
      const { fullPath } = this.$router.history.current;
      switch (tag) {
        case "product":
          fullPath !== "/product" ? this.$router.push("/product") : null;
          break;
        case "order":
          fullPath !== "/order" ? this.$router.push("/order") : null;
          break;
        case "user":
          console.log(tag);
          fullPath !== "/user" ? this.$router.push("/user") : null;
          break;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.navbar-side-wrapper
	background: #2b2e33
	height: 100%
	position: fixed
	width: 260px
	.siderbar
		.title
			padding: 15px 0 15px 15px
			font-size: 35px
			color: #2dafcb
			cursor: pointer
		.nav
			li
				display: flex
				flex-direction: column
				justify-content: center
				div
					width: 100%;
					height: 50px;
					line-height: 50px;
					padding: 0 0 0 15px;
					color: #ccc;
					cursor: pointer
				.iconfont
						margin-right 8px
				a
					width: 100%
					height: 50px
					line-height: 50px
					padding: 0 0 0 15px
					color: #ccc
					&.active-router
						background-color: #2dafcb !important;
					&:hover
						background: #2b2e33
						color: #fff
				.second-level
					span
						margin-left: 28px
					a
						text-decoration: none
</style>
