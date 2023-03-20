// 先引入mockjs模块
import Mock from 'mockjs'

// 引入json数据格式(webpack中默认暴露的文件有：图片、JSON数据格式，可以直接引入)
import banner from './banner.json'
import floor from './floor.json'

// mock数据：参数1：参数请求地址，参数2：请求数据
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })