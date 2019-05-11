export default {
    auth: {
        TokenKey: 'authorization-app', // 本地存储的token key值
        expires: 2 // token过期时间
    },
    request: {
        // www.yeev.vip
        apiURL: 'http://sscby.cn/zzh', // 项目线上域名
        timeout: 100000
            // http://sscby.cn/zzh/                        // 请求超时时间
    }
}
//http://qitengcdz.app.xiaozhuschool.com/Wxsite/Base/getCode?resultUrl=http://qitengcdz.app.xiaozhuschool.com/wx/home/index