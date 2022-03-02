import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from 'src/boot/firebase'
import { Notify } from 'quasar'
import { getMessageFromErrorCode, NotifyError } from 'src/logic/handler'
const defaultState = () => {
  return {
    username: null,
    userID: null,
    user_Credit: null,
    user_agent: null,
    userAffiliate_ID: null
  }
}

const state = {
  username: null,
  userID: null,
  user_Credit: null,
  user_agent: null,
  userAffiliate_ID: null
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
  'SET_USER_AFFILIATE_ID' (state, payload) {
    state.userAffiliate_ID = payload
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
      .then((res) => {
        commit('SET_USER_ID', { userID: res.user.uid })
        dispatch('fetchUser')
        Notify.create({
          timeout: 1000,
          group: false,
          type: 'positive',
          message: 'Login Successfully'
        })
        dispatch('pushRouter')
      })
      .catch(error => {
        console.log(error)
        NotifyError(getMessageFromErrorCode(error.code))
        return 'xxxxxxxxxxx'
      })
  },
  fetchUser: ({ commit, state }) => {
    const docRef = doc(db, 'users', state.userID)
    getDoc(docRef).then(res => {
      if (res.exists()) {
        commit('SET_USER_CREDIT', { user_Credit: res.data().credit })
        commit('SET_USER', { username: res.data().username })
        commit('SET_USER_AGENT', res.data().agentID)
        commit('SET_USER_AFFILIATE_ID', res.data().affiliate_ID)
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
  },
  pushRouter () {
    // don’t define your actions with ES6 arrow syntax (because “this” will mean something else as an effect). refer https://forum.quasar-framework.org/topic/3960/access-router-outside-vue/10
    this.$router.push('result-reward')
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
  },
  userAffiliate_ID (state) {
    return state.userAffiliate_ID
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
