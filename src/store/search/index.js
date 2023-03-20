// 引入封装的发送请求的接口文件
import { reqGetSearchInfo } from '@/api/index.js'


// search模块的小仓库

// state:仓库存储数据的地方
const state = {
        searchList: {},
    }
    // actions:处理actions，可以书写自己的业务逻辑，也可以处理异步
const actions = {
        // 通过api中的接口调用，向服务器发送请求，获取服务器的数据
        // 请求搜索模块数据
        async getSearchList({ commit }, params = {}) {
            // params形参是当用户派发action的时候，第二个参数传递来的，至少是一个空对象
            let result = await reqGetSearchInfo(params)
            console.log(result, '6666');
            if (result.code == 200) {
                commit('GETSEARCHLIST', result.data)
            }
        }
    }
    // mutations:修改state的唯一手段
const mutations = {
        GETSEARCHLIST(state, searchList) { state.searchList = searchList; }

    }
    // getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    // 获取当前小仓库中goodsList的数据，随后放到组件中渲染
    goodsList(state) { //此时的state是当前小仓库的state
        return state.searchList.goodsList || []; //|| [] 以防无网络时，数据加载不出来，会显示undefined
    },
    trademarkList(state) {
        return state.searchList.trademarkList;
    },
    attrsList(state) {
        return state.searchList.attrsList;
    }
}

// 对外暴露
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}