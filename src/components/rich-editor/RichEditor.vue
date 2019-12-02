<template>
  <div ref="editor"></div>
</template>

<script>
import E from "wangeditor";
export default {
  props: {
    editorExistValue: String
  },
  data() {
    return {
      editor: {}
    };
  },
  watch: {
    editorExistValue() {
      this.editor.cmd.do("insertHTML", this.editorExistValue);
    }
  },
  methods: {
    initEditor() {
      const editor = new E(this.$refs.editor);
      editor.customConfig.onchange = this.editorChange;
      this.uploadImg(editor); // 上传图片：
      editor.create();
      this.editor = editor;
    },
    editorChange(html) {
      this.$emit("getEditorValue", html);
    },
    uploadImg(editor) {
      editor.customConfig.uploadImgServer =
        "/api/manage/product/richtext_img_upload.do"; // 富文本上传图片的地址
      editor.customConfig.uploadFileName = "upload_file"; // name
      editor.customConfig.uploadImgHooks = {
        customInsert(insertImg, result, editor) {
          insertImg(result.file_path);
        }
      };
    }
  },
  mounted() {
    this.initEditor();
  }
};
</script>
