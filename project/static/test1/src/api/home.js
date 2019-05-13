/* 
  首页模块
*/
import request from '@/utils/request'

export function deviceList (data) {
  return request({
    url: '/Wxsite/Site/api',
    method: 'post',
    data:{
      api_name: 'siteList',
      ...data
    }
  })
}

//彩票属性协议
export function getproperty (data) {
  return request({
    url: '/getproperty.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//首页及专家排名协议 getexprank.php
export function getexprank (data) {
  return request({
    url: '/getexprank.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//获取大奖预测组合列表
export function getpredzuhe (data) {
  return request({
    url: '/getpredzuhe.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//8、大奖预测组合内容协议 getpredzuhe_detail.php
export function getpredzuhe_detail (data) {
  return request({
    url: '/getpredzuhe_detail.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//获取走势图列表协议 gettrendlist.php
export function gettrendlist (data) {
  return request({
    url: '/gettrendlist.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//获取技巧列表协议 getjiqiaolist.php
export function getjiqiaolist (data) {
  return request({
    url: '/getjiqiaolist.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//获取公告列表协议 getnotices.php
export function getnotices (data) {
  return request({
    url: '/getnotices.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//获取公告内容协议 notice.php?noticeid=100
export function notice (data) {
  return request({
    url: '/notice.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//11、获取开奖大厅协议 getlothall.php
export function getlothall (data) {
  return request({
    url: '/getlothall.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//29、获取指标说明 getzhibiaodesc.php
export function getzhibiaodesc (data) {
  return request({
    url: '/getzhibiaodesc.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//24、获取技巧协议 getjiqiao.php
export function getjiqiao (data) {
  return request({
    url: '/getjiqiao.php',
    method: 'post',
    data:{
      ...data
    }
  })
}
