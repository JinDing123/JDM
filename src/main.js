import Vue from 'vue';
import App from './App';

import './static/css/global.styl';

import getRouter from 'routes';
import getStore from 'store';

const router = getRouter();
const store = getStore();

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#root');



