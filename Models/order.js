import http from 'util/http';

const Http = http.constructor;

class Order extends Http {
    getOrder(params = {}) {
        return this.request({
            url: '/order/list.do',  // 搜索页面有自己的url
            data: params.data || {}
        })
    }
    getOrderDetail(params = {}) {
        return this.request({
            url: '/order/detail.do',
            data: params.data || {}
        })
    }
    sendGoods(params) {
        return this.request({
            url: '/order/send_goods.do',
            data: params.orderNo
        })
    }
    searchOrderList(params) {
        return this.request({
            url: '/order/search.do',
            data: params.data
        })
    }
};

export default new Order();