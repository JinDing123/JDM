import axios from 'axios';
import storage from './storage';
import getStore from 'store';

const store = getStore();

class Http {
    request(params) {
        return new Promise((resolve, reject) => {
            let config = {
                url: '/api/manage' + params.url,
                method: params.method || 'GET',
                data: params.data || '',
            };
            config.params = params.method ? '' : params.data;  
            axios(config)
                .then(res => {
                    res = res.data;
                    if (res.status === 0) {
                        resolve(res.data);
                    } else if (res.status === 10) {
                        alert('您的登录状态失效, 请重新登录');
                        storage.removeStorage('loginStatus');
                        store.dispatch('login/loginSync', {});
                        window.location.href = '/login';
                    } else {
                        reject(res.msg || res.data);
                    }
                })
                .catch(err => {
                    reject(err.statusText)
                })
        });
    }
};


export default new Http();