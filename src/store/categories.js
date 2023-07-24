import firebase from 'firebase/app'

export default {
  actions: {
    async fetchCategories ({ commit, dispatch }) {
      try {
        let uid = await dispatch('getUid')
        if (uid === null) {
          uid = 'l56CWAk4skV3Uk80J2NtBnjHbo92'
        }
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
        return Object.keys(categories).map(key => ({ ...categories[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createCategory ({ commit, dispatch }, { title, limit }) {
      try {
        let uid = await dispatch('getUid')
        if (uid === null) {
          uid = 'l56CWAk4skV3Uk80J2NtBnjHbo92'
        }
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit })
        return { title, limit, id: category.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
