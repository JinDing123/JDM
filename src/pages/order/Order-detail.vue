<template>
  <div>
    <tips :tipInfo="tipInfo" />

    <div class="form-horizontal">
      <div class="form-group">
        <label class="col-md-2 control-label">订单号</label>
        <div class="col-md-5">
          <p class="form-control-static">{{ orderInfo.orderNo }}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-2 control-label">创建时间</label>
        <div class="col-md-5">
          <p class="form-control-static">{{ orderInfo.createTime }}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-2 control-label">收件人</label>
        <div class="col-md-5">
          <p class="form-control-static">
            {{ receiverInfo.receiverName }}，
            {{ receiverInfo.receiverProvince }}
            {{ receiverInfo.receiverCity }}
            {{ receiverInfo.receiverAddress }}
            {{ receiverInfo.receiverMobile || receiverInfo.receiverPhone }}
          </p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-2 control-label">订单状态</label>
        <div class="col-md-5">
          <p class="form-control-static">
            {{ orderInfo.statusDesc }}
            <button
              v-if="orderInfo.status === 20"
              class="btn btn-default btn-sm btn-send-goods"
              @Click="onSendGoods"
            >
              立即发货
            </button>
          </p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-2 control-label">支付方式</label>
        <div class="col-md-5">
          <p class="form-control-static">
            {{ orderInfo.paymentTypeDesc }}
          </p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-2 control-label">订单金额</label>
        <div class="col-md-5">
          <p class="form-control-static">￥{{ orderInfo.payment }}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-2 control-label">商品列表</label>
        <div class="col-md-10">
          <table-list :tHeadLists="tHeadLists">
            <template #tBody>
              <tr
                v-for="list in orderInfo.orderItemVoList"
                :key="list.productId"
              >
                <th>
                  <img
                    :src="orderInfo.imageHost + list.productImage"
                    alt=""
                    class="p-img"
                  />
                </th>
                <th>{{ list.productName }}</th>
                <th>{{ list.currentUnitPrice }}</th>
                <th>{{ list.quantity }}</th>
                <th>{{ list.totalPrice }}</th>
              </tr>
            </template>
          </table-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tips from "components/tips/Tips";
import TableList from "components/table-lists/TableList";
import orderModel from "models/order";
import getTip from "util/getTip";
export default {
  props: {
    id: String
  },
  components: {
    Tips,
    TableList
  },
  data() {
    return {
      orderInfo: {},
      receiverInfo: {},
      tipInfo: {},
      tHeadLists: [
        { value: "商品图片", width: "15%" },
        { value: "商品信息", width: "20%" },
        { value: "单价", width: "15%" },
        { value: "数量", width: "15%" },
        { value: "合计", width: "15%" }
      ],
      tBodyLists: []
    };
  },
  methods: {
    getOrderDetail() {
      orderModel
        .getOrderDetail({
          data: {
            orderNo: this.id
          }
        })
        .then(res => {
          this.orderInfo = res;
          if (res.shippingVo) {
            this.shippingVo = res.shippingVo;
          }
        });
    },
    onSendGoods() {
      // 发货
      orderModel
        .sendGoods({
          data: {
            orderNo: this.id
          }
        })
        .then(res => {
          this.tipInfo = getTip(res, 1);
          this.getOrderDetail();
        });
    }
  },
  mounted() {
    this.getOrderDetail();
  }
};
</script>

<style lang="stylus" scoped>
.btn-send-goods
    margin-left: 10px
.p-img
    display: block
    width: 80px
    height: 80px
.form-control-static
    background: #fefefe
    padding-left: 10px
</style>
