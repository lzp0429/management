import request from '../utils/request';

// 登录
export const login = {
    loginUser(data){
        return request({
            url:'/login/pcLogin?password=' + data.password + '&username=' + data.username,
            method:'POST',
            data:data,
            xhrFields: { 
                withCredentials: true//允许带上凭据
            },
            crossDomain: true,
        })
    },
    goLogin(query){
        return request({
            url:'/GetToken',
            method:'POST',
            data:query
        })
    }
}
//家庭积分兑换
export const family = {
    familyList(data){
        return request({
            url:'/pc/family/selectFamilyIntegralDetail',
            method:'POST',
            data:data
        })
    },
    shopList(data){
        return request({
            url:'/pc/shop/selectConversionShop',
            method:'POST',
            data:data
        })
    },
    familyPeople(query){
        return request({
            url:'/pc/family/selectFamilyIntegralPeople',
            method:'POST',
            data:query
        })
    },
    convenHandel(query){
        return request({
            url:'/pc/shop/conversionShopByUserNumber',
            method:'POST',
            data:query
        })
    }
}

//商品管理
export const shopManage ={
    manageList(query){
        return request({
            url:'/pc/shop/selectShopList',
            method:'POST',
            data:query
        })
    },
    addShop(query){
        return request({
            url:'/pc/shop/addShop',
            method:'POST',
            data:query
        })
    },
    changeKuCun(query){
        return request({
            url:'/pc/shop/updateShopResidual',
            method:'POST',
            data:query
        })
    },
    updataShopStatus(query){
        return request({
            url:'/pc/shop/updateShopStatus',
            method:'POST',
            data:query
        })
    }
}

//商品兑换
export const shopCoin = {
    getShopList(query){
        return request({
            url:'/pc/shop/conversionShopList',
            method:'POST',
            data:query
        })
    },
    getShop(query){
        return request({
            url:'/pc/shop/conversionShop',
            method:'POST',
            data:query
        })
    }
}

