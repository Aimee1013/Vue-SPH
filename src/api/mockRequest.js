// 在已有的axios基础上对axios进行二次封装
// 首先引入axios
import axios from 'axios';

// 从nprogress模块中引入进度条插件
import nprogress from "nprogress";
// 使用nprogress插件（该插件中：start方法表示，进度条开始；done方法表示，进度条执行结束）
// 引入进度条的样式
import 'nprogress/nprogress.css'

// 使用axios对象的create方法，去创建一个axios实例
const mockRequests = axios.create({
    // 配置这个实例对象
    // 1.配置基础路径（发请求时，路径中会自动带上api，不用每次手写）
    baseURL: '/mock',
    // 2.配置请求时间（表示请求时间超过5s，会结束请求）
    timeout: 5000
});

// 请求拦截器，在发请求之前，请求拦截器可以检测到，来处理一些业务
mockRequests.interceptors.request.use((config) => {
    // config：配置对象，中headers请求头很重要
    // 开始执行进度条
    nprogress.start();
    return config;
});

// 响应拦截器，当服务器数据返回以后，响应拦截器可以检测到，来处理一些业务
mockRequests.interceptors.response.use((res) => {
    // 服务器响应成功的回调函数
    // 进度条执行结束
    nprogress.done();
    return res.data;
}, (error) => {
    // 服务器响应失败的回调函数
    return Promise.reject(new Error('fail'))
});

// 对外暴露mockRequests
export default mockRequests;