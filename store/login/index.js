import storage from 'util/storage';

export default {
    namespaced: true,
    state: {
        isLogin: false,
        sUsername: ''
    },
    getters: {
        login(state) {
            return state.isLogin;
        },
        username(state) {
            return state.sUsername;
        }
    },
    mutations: {
        login(state, payload) {
            state.isLogin = payload.isLogin;
            state.sUsername = payload.username;
        }
    },
    actions: {
        loginSync({commit}, payload) {
            // 提交mutations的
            commit('login', payload);
        }
    }
};