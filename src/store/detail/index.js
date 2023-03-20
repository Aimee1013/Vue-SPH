// 引入封装的发送请求的接口文件
import { reqGetGoodsInfo, ReqAddOrUpdateShopCart } from '@/api/index.js'
import { getUUID } from '@/utils/uuid_token.js'

// detail模块的小仓库

// state:仓库存储数据的地方
const state = {
    goodsInfo: {},
    // 游客的临时身份
    uuid_token: getUUID()
}

const actions = {
    // 获取产品信息的actions
    async getGoodsInfo({ commit }, skuid) {
        let result = await reqGetGoodsInfo(skuid)
        if (result.code == 200) {
            commit('GETGOODSINFO', result.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        // 加入购物车 返回的解构
        let result = await ReqAddOrUpdateShopCart(skuId, skuNum)
            // 表示服务器加入购物车成功
        if (result.code == 200) {
            return 'ok'
        } else {
            // 表示服务器加入购物车失败
            return Promise.reject(new Error('fail'))
        }
    }
}

const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }
}

// 简化获取state的数据
const getters = {
    // 路径导航简化的数据
    categoryView(state) {
        // 要保证当前计算出的categoryView属性值，至少是一个空对象，就不会出现假报错信息了
        return state.goodsInfo.categoryView || {}
    },
    // 商品信息简化的数据
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    // 商品售卖属性的简化数据
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || []
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