import { v4 as uuidv4 } from 'uuid'

// 生成一个随机的字符串
export const getUUID = () => {
    // 先从本地存储获取uuid，若没有就生成游客临时身份并存储至本地，若有就使用
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if (!uuid_token) {
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token
}