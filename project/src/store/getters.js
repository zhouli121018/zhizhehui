const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  sdkUrl: state => state.app.sdkUrl,
  isBind: state => {  // 用户是否绑定手机，配合本地缓存，不需要绑定用户信息的页面不调getUserInfo接口
    return state.user.userInfo && state.user.userInfo.mobile
  } ,
  isback:state=> state.app.isback,
  kfwecha:state=> state.app.kfwecha,
  issetkjtx:state=> state.app.issetkjtx,
  apkurl:state=> state.app.apkurl,
  homeData:state=> state.app.homeData,

}
export default getters
