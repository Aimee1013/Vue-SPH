// 引入封装的发送请求的接口文件
import { reqGetCategorylist } from '@/api/index.js'
import { reqGetBannerList } from '@/api/index.js'
import { reqGetFloorList } from '@/api/index.js'



// home模块的小仓库
// state:仓库存储数据的地方
const state = {
        // state中数据的默认初始值，要根据服务器返回的数据类型来写（即返回对象写对象，返回数据写数组）
        categoryList: [], // 三级联动数据
        getBannerList: [], // 轮播图数据
        getFloorList: [], // floor数据
    }
    // actions:处理actions，可以书写自己的业务逻辑，也可以处理异步
const actions = {
        // 通过api中的接口调用，向服务器发送请求，获取服务器的数据
        // 请求 category 数据
        async categoryList({ commit }) {
            let result = await reqGetCategorylist();
            // console.log(result);
            if (result.code == 200) {
                commit('CATEGORYLIST', result.data);
            }
        },
        // 请求 banners 数据
        async getBannerList({ commit }) {
            let result = await reqGetBannerList();
            // console.log(result);
            if (result.code == 200) {
                commit('GETBANNERLIST', result.data)
            }
        },
        // 请求floor数据
        async getFloorList({ commit }) {
            let result = await reqGetFloorList();
            // console.log(result, '9999');
            if (result.code == 200) {
                // 如果拿到数据，提交mutation
                commit('GETFLOORLIST', result.data)
            }
        },
    }
    // mutations:修改state的唯一手段
const mutations = {
        CATEGORYLIST(state, categoryList) {
            state.categoryList = categoryList;
        },
        GETBANNERLIST(state, getBannerList) {
            state.getBannerList = getBannerList;
        },
        GETFLOORLIST(sate, getFloorList) {
            state.getFloorList = getFloorList
        }
    }
    // getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}

// 对外暴露
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}