import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import {
    messages
} from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import "babel-polyfill";


import echarts from 'echarts'

Vue.prototype.$echarts = echarts 


Vue.prototype.$bus = new Vue
Vue.config.productionTip = false
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
// axios.defaults.withCredentials = true; //让ajax携带cookie
Vue.prototype.$axios = axios;
const i18n = new VueI18n({
    locale: 'zh',
    messages
})



//使用钩子函数对路由进行权限跳转，当权限确定只有用户和管理员或者3种以内时可以考虑路由钩子函数
//通过meta元信息进行身份判定
//更多情况使用动态路由
// router.beforeEach((to, from, next) => {

// })


new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app')