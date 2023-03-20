// 引入封装的用户登录注册的接口文件
import { reqGetCode, reqGetUserRegister, reqGetUserLogin, reqGetUserInfo, reqGetUserLogout } from '@/api/index.js'

// 用户登录、注册模块小仓库

const state = {
    code: '',
    token: localStorage.getItem('token'),
    userInfo: {},
}

const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        console.log(result);
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 用户注册
    async getUserRegister({ commit }, user) {
        let result = await reqGetUserRegister(user)
        console.log(result, '000');
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 用户登录【token】 
    async getUserLogin({ commit }, data) {
        let result = await reqGetUserLogin(data)
            // console.log(result, '852');
            // 登录成功后，服务器会下发token，是用户的唯一标识，通过带token向服务器要用户信息进行展示
        if (result.code == 200) {
            // 此时用户已登录成功且获得token
            commit('GETUSERLOGIN', result.data.token)
                // 需要持久化存储token
            localStorage.setItem('token', result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 获取用户信息【通过token】(这里的action要在home组件挂载完毕后派发)
    async getUserInfo({ commit }) {
        let result = await reqGetUserInfo()
        console.log(result, '***');
        if (result.code == 200) {
            // 提交用户的信息
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 用户退出登录
    async getUserLogout({ commit }) {
        let result = await reqGetUserLogout()
            // actions中不能操作state，需要提交到mutations中修改state
        if (result.code == 200) {
            commit('CLEARUSERINFO')
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    }

}

const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    GETUSERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    // 清除仓库中用户登录的信息，及本地存储的数据
    CLEARUSERINFO(state) {
        state.token = '';
        state.userInfo = {};
        localStorage.removeItem('removeToken')
    }

}

const getters = {}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}