import firebase from 'firebase/app'

export default {
  actions: {
    async login ({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async register ({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    getUid () {
      const user = firebase.auth().currentUser
      if (user.uid === null) {
        user.uid = 'l56CWAk4skV3Uk80J2NtBnjHbo92'
      }
      return user.uid
    },
    async logout ({ commit }) {
      await firebase.auth().signOut()
      commit('clearInfo')
    }
  }
}
