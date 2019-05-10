
export default {
  methods: {
    // 获取微信js-sdk 参数
    getSign (url = document.domain) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src =  `${url}/Wxsite/Wechat/callJssdk?u=${this.$store.state.app.sdkUrl}&callback=_getSign`
        document.body.append(script)
        window._getSign = res => {
          const { rawString, url, ...sdk } = res
          this.wxSdk = sdk
          resolve(sdk)
        }
      })
    },
    // 初始化微信js-sdk
    initWxConfig({
      debug = false,
      jsApiList = [],   // 需要调用的js-sdk 接口
      ready = () => {}, // 初始化成功回调
      error = () => {}  // 初始化失败回调
    } = {}) {
      this.$toast.loading({
        mask: true,
        message: '加载中...'
      });
      // this.getSign('http://www.yeev.vip').then(sdk => {
      //   this.$wx.config({
      //     debug,
      //     ...sdk,
      //     jsApiList
      //   })
      //   this.$wx.ready(() => {
      //     this.$toast.clear()
      //     ready && ready()
      //   })
      //   this.$wx.error(err => {
      //     this.$toast.clear()
      //     error && error(err)
      //   })
      // })
    }
  }
}
