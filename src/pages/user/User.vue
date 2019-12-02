<template>
  <div>
    <p class="title">用户管理</p>
    <div class="user" v-if="!loading">
      <p class="title">用户管理</p>
      <table-list :tHeadLists="tHeadLists" :tBodyListsLen="tBodyLists.length">
        <template #tBody>
          <tr v-for="list in tBodyLists" :key="list.id">
            <th>{{ list.id }}</th>
            <th>{{ list.username }}</th>
            <th>{{ list.email }}</th>
            <th>{{ list.phone }}</th>
            <th>{{ list.createTime | formatDate }}</th>
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
import TableList from "components/table-lists/TableList";
import Loading from "components/loading/Loading";
import Pagination from "components/pagination/Pagination";
import userModel from "models/user";
export default {
  name: "user",
  components: {
    TableList,
    Loading,
    Pagination
  },
  data() {
    return {
      tHeadLists: [
        { value: "ID", width: "10%" },
        { value: "用户名", width: "20%" },
        { value: "邮箱", width: "20%" },
        { value: "电话", width: "20%" },
        { value: "注册时间", width: "40%" }
      ],
      pageTotalCount: 0,
      tBodyLists: [],
      pageCount: 1,
      loading: true
    };
  },
  filters: {
    formatDate(value) {
      return new Date(value).toLocaleString();
    }
  },
  methods: {
    getUserLists(type) {
      userModel.getUserLists(type).then(res => {
        if (type.type === "getUserLists") {
          const { pages: pageTotalCount } = res;
          this.pageTotalCount = pageTotalCount;
          this.loading = false;
        }
        if (type.type === "pageCountChange") {
          this.pageCount = type.e;
        }
        this.tBodyLists = res.list;
      });
    },
    pageCountchange(count) {
      this.getUserLists({
        type: "pageCountChange",
        data: {
          pageNum: count
        },
        pageCount: count
      });
    }
  },
  mounted() {
    this.getUserLists({ type: "getUserLists" });
  }
};
</script>
