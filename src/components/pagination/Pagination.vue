https://github.com/lokyoung/vuejs-paginate
https://blog.csdn.net/xiejunna/article/details/85326612
<template>
  <div class="pagination-wrapper">
    <Paginate
      :page-count="pageCount"
      :page-range="rangePage"
      :click-handler="pageCountChange"
      :margin-pages="2"
      container-class="pagination"
      page-class="page-item"
      page-link-class="page-link-item"
      prev-class="ignore prev-item"
      prev-link-class="prev-link-item"
      next-class="ignore next-item"
      next-link-class="next-link-item"
      disabled-class="ignore disabled"
      prev-text="上一页"
      next-text="下一页"
    />
    <!-- 它所有样式的类名就是用的bootstrap里面的，依赖bootstrap的样式，也可以自己写 -->
    <!-- <div class="go-to-page">
      <label for="goto">跳转到</label>
      <input
        type="text"
        id="goto"
        v-model="gotoPageCount"
        @keyup.enter="gotoPage"
      />页
    </div> -->
  </div>
</template>

<script>
import Paginate from "vuejs-paginate";

export default {
  props: {
    pageCount: Number,
    rangePage: {
      type: Number,
      default: 5
    }
  },
  components: {
    Paginate
  },
  data() {
    return {
      gotoPageCount: "",
      currentPage: 1
    };
  },
  methods: {
    pageCountChange(count) {
      this.$emit("pageCountchange", count);
    },
    // gotoPage() {
    //   if (!this.gotoPageCount) {
    //     alert("输入不能为空");
    //     return;
    //   };
    //   if (this.gotoPageCount > this.pageCount) {
    //     alert("超出当前最大页");
    //     return;
    //   };
	//   this.currentPage = parseInt(this.gotoPageCount);
	//   console.log(this.currentPage);
    //   this.$emit("gotoPage", this.gotoPageCount);
    // }
  }
};
</script>

<style lang="stylus" scoped>
.pagination-wrapper
	display: flex
	justify-content: space-between
	align-items : center
	.pagination
		font-size: 14px
		margin-right: 20px
	.go-to-page
		label
			margin-right: 5px
		input
			width: 55px
			height: 34px
			padding: 6px 12px
			margin-right: 5px
			line-height: 1.42857143
			color: #428bca
			text-decoration: none
			background-color: #fff
			border: 1px solid #ddd

.page-link-item
	color: red !important
</style>
