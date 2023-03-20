import Vue from 'vue'
import Vuex from 'vuex'

// 需要使用一次Vuex
Vue.use(Vuex)

// 在总仓中，引入小仓库
import home from './home/index.js'
import search from './search/index.js'
import detail from './detail/index.js'
import shopcart from "./shopcart/shopcart.js"
import user from './user/user.js'
import trade from './trade/trade.js'

// 对外暴露store类的一个实例
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade,
    }
})