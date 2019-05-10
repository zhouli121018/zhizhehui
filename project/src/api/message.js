/*
 用户模块
*/
import request from '@/utils/request'

 export const personalApi = function(data) {
    return request({
        url: '/Wxsite/Personal/api',
        method: 'post',
        data
    })
};

export const userApi = function(data) {
    return request({
        url: '/Wxsite/User/api',
        method: 'post',
        data
    })
}

export const siteApi = function(data) {
    return request({
        url: '/Wxsite/Site/api',
        method: 'post',
        data,
    })
}

 // 获取广告
export async function getAdvert (type = 1) {
    const { data } = await siteApi({
        api_name: 'advert',
        type,
        noToast: false
    })
    return data
}
export const pilesApi = function(data) {
    return request({
        url: '/Wxsite/Piles/api',
        method: 'post',
        data
    })
}
