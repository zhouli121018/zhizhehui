import request from '@/utils/request'

//获取我的消息列表协议 getmymsgs.php 
export function getmymsgs (data) {
    return request({
      url: '/getmymsgs.php',
      method: 'post',
      data:{
        ...data
      }
    })
}

//22、获取我消息内容协议 msg.php?id=100
export function msg (data) {
  return request({
    url: '/msg.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//12、获取历史开奖协议 gethiskj.php
export function gethiskj (data) {
  return request({
    url: '/gethiskj.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//19、获取我的关注数据 getmyfollow.php
export function getmyfollow (data) {
  return request({
    url: '/getmyfollow.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//20、获取我的查看历史数据 getviews.php
export function getviews (data) {
  return request({
    url: '/getviews.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//18、获取专家预测数据 getexpert.php
export function getexpert (data) {
  return request({
    url: '/getexpert.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//28、查看预测协议 viewpred.php
export function viewpred (data) {
  return request({
    url: '/viewpred.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//30、关注接口 follow.php
export function follow (data) {
  return request({
    url: '/follow.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

