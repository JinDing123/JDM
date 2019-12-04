<template>
  <div class="table-list">
    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th
                v-for="list in tHeadLists"
                :width="list.width"
                :key="list.value"
              >
                {{ list.value }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="tBodyListsLen <= 0">
              <td class="text-center" :colspan="tHeadLists.length">
                暂无结果
              </td>
            </tr>
            <slot name="tBody" :handleProductStatus="handleProductStatus" />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import http from "util/http";
import productModel from "models/product";
export default {
  name: "table-list",
  props: {
    tHeadLists: Array,
    tBodyListsLen: Number
  },
  methods: {
    handleProductStatus(list) {
      list.status = list.status === 1 ? 2 : 1;
      productModel
        .setSaleStatus({
          data: {
            productId: list.id,
            status: list.status
          }
        })
        .then(res => {
          // status 是成功或者失败，它定义的是，修改状态之后，重新请求product list
          this.$emit("handleProductStatus", res);
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.table-list
    font-size: 15px
    .status
        display: flex
        justify-content: space-around
        align-items: center
        .a-padding
            margin-left: 5px
            padding: 5px !important
</style>
