<template>
  <div class="wrapper">
    <div class="left-wrapper">
      <left-slider-bar />
    </div>
    <div class="right-wrapper">
      <right-content />
    </div>
  </div>
</template>

<script>
import LeftSliderBar from "./Left-Slidebar";
import RightContent from "./Right-Content";
export default {
  name: "layout",
  components: {
    LeftSliderBar,
    RightContent
  }
};
</script>

<style lang="stylus" scoped>
// .container-fluid
//   padding-left: 0px
.wrapper
  // padding-left: 0px !important
  display: flex
  // position: relative
  .left-wrapper
    width: 260px
  .right-wrapper
    flex: 1
</style>
