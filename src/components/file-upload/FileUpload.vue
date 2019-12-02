<template>
  <div>
    <file-upload
      post-action="/api/manage/product/upload.do"
      extensions="jpg,gif,png,webp"
      accept="image/png, image/gif, image/jpeg, image/webp"
      class="btn btn-success"
      name="upload_file"
      ref="upload"
      :data="{}"
      :multiple="true"
      @input-file="uploadImg"
      v-model="files"
      v-show="!loadedImg"
      >上传图片</file-upload
    >
  </div>
</template>

<script>
import FileUpload from "vue-upload-component";

export default {
  props: {
    loadedImg: {
      type: Boolean,
      default: false
    }
  },
  components: {
    FileUpload
  },
  data() {
    return {
      files: []
    };
  },
  methods: {
    uploadImg(newFile, oldFile) {
      if (newFile && !oldFile) {
        // 图片上传到本地成功,开始发送给服务器,隐藏添加图片按钮，等到图片成功上传到服务器之后再次显示
        this.$emit("isLoadImg", true);
      }
      if (
        Boolean(newFile) !== Boolean(oldFile) ||
        oldFile.error !== newFile.error
      ) {
        // 本地图片上传成功之后，直接向服务器发起请求
        if (!this.$refs.upload.active) {
          this.$refs.upload.active = true;
        }
      }
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // 图片上传成功
        const { status, data } = newFile.response;
        if (status !== 0) {
          this.$emit("uploadImgFailed", "图片上传失败");
        } else {
          this.$emit("uploadImgSuccess", data);
        }
        this.$emit("isLoadImg", false); // 图片上传完毕，显示上传图片
      }
    }
  }
};
</script>
