import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({

  state: {
    currentMember: {},
    config: {},
    query: ''
  },

  getters: {
    getQuery: state => () => state.query
  },
  mutations: {
    setMember (state, payload) {
      // 变更状态
      payload.logged = true
      state.currentMember = payload  
    },flushMember(state){
      state.currentMember = {}
    },setConfig(state, payload){
      state.config = payload  
    },setQuery(state, payload){
      state.query = payload  
    }

  }
})

