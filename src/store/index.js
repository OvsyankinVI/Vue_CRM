import { createStore } from 'vuex'
import auth from './auth'
import info from './info'
import categories from './categories'
import record from './record'

export default createStore({
  state: {
    error: null,
    curr: ''
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth, info, categories, record
  }
})
