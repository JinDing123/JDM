import http from 'util/http';

const Http = http.constructor;

class Category extends Http {
    getCategory(params = {}) {
        return this.request({
            url: "/category/get_category.do",
            data: params.data || {}
        });
    }
    changeCategoryName(params = {}) {
        return this.request({
            url: '/category/set_category_name.do',
            data: params.data
        });
    }

};

export default new Category();
