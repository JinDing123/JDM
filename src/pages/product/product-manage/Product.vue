<template>
  <div>
    <tips :tipInfo="tipInfo" />
    <div v-if="!loading">
      <div class="product-title">
        <p class="title">商品管理</p>
        <router-link to="/product/add" class="btn btn-primary"
          >添加商品</router-link
        >
      </div>
      <search :selectOptions="selectOptions" @searchLists="searchLists" />
      <table-list
        :tHeadLists="tHeadLists"
        :tBodyListsLen="tBodyLists.length"
        @handleProductStatus="handleProductStatus"
      >
        <template #tBody="{handleProductStatus}">
          <tr v-for="list in tBodyLists" :key="list.id">
            <th>{{ list.id }}</th>
            <th>{{ list.name }}</th>
            <th>{{ list.price }}</th>
            <th class="status">
              {{ list.status === 1 ? "在售" : "已下架" }}
              <button
                class="btn btn-warning a-padding"
                v-show="list.status === 2 || !list.status"
                @click="handleProductStatus(list)"
              >
                上架
              </button>
              <button
                class="btn btn-warning a-padding"
                v-show="list.status === 1"
                @click="handleProductStatus(list)"
              >
                下架
              </button>
            </th>
            <th>
              <router-link :to="'/product/detail/' + list.id">查看</router-link>
              <router-link :to="'/product/edit/' + list.id">编辑</router-link>
            </th>
          </tr>
        </template>
      </table-list>
      <Pagination
        v-show="tBodyLists.length > 0"
        :pageCount="pageTotalCount"
        @pageCountchange="pageCountchange"
      />
    </div>
    <loading v-else class="load-center" />
  </div>
</template>

<script>
import Pagination from "components/pagination/Pagination";
import TableList from "components/table-lists/TableList";
import Loading from "components/loading/Loading";
import Search from "components/search/Search";
import Tips from "components/tips/Tips";
import getTip from "util/getTip";
import checkType from "util/checkType";
import productModel from "models/product";

export default {
  name: "product",
  components: {
    Pagination,
    TableList,
    Loading,
    Tips,
    Search
  },
  data() {
    return {
      pageTotalCount: 0,
      tHeadLists: [
        { value: "id", width: "5%" },
        { value: "信息", width: "50%" },
        { value: "价格", width: "12.5%" },
        { value: "状态", width: "20%" },
        { value: "操作", width: "12.5%" }
      ],
      tBodyLists: [],
      loading: true,
      tipInfo: {},
      pageCount: 1,
      selectOptions: ["按商品ID查询", "按商品名称查询"]
    };
  },
  methods: {
    searchLists(searchParams) {
      const { searchKeyWords, searchType } = searchParams,
        loadProductParams = {},
        notNumber = checkType.notNumber(searchKeyWords);
      if (searchType === "按商品ID查询") {
        if (notNumber) {
          this.tipInfo = getTip("id 必须为数字, 请重新输入", 2);
          return;
        }
        loadProductParams.productId = searchKeyWords;
      } else {
        loadProductParams.productName = searchKeyWords;
      }
      productModel
        .searchProductList({
          data: loadProductParams
        })
        .then(res => {
          this.pageTotalCount = res.list.length;
          this.tBodyLists = res.list;
        });
    },
    handleProductStatus(res) {
      this.loadProduct({
        type: "changeStatus",
        data: {
          pageNum: this.pageCount
        },
        msg: res
      });
    },
    getProduct() {
      this.loadProduct({ type: "getProduct" });
    },
    pageCountchange(count) {
      this.loadProduct({
        type: "pageCountChange",
        data: {
          pageNum: count
        },
        pageCount: count
      });
    },
    loadProduct(type) {
      productModel.getProduct(type).then(res => {
        switch (type.type) {
          case "getProduct":
            const { pages: pageTotalCount } = res;
            this.pageTotalCount = pageTotalCount;
            this.loading = false;
            break;
          case "pageCountChange":
            this.pageCount = type.e;
            break;
          case "changeStatus":
            this.tipInfo = getTip(type.msg, 1);
            break;
        }
        this.tBodyLists = res.list;
      });
    }
  },
  mounted() {
    this.getProduct();
  }
};
</script>

<style lang="stylus" scoped>
.product-title
  display: flex
  justify-content: space-between
  align-items: center
</style>
