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
//获取方案列表
export function getfanganlist (data) {
  return request({
    url: '/getfanganlist.php',
    method: 'post',
    data:{
      ...data
    }
  })
}
//获取首页内容
export function gethome (data) {
  return request({
    url: '/gethome.php',
    method: 'post',
    data:{
      ...data
    }
  })
}
//获取推荐页数据
export function gettuijiancode (data) {
  return request({
    url: '/gettuijiancode.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//8、获取开奖提醒 getkjtixing.php
export function getkjtixing (data) {
  return request({
    url: '/getkjtixing.php ',
    method: 'post',
    data:{
      ...data
    }
  })
}

//9、设置开奖提醒 setkjtixing.php 
export function setkjtixing (data) {
  return request({
    url: '/setkjtixing.php ',
    method: 'post',
    data:{
      ...data
    }
  })
}

//13、获取方案 getfangan.php
export function getfangan (data) {
  return request({
    url: '/getfangan.php ',
    method: 'post',
    data:{
      ...data
    }
  })
}