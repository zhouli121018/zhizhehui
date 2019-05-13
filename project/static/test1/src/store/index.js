import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import app from './modules/app'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loading: false
  },
  modules: {
    user,
    app
  },
  getters,
  mutations: {
    Change_Loading (state, loading) {
      state.loading = loading
    }
  }
})

export default store
