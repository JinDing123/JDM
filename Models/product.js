import http from 'util/http';

const Http = http.constructor;

class ProductModel extends Http {
    constructor() {
        super();  // Http.call(this) 塑造自己的this
        this.productType = {
            name: '商品名称不能为空',
            subtitle: '商品描述不能为空',
            price: '商品价格不能为空',
            stock: '商品库存不能为空'
        };
    }
    getProduct(params = {}) {
        return this
            .request({
                url: params.url || "/product/list.do",
                data: params.data || {}
            })
    }
    getCategory(params = {}) {
        return this
            .request({
                url: "/category/get_category.do",
                data: params.data || {}
            })
    }
    searchProductList(params) {
        return this.request({
            url: '/product/search.do',
            data: params.data
        })
    }
    handleAddOrEditProduct(e) {
        return this
            .request({
                url: "/product/save.do",
                data: e
            })
    }
    getProductDetail(id) {
        return this
            .request({
                url: "/product/detail.do",
                data: {
                    productId: id
                }
            });
    }
    setSaleStatus(params) {
        return this.request({
            url: "/product/set_sale_status.do",
            data: params.data
        })
    }
    productAddNotNull(product) {
        for (let [key, value] of Object.entries(product)) {
            if (!value) {
                return this.productType[key];
            };
        };
        return false; // 全都符合返回false
    }

};


export default new ProductModel();