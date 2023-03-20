// 该文件用于对发请求的api进行统一管理
// 引入二次封装的axios文件
import requests from '@/api/request.js'
import mockRequests from '@/api/mockRequest.js'

// 三级联动接口地址：/api/product/getBaseCategoryList; 请求方式：get; 无参数

// 对外暴露一个函数，使其他模块可以用
// 向该接口发请求（axios发请求返回的结果是promise对象）
export const reqGetCategorylist = () => {
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}


// 获取banner（Home首页轮播图的接口）
// export const reqGetBannerList = () => mockRequests.get('/banner')
export const reqGetBannerList = () => {
    return mockRequests({
        url: '/banner',
        method: 'get'
    })
}

// 获取floor数据
// export const reqGetFloorList = () => mockRequests.get('/floor')
export const reqGetFloorList = () => {
    return mockRequests({
        url: '/floor',
        method: 'get'
    })
}

// 获取搜索模块数据    接口请求地址：/api/list   请求方式：post  参数：需要
// {
//     'category3Id': '61',
//     'categoryName': '手机',
//     'keyword': '小米',
//     'order': '1:desc',
//     'pageNo': 1,
//     'pageSize': 10,
//     'props': ['1:1700-2799:价格', '2:6.65-6.74:屏幕尺寸'],
//     'trademark': '4:小米'
// }

// export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })
// 当前这个接口，获取搜索模块的数据，给服务器传递一个默认参数，至少是一个空对象
export const reqGetSearchInfo = (params) => {
    return requests({
        url: '/list',
        method: 'post',
        data: params
    })
}

// 获取产品详情信息的接口   接口地址（URL）：/api/item/{skuId}  请求方式：get
export const reqGetGoodsInfo = (skuid) => {
    return requests({
        url: `/item/${skuid}`,
        method: 'get'
    })
}

// 将产品添加到购物车中的接口（获取更新某一个产品的个数）
// 接口地址：/api/cart/addToCart/{skuId}/{skuNum}     请求方式：post
export const ReqAddOrUpdateShopCart = (skuId, skuNum) => {
    return requests({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'post'
    })
}

// 获取购物车列表数据的接口   接口地址：/api/cart/cartList     请求方式：get
export const ReqGetCartList = () => {
    return requests({
        url: '/cart/cartList',
        method: 'get'
    })
}

// 获取删除购物车产品的接口   接口地址：/api/cart/deleteCart/{skuId}     请求方式：delete
export const reqGetDeleteCartById = (skuId) => {
    return requests({
        url: `/cart/deleteCart/${skuId}`,
        method: 'delete'
    })
}

// 修改商品的选中状态    接口地址：/api/cart/checkCart/{skuId}/{isChecked}     请求方式：get
export const reqUpdateCheckCartedById = (skuId, isChecked) => {
    return requests({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get'
    })
}

// 获取验证码的接口    接口地址：/api/user/passport/sendCode/{phone}      请求方式：get
export const reqGetCode = (phone) => {
    return requests({
        url: `/user/passport/sendCode/${phone}`,
        method: 'get'
    })
}

// 用户注册的接口    接口地址：/api/user/passport/register    参数：phone password code     请求方式：post
export const reqGetUserRegister = (params) => {
    return requests({
        url: '/user/passport/register',
        data: params,
        method: 'post'
    })
}

// 用户登录的接口    接口地址：/api/user/passport/login    参数：phone password     请求方式：post
export const reqGetUserLogin = (params) => {
    return requests({
        url: '/user/passport/login',
        data: params,
        method: 'post'
    })
}

// 获取用户信息的接口（需带用户token过去）   接口地址：/api/user/passport/auth/getUserInfo    请求方式：get
export const reqGetUserInfo = () => {
    return requests({
        url: '/user/passport/auth/getUserInfo',
        method: 'get'
    })
}

// 用户退出登录的接口    接口地址：/api/user/passport/logout    请求方式：get
export const reqGetUserLogout = () => {
    return requests({
        url: '/user/passport/logout',
        method: 'get'
    })
}

// 获取用户地址信息的接口      接口地址：/api/user//userAddress/auth/findUserAddressList    请求方式：get
export const reqGetUserAddress = () => {
    return requests({
        url: '/user//userAddress/auth/findUserAddressList',
        method: 'get'
    })
}

// 获取提交订单页面的商品清单数据接口      接口地址：/api/order/auth/trade    请求方式：get
export const reqGetOrderList = () => {
    return requests({
        url: '/order/auth/trade',
        method: 'get'
    })
}

// 获取提交订单数据的接口    接口地址：/api/order/auth/submitOrder?tradeNo={tradeNo}    请求方式：post

// 该接口不再在vuex中发请求、管理数据，练习直接在组件中发请求的方法

export const reqGetSubmitOrder = (tradeNo, data) => {
    return requests({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method: 'post',
        data
    })
}

// 获取订单支付信息的接口     接口地址：/api/payment/weixin/createNative/{orderId}    请求方式：get

// 该接口不再在vuex中发请求、管理数据，练习直接在组件中发请求的方法

export const reqGetPayOrder = (orderId) => {
    return requests({
        url: `/payment/weixin/createNative/${orderId}`,
        method: 'get'
    })
}

// 获取查询订单支付状态接口    接口地址：/api/payment/weixin/queryPayStatus/{orderId}    请求方式：get
export const reqGetPayStatus = (orderId) => {
    return requests({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method: 'get'
    })
}

// 获取个人中心数据的接口      接口地址：/api/order/auth/{page}/{limit}    请求方式：get
export const reqGetMyOrderList = (page, limit) => {
    return requests({
        url: `/order/auth/${page}/${limit}`,
        method: 'get'
    })
}