import Vue from 'vue'
import App from './App.vue'



// 引入三级联动组件，并注册为全局组件
import TypeNav from '@/components/TypeNav/TypeNav.vue'
// 注册为全局组件：Vue.component(全局组件的名字, 哪一个组件)
Vue.component(TypeNav.name, TypeNav)


// 引入分页器组件，并注册为全局组件
import Pagination from '@/components/pagination/pagination.vue'
Vue.component(Pagination.name, Pagination)

// element ui组件部分引入，并注册为全局组件
import { Button, MessageBox } from 'element-ui'
Vue.component(Button.name, Button);
// 注册组件，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入路由
import router from '@/router/index.js'
// 引入仓库
import store from "@/store/index.js"
Vue.prototype.$store = store;

// 引入mockServe.js----mock数据
import '@/mock/mockServer.js'

// 引入swiper样式
import 'swiper/css/swiper.css'

// 统一接收/引入api文件夹中所有的接口请求函数
import * as API from '@/api/index.js'
console.log(API, '123');

// 引入vue图片懒加载插件
import VueLazyload from 'vue-lazyload'
import spirit from '@/assets/images/spirit.gif'
// 注册插件
Vue.use(VueLazyload, {
    loading: spirit,
})

// 引入vee-validate表单验证插件
import VeeValidate from 'vee-validate'
// 引入给vee-validate插件显示中文提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN'
// 注册插件
Vue.use(VeeValidate)

// 表单验证规则：提示信息
VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同`
    },
    // 注册有5个字段：phone, code, password, repassword, agree
    attributes: { // 给校验的filed属性名映射中文名称
        phone: '手机号',
        code: '验证码',
        password: '密码',
        repassword: '确认密码',
        agree: '协议'
    }
})

// 插件的自定义规则（协议规则）：
VeeValidate.Validator.extend('agree', {
    validate: value => {
        return value
    },
    getMessage: field => field + '必须同意'
})


// 测试获取搜索模块的接口数据
// import { reqGetSearchInfo } from '@/api/index.js'
// console.log(reqGetSearchInfo({}));

Vue.config.productionTip = false

// 事件总线，用于无关系组件间的通信
// Vue.prototype.$bus = new Vue()

new Vue({
    render: h => h(App),
    // 全局事件总线$bus配置
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;
    },
    // 注册路由
    router,
    // 注册仓库（此时组件实例的身上会多一个$store属性）
    store
}).$mount('#app')