<template>
  <div>
    <tips :tipInfo="tipInfo" />
    <div v-if="!loading">
      <p class="title">品类管理</p>
      <table-list :tHeadLists="tHeadLists" :tBodyListsLen="tBodyLists.length">
        <template #tBody>
          <tr v-for="list in tBodyLists" :key="list.id">
            <th>
              {{ list.id }}
            </th>
            <th>
              {{ list.name }}
            </th>
            <th>
              <a href="javascript:;" @click="changeCategoryName(list)"
                >修改名称</a
              >
              <router-link :to="'/category/children/' + list.id"
                >查看其子品类</router-link
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
import Tips from "components/tips/Tips";
import getTip from "util/getTip";
import categoryModel from "models/category";

export default {
  name: "category",
  data() {
    return {
      pageTotalCount: 0,
      tHeadLists: [
        { value: "品类Id", width: "10%" },
        { value: "品类名称", width: "60%" },
        { value: "操作", width: "30%" }
      ],
      tBodyLists: [],
      list: [],
      end: 10,
      tipInfo: {},
      loading: true
    };
  },
  components: {
    Pagination,
    TableList,
    Loading,
    Tips
  },
  methods: {
    changeCategoryName(list) {
      let newName = window.prompt("请输入新的品类名称", list.name);
      if (newName) {
        categoryModel
          .changeCategoryName({
            data: {
              categoryId: list.id,
              categoryName: newName
            }
          })
          .then(res => {
            this.getCategory();
            this.tipInfo = getTip(res, 1);
          });
      }
    },
    getCategory() {
      categoryModel.getCategory().then(res => {
        this.pageTotalCount = parseInt(res.length / 10);
        this.list = res;
        this.tBodyLists = this.filterBodyLists(10); // 第一次渲染10个
        this.loading = false;
      });
    },
    pageCountchange(count) {
      this.tBodyLists = this.filterBodyLists(count * 10);
    },
    filterBodyLists(end) {
      return this.list.slice(end - 10, end);
    }
  },
  mounted() {
    this.getCategory();
  }
};
</script>
