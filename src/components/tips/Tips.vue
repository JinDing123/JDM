<template>
  <div class="tip" v-if="tipInfo.tipKey">
    <div :class="tipClass" role="alert" >
      {{ tipInfo.tipMsg }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tipInfo: {
      type: Object,
      default() {
        return {
          tipMsg: "",
          tipType: 1,
          showTipTime: 0, // 控制tip显示，到指定时间关闭
          tipKey: false 
        };
      }
    }
  },
  computed: {
    tipClass() {
      const { tipType } = this.tipInfo;
      return `alert alert-${this.tip[this.tipInfo.tipType]}`;
    },
    showTipTime() {
      return this.tipInfo.showTipTime; // 计算属性监听到 showTipTime，但是没有使用模板中没有调用它，它第一次没有使用，我也不需要它使用，它只是一个中间层, 传值进来，showTipTime发生变化，computed监听发生变化 => watch监听到了，然后执行对应的handler
    }
  },
  data() {
    return {
      tip: {
        1: "success",
        2: "danger",
        3: "info"
      }
    };
  },
  watch: {
    showTipTime: {
      // 监听显示时间，到指定时间关闭
      handler(newValue) {
        newValue = newValue.toString().slice(0, 4) * 1000 + 200;  // 利用随机数解决当持续时间相同不会触发watch的bug
        console.log("持续时间为", newValue + '毫秒');
        setTimeout(() => {
          this.tipInfo.tipKey = false;
        }, newValue);
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.tip
  position: absolute
  width: 100%
  height: 30px

</style>
