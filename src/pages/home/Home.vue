<template>
  <div>
    <p class="title">首页</p>
    <div class="row">
      <div class="col-md-4">
        <router-link to="/product" class="color-box orange">
          <p class="count">{{ homeData.productCount }}</p>
          <p class="desc">
            <i class="iconfont icon-list"></i>
            <span>商品总数</span>
          </p>
        </router-link>
      </div>
      <div class="col-md-4">
        <router-link to="/order" class="color-box green">
          <p class="count">{{ homeData.orderCount }}</p>
          <p class="desc">
            <i class="iconfont icon-list"></i>
            <span>订单总数</span>
          </p>
        </router-link>
      </div>
      <div class="col-md-4">
        <router-link to="/me" class="color-box blue">
          <p class="count">{{ homeData.userCount }}</p>
          <p class="desc">
            <i class="iconfont icon-me"></i>
            <span>用户列表</span>
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import http from "util/http";

export default {
  name: "home",
  data() {
    return {
      homeData: {}
    };
  },
  mounted() {
    this.getBaseCount();
  },
  methods: {
    getBaseCount() {
      http
        .request({
          url: "/statistic/base_count.do"
        })
        .then(res => {
          this.homeData = res;
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.color-box
    display: block;
    height: 160px;
    text-align: center;
    padding: 20px 0;
    opacity: .9;
    transition: all .3s;
    &:hover
        text-decoration: none;
        color: #555;
        opacity: 1;
        transform: scale(1.08);
    &:focus
        text-decoration: none;
    .count
        font-size: 50px;
        height: 80px;
        line-height: 80px;

    .desc
        font-size: 18px;
        .iconfont
            margin-right: 5px;
</style>
