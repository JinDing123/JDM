<template>
  <div>
    <tips :tipInfo="tipInfo" />
    <div class="order" v-if="!loading">
      <p class="title">订单管理</p>
      <search :selectOptions="selectOptions" @searchLists="searchLists" />
      <table-list :tHeadLists="tHeadLists" :tBodyListsLen="tBodyLists.length">
        <template #tBody>
          <tr v-for="list in tBodyLists" :key="list.id">
            <th>{{ list.orderNo }}</th>
            <th>{{ list.receiverName }}</th>
            <th>{{ list.statusDesc }}</th>
            <th>{{ list.payment }}</th>
            <th>{{ list.createTime }}</th>
            <th>
              <router-link :to="'/order/detail/' + list.orderNo"
                >查看</router-link
              >
            </th>
          </tr>
        </template>
      </table-list>
      <Pagination
        :pageCount="pageTotalCount"
        @pageCountchange="pageCountchange"
        v-show="tBodyLists.length > 0"
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
import checkType from "util/checkType";
import getTip from "util/getTip";
import orderModel from "models/order";
import http from "util/http";

export default {
  name: "order",
  components: {
    Pagination,
    TableList,
    Loading,
    Search,
    Tips
  },
  data() {
    return {
      pageTotalCount: 0,
      tHeadLists: [
        { value: "订单号", width: "25%" },
        { value: "收件人", width: "10%" },
        { value: "订单状态", width: "15%" },
        { value: "订单总价", width: "15%" },
        { value: "创建时间", width: "25%" },
        { value: "操作", width: "15%" }
      ],
      tBodyLists: [],
      loading: true,
      selectOptions: ["按订单号查询"],
      tipInfo: {},
      pageCount: 1
    };
  },
  mounted() {
    this.getOrder({ type: "getOrder" });
  },
  methods: {
    searchLists(searchParams) {
      const { searchKeyWords } = searchParams,
        notNumber = checkType.notNumber(searchKeyWords);
      if (notNumber) {
        this.tipInfo = getTip("id 必须为数字, 请重新输入", 2);
        return;
      }
      orderModel
        .searchOrderList({
          data: { orderNo: searchParams.searchKeyWords }
        })
        .then(res => {
          this.pageTotalCount = res.list.length;
          this.tBodyLists = res.list;
        });
    },
    getOrder(type) {
      orderModel
        .getOrder(type)
        .then(res => {
          if (type.type === "getOrder") {
            const { pages: pageTotalCount } = res;
            this.pageTotalCount = pageTotalCount;
            this.loading = false;
          }
          if (type.type === "pageCountChange") {
            this.pageCount = type.e;
          }
          this.tBodyLists = res.list;
        })
        .catch(err => {
          this.tBodyLists = [];
        });
    },
    pageCountchange(count) {
      this.getOrder({
        type: "pageCountChange",
        data: {
          pageNum: count
        }
      });
    }
  }
};
</script>
