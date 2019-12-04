<template>
  <div class="product-add">
    <tips :tipInfo="tipInfo" />
    <p class="title">商品管理 -- 添加商品</p>
    <product-input @handleSubmitToParent="handleAddProductSubmit">
      <template #product-img>
        <div
          class="img-icon-wrapper"
          v-for="(imgUrl, index) in imgUrls"
          :key="imgUrl"
        >
          <img class="sub-img" :src="imgUrl" />
          <i class="fa-close" @click="deleteImgUrl(index)">x</i>
        </div>
        <loading v-show="loadedImg" class="load-left" />
      </template>
      <template #upload-img>
        <file-upload
          @uploadImgFailed="uploadImgFailed"
          @uploadImgSuccess="uploadImgSuccess"
          @isLoadImg="isLoadImg"
          :loadedImg="loadedImg"
        />
      </template>
      <template #product-category>
        <select-category
          @getSelectId="getSelectCategoryId"
          categoryType="productAdd"
        />
      </template>
      <template #rich-edtior>
        <RichEditor @getEditorValue="getEditorValue" />
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
import FileUpload from "components/file-upload/FileUpload";
import Tips from "components/tips/Tips";
import Loading from "components/loading/Loading";
import RichEditor from "components/rich-editor/RichEditor";
import getTip from "util/getTip";
import productModel from "models/product";

export default {
  name: "product-add",
  components: {
    ProductInput,
    SelectCategory,
    FileUpload,
    RichEditor,
    Tips,
    Loading
  },
  data() {
    return {
      firstCategoryId: "",
      tipInfo: {},
      loadedImg: false,
      imgUrls: [],
      imgUris: [],
      editorValue: ""
    };
  },
  methods: {
    getEditorValue(html) {
      this.editorValue = html;
    },
    isLoadImg(key) {
      this.loadedImg = key;
    },
    uploadImgFailed() {
      // 图片过大上传失败，提示用户
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
    getSelectCategoryId(e) {
      // select 组件传出来的
      this.firstCategoryId = e.firstCategoryId;
    },
    handleAddProductSubmit(e) {
      const productAddInfo = {
        categoryId: this.firstCategoryId,
        subImages: this.imgUris.join(","),
        detail: this.editorValue,
        price: e.price,
        stock: e.stock,
        name: e.name,
        subtitle: e.subtitle,
        status: 1
      };
      let productAddNotNull = productModel.productAddNotNull(e);
      if (productAddNotNull) {
        this.tipInfo = getTip(productAddNotNull, 2);
        return;
      }
      productModel
        .handleAddOrEditProduct(productAddInfo)
        .then(res => {
          this.tipInfo = getTip(res, 1);
          setTimeout(() => {
            this.$router.push("/product");
          }, 1500);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
