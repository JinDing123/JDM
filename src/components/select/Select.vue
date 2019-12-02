<template>
  <div>
    <div v-if="notFirstAndSecondId">暂无分类</div>
    <div class="select-wrapper" v-else>
      <!-- 你传id，我就能够获取到你对应的名字，牛逼 -->
      <select
        class="form-control cate-select"
        v-model="firstCategoryIdInfo"
        :disabled="disabled"
      >
        <option disabled>请选择一级品类</option>
        <option
          v-for="list in firstCategory"
          :key="list.id"
          :value="list.id"
          :data-id="list.id"
          >{{ list.name }}</option
        >
      </select>
      <select
        class="form-control cate-select"
        v-show="secondCategoryShow"
        v-model="secondCategoryIdInfo"
        @change="getSelectId"
        :disabled="disabled"
      >
        <option disabled>请选择二级品类</option>
        <option
          v-for="list in secondCategory"
          :key="list.id"
          :value="list.id"
          >{{ list.name }}</option
        >
      </select>
    </div>
  </div>
</template>

<script>
import productModel from "models/product";

export default {
  props: {
    firstCategoryId: Number,
    secondCategoryId: Number,
    categoryType: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  name: "select-wrapper",
  data() {
    return {
      firstCategoryIdInfo: "请选择一级品类",
      secondCategoryIdInfo: "请选择二级品类",
      firstCategory: [],
      secondCategory: [],
      notFirstAndSecondId: false
    };
  },
  computed: {
    secondCategoryShow() {
      if (this.categoryType === "productAdd") {
        if (this.secondCategory.length > 0) {
          return true;
        } else {
          return false;
        }
      }
      if (
        this.categoryType === "productDetail" ||
        this.categoryType === "productEdit"
      ) {
        if (this.secondCategory.length > 0 && this.secondCategoryId !== 0) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  watch: {
    firstCategoryIdInfo(newValue) {
      // 商品添加 || 商品编辑页面，监听父id的变化，当id变化，向后台发起请求，获取对应的子级options
      if (
        this.categoryType === "productAdd" ||
        this.categoryType === "productEdit"
      ) {
        this.firstCategoryIdInfoChanged(newValue);
      }
    },
    firstCategoryId(newValue) {
      // 商品详情 || 商品编辑，会传入一个父级和子级id，根据它们的id，去选择它们对应的options, 商品添加的页面没有firstCategoryId传进来，所以不需要判断
      console.log("55", newValue, this.secondCategoryId);
      if (newValue === 0 && this.secondCategoryId !== 0) {
        // 父级没有categoryId，子级有id，把子级的id给父级
        this.firstCategoryIdInfo = this.secondCategoryId;
      }
      if (newValue === 0 && this.secondCategoryId === 0) {
        // 父级子级都没有id，不显示select
        this.notFirstAndSecondId = true;
      }
      if (newValue) {
        // 父级子级都存在id，同时设置它们的options
        // product-detail firstId 存在，去获取子category的目录，并且设置v-model，选中用户选中的哪一项
        this.firstCategoryIdInfo = newValue;
        if (this.secondCategoryId) {
          this.secondCategoryIdInfo = this.secondCategoryId;
          this.getCategory({
            // 请求secondCategory
            type: "secondCategory",
            data: {
              categoryId: newValue
            }
          });
        }
      }
    }
  },
  methods: {
    getSelectId() {
      // product-add || product-edit 两个页面，当两个select 都有值了，通过自定义事件发送出去选中的options的id
      if (this.firstCategoryIdInfo && this.secondCategoryIdInfo) {
        this.$emit("getSelectId", {
          firstCategoryId: this.firstCategoryIdInfo
        });
      }
    },
    firstCategoryIdInfoChanged(id) {
      // 根据id变化，请求对应的子级options
      this.getCategory({
        type: "secondCategory",
        data: {
          categoryId: id
        }
      });
    },
    getCategory(type) {
      productModel.getCategory(type).then(res => {
        if (type.type === "firstCategory") {
          this.firstCategory = res;
        }
        if (type.type === "secondCategory") {
          this.secondCategory = res;
        }
      });
    }
  },
  mounted() {
    // 无论是product-add || product-detail || product-edit 都需要获取到全部的category
    this.getCategory({ type: "firstCategory" });
  }
};
</script>

<style lang="stylus" scoped>
.select-wrapper
    display: flex
    justify-content: flex-start
    aligin: center
    select
        width: 26%
        &:nth-of-type(2)
            margin-left: 15px
</style>
