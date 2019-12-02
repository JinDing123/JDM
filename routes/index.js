import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './route';

Vue.use(VueRouter);

import { mapGetters } from 'vuex';
import getStore from 'store';
import http from 'util/http';

const store = getStore();




// 不能实时获取到 vuex的isLogin
export default () => {
    const router = new VueRouter({
        mode: 'history',
        routes,
        linkExactActiveClass: 'active-router',
        scrollBehavior(to, from, savedPosition) { 
            if (savedPosition) {
                return savedPosition;
            } else {
                return { x: 0, y: 0 };
            }
        },
    });

    router.beforeResolve((to, from, next) => {
        const isLogin = store.getters['login/login']; 
        if (!isLogin) {
            if (to.path === '/login' || to.path === '/') {
                next();
            } else {
                alert('还没有登录，请登录');
                next('/login');
            };
        } else {
            if (to.path === '/login') {
                // 登录之后，通过url输入 /login, 提示用户不能重复登录，并且返回, 返回之前的url -1
                alert('您已经登录了，请勿重复登录!');
                next('/');
            };
            next();
        };
    });
    return router;
};