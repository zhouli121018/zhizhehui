import Cookies from 'js-cookie'
import config from '@/config'

const {  TokenKey, expires: expireDay } = config.auth
/**
 *  获取token
 * @export fn
 * @returns String
 */
export function getToken() {
  return Cookies.get(TokenKey)
}
/**
 *
 * @export
 * @param {*} token 后台返回的token
 * @param {number} [expires=2]  过期时间
 * @returns
 */
export function setToken(token, expires = expireDay) {
  return Cookies.set(TokenKey, token, { expires })   // token 过期时间 设置2天 自己更改
}
/**
 * 清除token
 * @export fn
 * @returns null
 */
export function removeToken() {
  return Cookies.remove(TokenKey)
}

