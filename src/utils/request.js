import axios from 'axios';
//无论是cookie或者token都需要匹配后端的框架进行设置
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'; //配置请求头
const service = axios.create({
        // baseURL: 'http://192.168.0.9:8093/', //本地
        baseURL: 'https://jifen.westoline.com:8088/integral-0.0.1-SNAPSHOT/', //线上
        xhrFields: { 
            withCredentials: true//允许带上凭据
        },
        crossDomain: true,
        //全局域名只需要在这里进行切换，请求方法统一放在api的index.js里，页面只需引入然后使用
        timeout: 5000
    })
    //请求拦截器
service.interceptors.request.use(config => {
    config.headers.token  = localStorage.getItem('token') 
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

//响应拦截器
service.interceptors.response.use(response => {
   return response
}, error => {
    console.log(error);
    return Promise.reject();
})

export default service;