// 配置路由的文件
// 引入vue
import Vue from 'vue'
// 引入vue的路由插件
import VueRouter from 'vue-router'
// 引入配置的路由文件
import routes from './routes.js'

// 使用插件
Vue.use(VueRouter)


// 引入store
import store from '@/store/index.js'

// 配置路由（暴露路由器，使用路由器来管理一组一组的路由）
let router = new VueRouter({
    // 配置一组一组的路由
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})

// 全局前置守卫（即在路由跳转之前，判断是否可跳转）
router.beforeEach(async(to, from, next) => {
    // to:要跳转的路由   from:从哪个路由跳转   next:放行函数   next():放行    next('/login'):放行到指定的路由中
    // 为了测试通过，先全部放行
    // next();
    // 用户登录后，可获取token
    let token = store.state.user.token;
    // 用户登录，且有用户名
    let name = store.state.user.userInfo.name;
    // 判断：如果有token，说明用户已经登陆了，若用户想到login页面，会直接停留在home页面（即已经登录的用户不能再次进入登录页面）
    if (token) {
        if (to.path == '/login' || to.path == '/register') {
            next('/home')
        } else {
            // 用户已登录，且有用户名，但去的不是登录页，就可放行
            if (name) {
                next();
            } else {
                // 用户已登录，但没有用户信息，派发action，获取用户登录信息存在仓库，在首页展示，然后再跳转
                try {
                    // 获取用户信息成功后，放行
                    await store.dispatch('user/getUserInfo')
                    next();
                } catch (error) {
                    // 带的token过期了，不能成功获取用户信息，此时需要清除用户信息，重新登录
                    // 调清除用户信息的接口，清除成功后，放行跳转到登录路由
                    await store.dispatch('user/getUserLogout')
                    next('/login')
                }
            }

        }
    } else {
        // 用户未登录，暂时先全部先放行，以后再处理   next()
        // 用户未登录处理：未登录不能去交易相关页面（trade）、不能去支付相关页面（pay、paysuccess）、不能去个人中心页面；
        // 获取跳转至的路径
        // console.log(to.path); 
        let toPath = to.path
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            // 若未登录用户要跳转至这些页面，会自动先跳至登录页；(登录组件需判断用户登录之前是否有想过其他页面，若有，登录后先跳转至该页面，不直接进入登录页)
            next('/login?redirect=' + toPath)
        } else {
            // 若未登录用户要跳转至除此之外的其他页面（eg:home、search、shopcart），可直接放行
            next()
        }


    }
})

export default router;


const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}