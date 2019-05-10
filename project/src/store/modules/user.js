
import { 
  getUserInfo
 } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
const user = {
  state: {
    token: getToken(),    // 用户token  
    userInfo: null       // 用户信息
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      setToken(token)     
    },    
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      if (userInfo.mobile) {
        window.localStorage.setItem('isBind', 1)
      }
    },
    REMOVE_TOKEN (state) {
      state.token = null
      removeToken()
    }
  },
  actions: {
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('REMOVE_TOKEN')
        resolve()
      })
    },
    // 获取用户信息
    getUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          console.log('%cresponse: ','color: MidnightBlue; background: Aquamarine; font-size: 20px;',response);
          if (response.data.code == 1) { 
            commit('SET_USERINFO', response.data.data)
          } else {
            commit('REMOVE_TOKEN')
          }
          resolve(response.data)
        }).catch(error => {
          
          reject(error)
        })
      })
    } 
  }
}

export default user
