import http from 'util/http';

const Http = http.constructor;

class Login extends Http {
    login(params) {
        return this.request({
            url: '/user/login.do',
            method: 'POST',
            data: params.data
        })
    }
};

export default new Login();