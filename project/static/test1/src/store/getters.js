const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  sdkUrl: state => state.app.sdkUrl,
  isBind: state => {  // 用户是否绑定手机，配合本地缓存，不需要绑定用户信息的页面不调getUserInfo接口
    return state.user.userInfo && state.user.userInfo.mobile
  } ,
  lottypes:state => state.app.lottypes,
  tabs_active:state=> state.app.tabs_active,
  num_active:state=> state.app.num_active,
  yc_active:state=> state.app.yc_active,
  isback:state=> state.app.isback,
  home_index_data:state=> state.app.home_index_data,

}
export default getters
