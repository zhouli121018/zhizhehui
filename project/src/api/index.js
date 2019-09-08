import request from '@/utils/request'

//获取验证码
export function getvcode(data) {
    return request({
        url: '/getvcode.php',
        method: 'post',
        data: {
            ...data
        }
    })
}

//1、用户注册协议 regist.php?f=1027&c=oppo
export function regist(data) {
    return request({
        url: '/regist.php',
        method: 'post',
        data: {
            ...data
        }
    })
}

//2、手机号登录密码协议 loginbypass.php
export function loginbypass(data) {
    return request({
        url: '/loginbypass.php',
        method: 'post',
        data: {
            ...data
        }
    })
}

//3、验证码登录协议 loginbyvcode.php
export function loginbyvcode(data) {
    return request({
        url: '/loginbyvcode.php',
        method: 'post',
        data: {
            ...data
        }
    })
}
//获取用户中心数据
export function getaccount(data) {
    return request({
        url: '/getaccount.php',
        method: 'post',
        data
    })
}
// 获取微信二维码（金币和会员） 
export function getwechatcode(data) {
    return request({
        url: '/getwechatcode.php',
        method: 'post',
        data
    })
}

//31、获取关于接口 getabout.php
export function getabout(data) {
    return request({
        url: '/getabout.php',
        method: 'post',
        data: {
            ...data
        }
    })
}
//支付宝支付
export function getalipayorderinfor(data) {
    return request({
        url: '/alipay_wap/getalipayorderinfor.php',
        method: 'post',
        data: {
            ...data
        }
    })
}
// getalipayorderinfor_ex.php
export function getalipayorderinfor_ex(data) {
    return request({
        url: '/alipay_wap/getalipayorderinfor_ex.php',
        method: 'post',
        data: {
            ...data
        }
    })
}

//会员兑换天数
export function submitduihuan(data) {
    return request({
        url: '/submitduihuan.php',
        method: 'post',
        data: {
            ...data
        }
    })
}
//获取计划内容
export function getplan(data) {
    return request({
        url: '/getplan.php',
        method: 'post',
        data: {
            ...data
        }
    })
}

//开通会员
export function getvipdata(data) {
    return request({
        url: '/getvipdata.php',
        method: 'post',
        data: {
            ...data
        }
    })
}

//邀请明细 getinvitelist.php
export function getinvitelist(data) {
    return request({
        url: '/getinvitelist.php',
        method: 'post',
        data: {
            ...data
        }
    })
}
