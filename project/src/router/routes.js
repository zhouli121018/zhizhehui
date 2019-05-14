const _import = require(`./_import_${process.env.NODE_ENV}`)
const layout = _import('layout/index')

/**
 *
 * meta 标签字段
 * @param {*} requiredUserInfo: [boolean]  该页面是否需要用户信息，如果需要store里没有用户信息将会去拉取用户信息
 * @param {*} white: [boolean]             白名单页面，路由拦截器不拦截，直接放行
 * @param {*} cache: [boolean]             是否缓存 配合keep-alive
 */

export default [
    {
        path: '/',
        redirect:'/home/index',
    },
    {
        path: '/home',
        component:layout,
        children: [
            {//首页
                path: 'index',
                name:'home',
                component: _import('home/index'),
                meta:{
                    title:'智者汇方案计划',
                    cache: true
                }
            },
            {//开通会员
                path: 'openingMember',
                name: 'openingMember',
                component: _import('home/openingMember'),
                meta: {
                    title: '开通会员',
                    cache: true
                }
            },
            {//方案列表
                path: 'planList',
                name: 'planList',
                component: _import('home/planList'),
                meta: {
                    title: '方案列表',
                    cache: true
                }
            },
            {//方案计划
                path: 'aPlan',
                name: 'aPlan',
                component: _import('home/aPlan'),
                meta: {
                    title: '方案计划',
                    cache: true
                }
            },
            {//公告
                path: 'announcement',
                component: layout,
                children: [
                    {
                        path: 'index',
                        name: 'announcementIndex',
                        component: _import('home/announcement/index'),
                        meta: {
                            title: '公告',
                            cache: true
                        }
                    },
                    {//消息详情页
                        path: 'detail',
                        name: 'announcementDetail',
                        component: _import('home/announcement/detail'),
                        meta: {
                            title: '公告详情',
                            cache: false
                        }
                    }
                ]
            },
        ]
    },
    {
        component: _import('404/index'),
        name: '404',
        path: '/404',
        meta: {
            cache: true 
        }
    },
    
    {//个人中心
        path: '/personal',
        component:layout,
        children: [
            {//用户中心
                path: 'index',
                name: 'personalIndex',
                component: _import('personal/index'),
                meta: {
                    title: '用户中心',
                    cache: true
                }
            },
            {//微信支付页面
                path: 'pay',
                name:'pay',
                component: _import('personal/pay'),
                meta:{
                    title:'微信二维码支付',
                    cache: true
                }
            },
            {//我的推荐页
                path: 'recommend',
                name:'recommend',
                component: _import('personal/recommend'),
                meta:{
                    title:'我的推荐页',
                    cache: true
                }
            },
            {//免费使用
                path: 'freeUse',
                name:'freeUse',
                component: _import('personal/freeUse'),
                meta:{
                    title:'免费使用',
                    cache: true
                }
            },
        ]
    },
    {//登录
        path: '/login',
        component: layout,
        children: [
            {
                path: 'index',
                name: 'loginIndex',
                component: _import('login/index'),
                meta: {
                    title: '登录',
                    cache: true
                }
            },
            {
                path: 'verification',
                name: 'verification',
                component: _import('login/verification'),
                meta: {
                    title: '验证码登录',
                    cache: true
                }
            }
        ]
    },
    {//注册
        path: '/register',
        component: layout,
        children: [
            {
                path: 'index',
                name: 'registerIndex',
                component: _import('register/index'),
                meta: {
                    title: '注册',
                    cache: false
                }
            }
        ]
    },
    {
        path: '*', redirect: '/404'

    },
]
