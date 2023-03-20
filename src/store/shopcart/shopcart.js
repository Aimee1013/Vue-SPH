// 引入封装的发送请求的接口文件
import { ReqGetCartList, reqGetDeleteCartById, reqUpdateCheckCartedById } from '@/api/index.js'

// shopcart模块小仓库

const state = { cartList: [] }

const actions = {
    // 获取购物车列表数据
    async getCartList({ commit }) {
        let result = await ReqGetCartList()
            // console.log(result, '00010');
        commit('GETCARTLIST', result.data)
    },
    // 获取删除购物车产品的数据
    async deleteCartById({ commit }, skuId) {
        let result = await reqGetDeleteCartById(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 修改购物车某个商品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckCartedById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 删除选中的全部商品
    deleteAllChecked({ dispatch, getters }) {
        // 获取购物车中全部的商品，然后循环遍历，并判断，派发删除任务把选中的删除
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartById', item.skuId) : ''
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll)
    },
    // 全选操作
    updateAllChecked({ dispatch, state }, isChecked) {
        // console.log(dispatch);
        // console.log(state);
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach((item) => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}

const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }

}

const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
}

// 对外暴露
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}