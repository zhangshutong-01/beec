//store.js
import Vue from 'vue'
import Vuex from 'vuex'

// 头部分类
import login from './modules/login'
import close from './modules/close'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    close
  }
})
