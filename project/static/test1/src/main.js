import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import 'amfe-flexible'   // 手淘rem适配方案
// import Meta from 'vue-meta'
import { 
  Swipe, 
  SwipeItem, 
  Popup, 
  Toast, 
  Uploader, 
  Loading, 
  Lazyload, 
  Button,
  Cell, 
  CellGroup,
  Row,
  Col,
  Field,
  Area,
  Checkbox,
  NavBar,
  Tag ,
  Icon ,
  Tab,
  Tabs,
  PullRefresh,
  NoticeBar
} from 'vant'
import wx from 'weixin-js-sdk'
import { VueSpinners } from '@saeris/vue-spinners'
import 'animate.css';
import * as filters from './filters'  // 全局过滤器
import './styles/index.styl'

//注册全局title组件
import TitleBar from '@/components/Title/index'
Vue.component('title-bar',TitleBar)
import Rank from '@/components/Rank/index'
Vue.component('rank',Rank)
import Lottypes from '@/components/Lottypes/index'
Vue.component('lottypes',Lottypes)
import Detail from '@/components/Detail/index'
Vue.component('detail',Detail)

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
Vue.prototype.$https = 'http://freessq.com/h/'
Vue.prototype.$https_img = 'http://freessq.com/'

// Vue.use(VueAMap);
// VueAMap.initAMapApiLoader({
//   key: 'b37903093d14da2f8eaf71a24d0d958c',
//   plugin: [
//     'AMap.Autocomplete', 
//     'AMap.PlaceSearch', 
//     'AMap.Scale', 
//     'AMap.OverView', 
//     'AMap.ToolBar', 
//     'AMap.MapType', 
//     'AMap.PolyEditor', 
//     'AMap.CircleEditor',
//     'AMap.Geocoder'
//   ],
//   v: '1.4.4'
// });
//  注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// loading组件
Vue.use(VueSpinners)
Vue.config.productionTip = false;

Vue
.use(Swipe)
.use(SwipeItem)
.use(Popup)
.use(Toast)
.use(Uploader)
.use(Loading)
.use(Lazyload)
.use(Button)
.use(CellGroup)
.use(Cell)
.use(Row)
.use(Col)
.use(Area)
.use(Field)
.use(Checkbox)
.use(NavBar)
.use(Tag )
.use(Icon  )
.use(Tab  )
.use(Tabs  )
.use(PullRefresh  )
.use(NoticeBar  )
Vue.prototype.$wx = wx
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app")
