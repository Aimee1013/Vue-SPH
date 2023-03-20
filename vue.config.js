const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    //项目上线后不需要map文件可以去掉
    productionSourceMap: false,
    transpileDependencies: true,
    // 关闭eslint
    lintOnSave: false,
    // 代理跨域
    devServer: {
        proxy: {
            '/api': { //该配置表示：代理服务器会自动识别带有/api路径的地址，然后进行转发，来解决浏览器端跨域问题（服务器端没有跨域问题）
                target: 'http://gmall-h5-api.atguigu.cn', //表示：要获取数据的服务器地址
            }
        }
    }
})