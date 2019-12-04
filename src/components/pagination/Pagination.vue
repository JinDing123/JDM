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
