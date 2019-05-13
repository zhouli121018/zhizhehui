import { systemType } from '@/utils/system'
import { filterRouteByKey } from '@/router/util';
import routes from '@/router/routes';
const app = {
  state: {
    sdkUrl: '',  // 存放获取js-sdk 所需url,安卓每次调用sdk取最新的url, ios取第一次进入公众号的url
    system: systemType(),  // 0 为ios 1 为安卓
    shareUrl: '',
    lottypes:null,
    tabs_active: 0,
    num_active: 0,
    yc_active: 0,
    isback: false,
    home_index_data:null
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
    SET_SDK_URL (state, url) {
      state.sdkUrl = url
    },
    SET_SHARE_URL (state, url) {
      state.shareUrl = url
    },
    SET_LOTTYPES (state,param){
      state.lottypes = null;
      state.lottypes = param
    },
    SET_TABS_ACTIVE(state,param){
      state.tabs_active = param;
    },
    SET_NUM_ACTIVE(state,param){
      state.num_active = param;
    },
    SET_YC_ACTIVE(state,param){
      state.yc_active = param;
    },
    SET_ISBACK(state,param){
      state.isback = param;
    },
    SET_HOME_INDEX_DATA(state,param){
      state.home_index_data = param;
    }
  },
  actions: {
    set_sdk_url ({commit}, url) {
      commit('SET_SDK_URL', url)
    },
    set_lottypes ({commit}, param){
      commit('SET_LOTTYPES', param)
    },
    set_tabs_active ({commit}, param){
      commit('SET_TABS_ACTIVE', param)
    },
    set_num_active ({commit}, param){
      commit('SET_NUM_ACTIVE', param)
    },
    set_yc_active ({commit}, param){
      commit('SET_YC_ACTIVE', param)
    },
    set_isback ({commit}, param){
      commit('SET_ISBACK',param)
    },
    set_home_index_data ({commit}, param){
      commit('SET_HOME_INDEX_DATA',param)
    }
  }
}

export default app