// 引入封装的发送请求的接口文件 
import { reqGetUserAddress, reqGetOrderList } from '@/api/index.js'

// trade模块小仓库
const state = {
    address: [],
    orderList: {},
}
const actions = {
    // 获取用户地址信息
    async getUserAddress({ commit }) {
        let result = await reqGetUserAddress()
            // console.log(result, '600');
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data)
        }
    },

    // 获取提交订单页面的商品清单数据
    async getOrderList({ commit }) {
        let result = await reqGetOrderList()
            // console.log(result, '333');
        if (result.code == 200) {
            commit('GETORDERLIST', result.data)
        }
    },
}
const mutations = {
    GETUSERADDRESS(state, address) {
        state.address = address
    },
    GETORDERLIST(state, orderList) {
        state.orderList = orderList
    }
}
const getters = {}

// 对外暴露
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}