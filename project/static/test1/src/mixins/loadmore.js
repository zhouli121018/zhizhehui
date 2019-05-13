export default {
  data () {
    return {
      // 这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的
      scrollbarObj: {
        fade: true
      },
      // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
      pullDownRefreshObj: {
        threshold: 90,
        stop: 40
      },
      // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
      pullUpLoadObj: {
        threshold: 0,
        txt: {
          more: '加载更多',
          noMore: '没有更多数据了'
        }
      },
      startY: 0, // 纵轴方向初始化位置
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 700,
      items: [],
      query: {
        noLoading: false
      }
    }
  },
  methods: {
    // 滚动到页面顶部
    scrollTo() {
      this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
    },
    onPullingDown() {
      // 模拟下拉刷新
      console.log('下拉刷新')
      this.query.p = 1
      this.getData().then(res => {
        this.items = res
        if (res.length === 10) {
            this.$refs.scroll.forceUpdate(true)
        } else {
            this.$refs.scroll.forceUpdate(false)
        }
      })
    },
    onPullingUp() {
      // 模拟上拉 加载更多数据
      console.log('上拉加载')
      this.getData().then(res => {
        this.items = this.items.concat(res)
        if (res.length === 10) {
            this.query.p++               
            this.$refs.scroll.forceUpdate(true)
        } else {
            this.$refs.scroll.forceUpdate(false)
        }
      })
    }
  },
  created () {
    this.onPullingUp()
  }
}