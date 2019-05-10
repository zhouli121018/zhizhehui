import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import {
    setToken
} from '@/utils/auth'
import store from '@/store'
import { Toast } from 'vant'
import { urlParse } from '@/utils'

Vue.use(Router)
const router = new Router({
    // mode: 'history',       // 路由模式 一律采用history
    base: '/h/',     // 应用的根路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"
    routes,
    // // 点击浏览器导航返回按钮滚动条滚回跳转之前的位置
    scrollBehavior (to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash
            }
        }
        if (savedPosition) {
                return savedPosition
            } else {
                return { x: 0, y: 0 }
        }
        // return 期望滚动到哪个的位置
    }
})
const LOGIN_PAGE_NAME = 'bind'
const HASLOGIN_PAGE_NAME = 'home'
router.beforeEach((to, from, next) => {
    const { title } = to.meta
    if (title) {
        document.title = title
    }
    if(to.name == 'perdictRank' || to.name == 'simulateBetting' || to.name == 'broughtGold' || to.name == 'perdictRanking' || to.name == 'personalIndex'|| to.name == 'myFocus' || to.name == 'myLook' ){
        if(!localStorage.getItem('uid') || !localStorage.getItem('sid')) {
            next({
                path:'/login/index'
            })
            return;
        }
    }
    
    next()
    
})
router.afterEach((to, from) => {
    // 每次路由更新后初始化js-sdk 请求使用的url
    const system = store.state.app.system
    // 如果是安卓用户，每次存最新的
    if (system) {
        store.dispatch('set_sdk_url', document.URL)
    } else {
        
        const sdkUrl = store.state.app.sdkUrl
        if (!sdkUrl) {
            store.dispatch('set_sdk_url', document.URL)
        }
    }
})
async function getUserInfo () {
    if (store.state.user.userInfo) {
        return
    } else {
        try {
            await store.dispatch('getUserInfo')
            return
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
export default router
