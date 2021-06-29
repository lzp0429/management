import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

//创建一个store仓库
const store = new Vuex.Store({
    state: {
        //测试数据-------------公共数据少的情况下不建议vueX!!!!!!!!!!!!!!!!!!!!!
        //全局参数
        key: false,
        //全局应用的id
        id: {

        },
    },
    //定义取数据
    mutations: {
        //测试方法-------------公共数据少的情况下不建议vueX!!!!!!!!!!!!!!!!!!!!!
        isShow(state, is) {
            state.key = true
        },
    }
})

export default store;