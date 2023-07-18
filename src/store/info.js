import firebase from 'firebase/app'

export default {
  state: {
    info: {name: 'OVI', bill: 717}
  },
  mutations: {
    setInfo (state, info) {
        state.info = info
    },
    clearInfo (state) {
        state.info = {}
    }
  },
  actions: {
<<<<<<< HEAD
    async fetchInfo ({ dispatch, commit}) {
        try {
            const uid = await dispatch('getUid')
            const info = (await firebase.database().ref(`users/${uid}/info`).once('value')).val
            commit('setInfo', info)
            console.log(info)
        } catch (e) {
=======
    async fetchInfo ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const info = (await firebase.database().ref(`users/${uid}/info`).once('value')).val()
        commit('setInfo', info)
      } catch (e) {
>>>>>>> d5eeba2 (test)

        }
    }
  },
  getters: {
    info: s => s.info
  }
}