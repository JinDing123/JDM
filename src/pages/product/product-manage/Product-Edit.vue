<template>
  <div class="product-editor">
    <tips :tipInfo="tipInfo" />
    <p class="title">商品编辑</p>
    <product-input
      @handleSubmitToParent="handleEditProductSubmit"
      :productName="productDetail.name"
      :productSubtitle="productDetail.subtitle"
      :productPrice="productDetail.price"
      :productStock="productDetail.stock"
    >
      <template #product-category>
        <select-category
          :firstCategoryId="productDetail.parentCategoryId"
          :secondCategoryId="productDetail.categoryId"
          categoryType="productEdit"
          @getSelectId="getSelectId"
        />
      </template>
      <template #product-img>
        <div
          class="img-icon-wrapper"
          v-for="(imgUrl, index) in imgUrls"
          :key="index"
        >
          <img class="sub-img" :src="imgUrl" />
          <i class="fa-close" @click="deleteImgUrl(index)">x</i>
        </div>
        <loading v-show="loadedImg" class="load-left" />
        <div class="pm7 pt7" v-show="imgUrls.length <= 0">
          暂无描述图片,请添加。
        </div>
      </template>
      <template #upload-img>
        <file-upload
          @uploadImgFailed="uploadImgFailed"
          @uploadImgSuccess="uploadImgSuccess"
          @isLoadImg="isLoadImg"
          :loadedImg="loadedImg"
        />
      </template>
      <template #rich-edtior>
        <RichEditor
          @getEditorValue="getEditorValue"
          :editorExistValue="productDetail.detail"
        />
      </template>
      <template #btn="{handleSubmit}">
        <button class="btn btn-xl btn-success" @click="handleSubmit">
          提交
        </button>
      </template>
    </product-input>
  </div>
</template>

<script>
import ProductInput from "components/product-input/ProductInput";
import SelectCategory from "components/select/Select";
import RichEditor from "components/rich-editor/RichEditor";
import FileUpload from "components/file-upload/FileUpload";
import Tips from "components/tips/Tips";
import Loading from "components/loading/Loading";
import productModel from "models/product";
import checkType from "util/checkType";
import getTip from "util/getTip";
import http from "util/http";
export default {
  name: "product-editor",
  props: {
    id: String // 路由传递的id
  },
  data() {
    return {
      productDetail: {},
      firstCategoryId: "",
      tipInfo: {},
      loadedImg: false,
      imgUrls: [],
      imgUris: [],
      editorValue: ""
    };
  },
  components: {
    ProductInput,
    SelectCategory,
    RichEditor,
    FileUpload,
    Loading,
    Tips
  },
  methods: {
    getEditorValue(html) {
      this.editorValue = html;
    },
    uploadImgFailed() {
      this.tipInfo = getTip("图片过大上传失败", 2);
    },
    uploadImgSuccess(imgData) {
      this.imgUrls.push(imgData.url);
      this.imgUris.push(imgData.uri);
    },
    deleteImgUrl(index) {
      this.imgUrls.splice(index, 1);
      this.imgUris.splice(index, 1);
    },
    isLoadImg(key) {
      this.loadedImg = key;
    },
    getSelectId(categoryIdInfo) {
      this.firstCategoryId = categoryIdInfo.firstCategoryId;
    },
    handleEditProductSubmit(e) {
      const productEditInfo = {
        categoryId: this.firstCategoryId || this.productDetail.categoryId,
        subImages: this.imgUris.join(","),
        detail: this.editorValue || this.productDetail.detail,
        id: this.id,
        price: e.price || this.productDetail.price,
        stock: e.stock || this.productDetail.stock,
        name: e.name || this.productDetail.name,
        subtitle: e.subtitle || this.productDetail.subtitle,
        status: this.productDetail.status
      };
      let productAddNotNull = productModel.productAddNotNull(e);
      if (productAddNotNull) {
        this.tipInfo = getTip(productAddNotNull, 2);
        return;
      }
      productModel
        .handleAddOrEditProduct(productEditInfo)
        .then(res => {
          this.tipInfo = getTip(res, 1);
          setTimeout(() => {
            this.$router.push("/product");
          }, 1500);
        })
        .catch(err => {
          this.tipInfo = getTip("提交出错", 2);
        });
    },
    getProductDetail() {
      productModel.getProductDetail(this.id).then(res => {
        this.productDetail = res;
        this.getSubImages();
      });
    },
    getSubImages() {
      if (this.productDetail.subImages) {
        let imgHosts = this.productDetail.imageHost;
        this.imgUris = this.productDetail.subImages.split(",");
        this.imgUrls = this.productDetail.subImages
          .split(",")
          .reduce((prev, cur, index) => {
            prev.push(imgHosts + cur);
            return prev;
          }, []);
      }
    }
  },
  mounted() {
    this.getProductDetail();
  }
};
</script>
