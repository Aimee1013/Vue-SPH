// 配置路由信息

// 引入一级路由组件
// import Home from '@/pages/Home/Home.vue'
import Login from '@/pages/Login/Login.vue'
import Register from '@/pages/Register/Register.vue'
// import Search from '@/pages/Search/Search.vue'
import Detail from '@/pages/Detail/Detail.vue'
import AddCartSuccess from '@/pages/AddCartSuccess/AddCartSuccess.vue'
import ShopCart from '@/pages/ShopCart/ShopCart.vue'
import Trade from '@/pages/Trade/Trade.vue'
import Pay from '@/pages/Pay/Pay.vue'
import PaySuccess from '@/pages/PaySuccess/PaySuccess.vue'
import Center from '@/pages/Center/Center.vue'

// 引入二级路由组件
import MyOrder from '@/pages/Center/MyOrder/MyOrder.vue'
import GroupOrder from '@/pages/Center/GroupOrder/GroupOrder.vue'

// 配置并暴露路由信息
export default [{ //配置重定向路由路径
        path: "/",
        redirect: "/home",
        // 配置路由元信息
        meta: { show: true }
    }, {
        path: "/home",
        // 路由懒加载：当路由被访问的时候才加载对应组件，这样就会更加高效
        component: () =>
            import ('@/pages/Home/Home.vue'),
        meta: { show: true }
    },
    {
        path: "/login",
        component: Login,
        meta: { show: false }
    },
    {
        path: "/register",
        component: Register,
        meta: { show: false }
    },
    {
        path: "/search/:keyword?", //路由传参占位(字符串形式)--params
        component: () =>
            import ('@/pages/Search/Search.vue'),
        meta: { show: true },
        name: 'search',
    },
    {
        path: "/detail/:skuid", //params传参需占位  /detail/:skuid
        component: Detail,
        meta: { show: true }
    },
    {
        path: "/addcartsuccess",
        component: AddCartSuccess,
        meta: { show: true },
        name: 'addcartsuccess',
    },
    {
        path: "/shopcart",
        component: ShopCart,
        meta: { show: true },
    }, {
        path: "/trade",
        component: Trade,
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 只有跳转至交易页面的路由来自购物车，才可放行跳转，来自其他路由不允许跳转
            if (from.path == '/shopcart') {
                next()
            } else {
                next(false)
            }
        },
    }, {
        path: "/pay",
        component: Pay,
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            //  只有路由从交易页面来，才可跳转至付款页面，从其他路由来不许跳转，要停留在当前页面
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: "/paysuccess",
        component: PaySuccess,
        meta: { show: true },
    },
    {
        path: "/center",
        component: Center,
        meta: { show: true },
        // 二级路由组件
        children: [{
                //配置二级路由的重定向路由路径
                path: "/center",
                redirect: "/center/myorder",
            },
            {
                path: 'myorder',
                component: MyOrder,
            },
            {
                path: 'grouporder',
                component: GroupOrder,
            }
        ],
    },
]