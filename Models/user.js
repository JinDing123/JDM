import http from 'util/http';


const Http = http.constructor;

class User extends Http {
    getUserLists(params = {}) {
        return this.request({
            url: '/user/list.do',
            data: params.data || {}
        });
    }
};

export default new User();