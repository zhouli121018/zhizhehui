/*
  数据请求模块
*/
import axios from 'axios'
import store from '@/store'
import config from '@/config'
import { urlParse } from '@/utils';
import { Toast } from 'vant'
import md5 from 'js-md5'
const {  apiURL, timeout } = config.request
const baseURL = process.env.NODE_ENV === 'production' ?  apiURL : '/api'
const service = axios.create({
  baseURL,
  timeout
})
// 请求拦截器
service.interceptors.request.use(config => {
  // 判断接口是否需要携带token , noAuth,
  let { noLoading = true } = config.data
  if (noLoading) {
    store.commit('Change_Loading', true)  // 显示全局loading图
  }
  
  if(config){//给所有请求加上 token 和 data 参数
    let now = new Date();
    let md5_data = md5('token='+now.getTime()+'&key=lldu98382');
    config.data.token = now.getTime();
    config.data.data = md5_data;
  }
  
  // 文件流采用formdata数据类型
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = "application/x-www-form-urlencoded; charset=UTF-8"
    config.data = queryParse(config.data)
  }
  return config
}, error => {
  
  return Promise.reject(error)
})
// 返回拦截器
service.interceptors.response.use(
    response => {
      const {noToast = true, noLoading = true} = urlParse(response.config.data)
      if (noLoading && noLoading !== 'false') {
        store.commit('Change_Loading', false)
      }
      let errorMesg = ''
      switch (response.status) {
        case 200:
        {let { errorcode, message } = response.data
          if(message && message != ' '){
            Toast(message)
          }
        }
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          errorMesg = '服务器出错'
          break
      }
      return response
    },
    error => {
      store.commit('Change_Loading', false)
      // for debug
      Toast('网络连接超时');
      return Promise.reject(error)
})
/*
  如果前端传给后端的输类型是  application/x-www-form-urlencoded， 需要自己把数据拼接成
*/
function queryParse (query) {
  let res = []
  for (let k in query) {
    res.push(`${encodeURIComponent(k)}=${encodeURIComponent(query[k])}`)
  }
  return res.join('&')
}

export default service

