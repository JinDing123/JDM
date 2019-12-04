<template>
  <div class="product-detail">
    <p class="title">商品详情</p>
    <product-input
      :productName="productDetail.name"
      :productSubtitle="productDetail.subtitle"
      :productPrice="productDetail.price"
      :productStock="productDetail.stock"
      :disabled="true"
    >
      <template #status>
        <div class="form-group">
          <label class="col-md-2 control-label">当前状态</label>
          <div class="col-md-5">
            <p class="form-control-static">
              {{ productDetail.status === 1 ? "上架中" : "已下架" }}
            </p>
          </div>
        </div>
      </template>
      <template #product-category>
        <select-category
          :firstCategoryId="productDetail.parentCategoryId"
          :secondCategoryId="productDetail.categoryId"
          :disabled="true"
          categoryType="productDetail"
        />
      </template>
      <template #product-img>
        <div
          class="img-icon-wrapper"
          v-for="(imgUrl, index) in filterImgUrls"
          :key="index"
        >
          <img class="sub-img" :src="productDetail.imageHost + imgUrl" />
        </div>
        <div v-if="filterImgUrls.length === 0" class="pt7">暂无描述图片</div>
      </template>
      <template #rich-edtior>
        <div
          class="pt7"
          v-if="productDetail.detail"
          v-html="productDetail.detail"
        ></div>
        <div v-if="!productDetail.detail" class="pt7">暂无商品描述</div>
      </template>
    </product-input>
  </div>
</template>

<script>
import ProductInput from "components/product-input/ProductInput";
import SelectCategory from "components/select/Select";
import RichEditor from "components/rich-editor/RichEditor";
import productModel from "models/product";
export default {
  props: {
    id: String // 路由传递的id
  },
  name: "product-detail",
  data() {
    return {
      productDetail: {}
    };
  },
  computed: {
    filterImgUrls() {
      if (this.productDetail.subImages) {
        let imgUrls = this.productDetail.subImages.split(",");
        return imgUrls;
      } else {
        return [];
      }
    }
  },
  components: {
    ProductInput,
    SelectCategory,
    RichEditor
  },
  methods: {
    getProductDetail() {
      productModel.getProductDetail(this.id).then(res => {
        this.productDetail = res;
      });
    }
  },
  mounted() {
    this.getProductDetail();
  }
};
</script>
