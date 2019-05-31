import { systemType } from '@/utils/system'
import { filterRouteByKey } from '@/router/util';
import routes from '@/router/routes';
const app = {
  state: {
    sdkUrl: '',  // 存放获取js-sdk 所需url,安卓每次调用sdk取最新的url, ios取第一次进入公众号的url
    system: systemType(),  // 0 为ios 1 为安卓
    shareUrl: '',
    isback: false,
    kfwecha:'',
    issetkjtx: null, 
    apkurl: null, 
    homeData:null
  },
  getters: {
    whiteList (state) {
      return filterRouteByKey(routes, 'requiredUserInfo')
    },
    cachViews () {
      return filterRouteByKey(routes, 'cache')
    },
  },
  mutations: {
    SET_ISSETKJTX (state, param) {
      state.issetkjtx = param
    },
    SET_SDK_URL (state, url) {
      state.sdkUrl = url
    },
    SET_SHARE_URL (state, url) {
      state.shareUrl = url
    },
    SET_ISBACK(state,param){
      state.isback = param;
    },
    SET_KFWECHA(state,param){
      state.kfwecha = param;
    },
    SET_APKURL(state,param){
      state.apkurl = param;
    },
    SET_HOMEDATA(state,param){
      state.homeData = param;
    },
  },
  actions: {
    set_homedata ({commit}, url) {
      commit('SET_HOMEDATA', url)
    },
    set_sdk_url ({commit}, url) {
      commit('SET_SDK_URL', url)
    },
    set_isback ({commit}, param){
      commit('SET_ISBACK',param)
    },
    set_kfwecha ({commit}, param){
      commit('SET_KFWECHA',param)
    },
    set_issetkjtx ({commit}, param){
      commit('SET_ISSETKJTX',param)
    },
    set_apkurl ({commit}, param){
      commit('SET_APKURL',param)
    },
  }
}

export default app