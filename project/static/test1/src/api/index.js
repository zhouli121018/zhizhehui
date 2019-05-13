import request from '@/utils/request'

//获取验证码
export function getvcode(data) {
  return request({
    url: '/getvcode.php',
    method: 'post',
    data:{
      ...data
    }
  })
} 

//1、用户注册协议 regist.php?f=1027&c=oppo
export function regist(data) {
  return request({
    url: '/regist.php',
    method: 'post',
    data:{
      ...data
    }
  })
} 

//2、手机号登录密码协议 loginbypass.php
export function loginbypass(data) {
  return request({
    url: '/loginbypass.php',
    method: 'post',
    data:{
      ...data
    }
  })
} 

//3、验证码登录协议 loginbyvcode.php
export function loginbyvcode(data) {
  return request({
    url: '/loginbyvcode.php',
    method: 'post',
    data:{
      ...data
    }
  })
} 

//提交反馈
export function submitfeedback(data) {
  return request({
    url: '/submitfeedback.php',
    method: 'post',
    data
  })
} 
//模拟投注

export function submittouzu(data) {
  return request({
    url: '/submittouzu.php',
    method: 'post',
    data
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
// 获取领金币页数据
export function getcoindesc(data) {
  return request({
    url: '/getcoindesc.php',
    method: 'post',
    data
  })
} 
// 签到
export function checkin(data) {
  return request({
    url: '/checkin.php',
    method: 'post',
    data
  })
} 
//获取指标说明
export function getzhibiaodesc(data) {
  return request({
    url: '/getzhibiaodesc.php',
    method: 'post',
    data
  })
} 

//31、获取关于接口 getabout.php
export function getabout (data) {
  return request({
    url: '/getabout.php',
    method: 'post',
    data:{
      ...data
    }
  })
}
//支付宝支付
export function getalipayorderinfor (data) {
  return request({
    url: '/alipay_wap/getalipayorderinfor.php',
    method: 'post',
    data:{
      ...data
    }
  })
}