import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/Login',
        },
        {
            path: '/Home',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: {title: '商品兑换'},
            children:[
                {
                    path: '/Dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: {title: '首页'},
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve)
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
       
        {
            path: 'Dashboard',
            redirect: '/Dashboard'
        }
    ]
})