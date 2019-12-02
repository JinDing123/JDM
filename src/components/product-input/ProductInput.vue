<template>
  <div class="form-wrap col-md-12">
    <div class="form-horizontal">
      <div class="form-group">
        <label for="subtitle" class="col-md-2 control-label">商品名称</label>
        <div class="col-md-5">
          <input
            type="text"
            class="form-control"
            name="subtitle"
            id="subtitle"
            placeholder="请输入商品名称"
            @input="
              e => {
                handleInputChange('productNameHook', e);
              }
            "
            :value="productNameHook"
            :disabled="disabled"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="desc" class="col-md-2 control-label">商品描述</label>
        <div class="col-md-5">
          <input
            type="text"
            class="form-control"
            name="desc"
            id="desc"
            placeholder="请输入商品描述"
            @input="
              e => {
                handleInputChange('productSubtitleHook', e);
              }
            "
            :value="productSubtitleHook"
            :disabled="disabled"
          />
        </div>
      </div>
      <slot name="status"/>
      <div class="form-group">
        <label class="col-md-2 control-label">所属分类</label>
        <div class="col-md-10">
          <slot name="product-category" />
        </div>
      </div>
      <div class="form-group">
        <label for="product-price" class="col-md-2 control-label"
          >商品价格</label
        >
        <div class="col-md-3">
          <div class="input-group">
            <input
              type="number"
              class="form-control"
              id="product-price"
              placeholder="价格"
              @input="
                e => {
                  handleInputChange('productPriceHook', e);
                }
              "
              :value="productPriceHook"
              :disabled="disabled"
            />
            <div class="input-group-addon">元</div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="product-stock" class="col-md-2 control-label"
          >商品库存</label
        >
        <div class="col-md-3">
          <div class="input-group">
            <input
              type="number"
              class="form-control"
              id="product-stock"
              placeholder="库存"
              @input="
                e => {
                  handleInputChange('productStockHook', e);
                }
              "
              :value="productStockHook"
              :disabled="disabled"
            />
            <div class="input-group-addon">件</div>
          </div>
        </div>
      </div>

      <!-- 用插槽把图片和富文本抛给外面 -->
      <div class="form-group">
        <label class="col-md-2 control-label">商品图片</label>
        <div class="col-md-10">
          <slot name="product-img" />
          <div style="clear: both;">
            <slot name="upload-img" />
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-2 control-label">商品详情</label>
        <div class="col-md-10">
          <slot name="rich-edtior"/>
        </div>
      </div>
      <!-- 如果slot便签上面定义了类名，插入的元素还会不会有这个类名 -->
      <!-- 富文本编辑器上传图片失败的tip提示 -->
      <div class="form-group">
        <div class="col-md-offset-2 col-md-10">
          <slot name="btn" :handleSubmit="handleSubmit" />
          <!-- 外部传进来的btn，它触发的事件是这个组件的事件，而不是外部组件的事件，点击btn之后，它向外部组件传递一个自定义事件啊 -->
          <!-- <button v-slot:btn>这样用吗</button>  -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 不用v-model, 用value绑定input，value的值外部传进来的,你传来的productPrice有值，我就显示，在商品详情里面会传价格进来，所以我就有显示，你添加商品没有传进来，所以我就没有值

//  使用 oninput事件模仿v-model，值发生变化，修改productPriceHook值，然后把productPriceHook值传给父组件，这样就达到了不修改父组件传过来的数据了，但是还是能够把新的值传给父组件
export default {
  name: "product-input",
  props: {
    // 用于 修改页 || 详情页的时候，price都是有值的，所以这个必须是要接受值的
    // 但是在添加页面，它又是没值的，并且它还要修改值
    productName: {
      type: String,
      default: ""
    },
    productSubtitle: {
      type: String,
      default: ""
    },
    productPrice: Number,
    productStock: Number,
    disabled: {
        type: Boolean,
        default: false
    }
  },
  data() {
    return {
      //   不修改父组件传进来的值，修改它里面的值，把里面的值给传出去
      productNameHook: "",
      productSubtitleHook: "",
      productPriceHook: "",
      productStockHook: ""
    };
  },
  watch: {
    // 编辑  || 详情页传递进来值的时候，修改的是 productPrice，但是input的value绑定的是 productPriceHook，所以直接把直接监听productPrice的变化，当它有值的时候给productPriceHook赋值
    productName(newValue) {
      this.productNameHook = newValue;
    },
    productSubtitle(newValue) {
      this.productSubtitleHook = newValue;
    },
    productPrice(newValue) {
      this.productPriceHook = newValue;
    },
    productStock(newValue) {
      this.productStockHook = newValue;
    }
  },
  methods: {
    handleInputChange(type, e) {
        // 当input改变，给input设置值，目的是为了添加商品页的时候，把值传出去
      this[type] = e.target.value;
      // console.log(this[type]);
    },
    handleSubmit() {
      // console.log("我点击了，触发的是子组件的事件");
      this.$emit("handleSubmitToParent", {
        name: this.productNameHook,
        subtitle: this.productSubtitleHook,
        price: this.productPriceHook,
        stock: this.productStockHook
      });
    }
  }
};
</script>
