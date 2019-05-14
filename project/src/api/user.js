/* 
 用户模块
*/
import request from '@/utils/request'

// 根据token获取用户信息
export function getUserInfo () {
  return request({
    url: '/getaccount.php',
    method: 'post',
    data: {...data}
  })
}

// 登录
export function login (data) {
  return request({
    url: '',
    method: 'post',
    data
  })
}

