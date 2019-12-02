import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import login from './login';

export default () => {
    const store = new Vuex.Store({
        modules: {
            login
        }
    });
    return store;
};