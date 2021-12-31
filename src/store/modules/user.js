import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getMessageFromErrorCode } from 'src/logic/handler'
import { doc, getDoc } from 'firebase/firestore'
import { db } from 'src/boot/firebase'
import { Notify } from 'quasar'
const defaultState = () => {
  return {
    username: null,
    userID: null,
    user_Credit: null,
    user_agent: null
  }
}

const state = {
  username: null,
  userID: null,
  user_Credit: null,
  user_agent: null
}

const mutations = {
  'SET_USER' (state, payload) {
    state.username = payload.username
  },
  'SET_USER_CREDIT' (state, payload) {
    state.user_Credit = payload.user_Credit
  },
  'SET_USER_ID' (state, payload) {
    state.userID = payload.userID
  },
  'SET_USER_AGENT' (state, payload) {
    state.user_agent = payload
  },
  resetState (state) {
    Object.assign(state, defaultState())
  }
}

const actions = {
  setUserID: ({ commit }, userID) => {
    commit('SET_USER_ID', userID)
  },
  login: ({ commit, dispatch }, authData) => {
    signInWithEmailAndPassword(getAuth(), authData.email, authData.password)
      .then(res => {
        commit('SET_USER_ID', { userID: res.user.uid })
        dispatch('fetchUser')
        Notify.create({
          timeout: 1000,
          group: false,
          type: 'positive',
          message: 'Login Successfully'
        })
      })
      .catch(error => console.log(getMessageFromErrorCode(error.code)))
  },
  fetchUser: ({ commit, state }) => {
    const docRef = doc(db, 'users', state.userID)
    getDoc(docRef).then(res => {
      if (res.exists()) {
        commit('SET_USER_CREDIT', { user_Credit: res.data().credit })
        commit('SET_USER', { username: res.data().username })
        commit('SET_USER_AGENT', res.data().agentID)
      } else { console.log('no doc') }
    }).catch(error => console.log(error))
  },
  resetUserState: ({ commit }) => {
    Notify.create({
      timeout: 1000,
      group: false,
      type: 'warning',
      message: 'Logout Successfully'
    })
    commit('resetState')
  }
}

const getters = {
  user_Credit: state => {
    return state.user_Credit
  },
  username: state => {
    return state.username
  },
  userID (state) {
    return state.userID
  },
  userAgent (state) {
    return state.user_agent
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
