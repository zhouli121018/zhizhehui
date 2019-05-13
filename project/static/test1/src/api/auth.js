/**
 * 
 *  获取token
 * 
 */
import request from '@/utils/request'
export function deviceList (params) {
  return request({
    url: '/Wxsite/Base/getCode',
    params
  })
}