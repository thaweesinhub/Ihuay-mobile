import { getTicketHistory } from 'src/logic/queryDocument'
import { filterResultedLotto, filterWaitForResult } from 'src/logic/helper'
const state = {
  gameHistory: null,
  allHistory: null,
  waitForResult: null,
  resulted: null
}

const mutations = {
  'SET_GAMEHISTORY' (state, payload) {
    state.gameHistory = payload
  },
  'SET_RESULTED_HISTORY' (state, payload) {
    state.resulted = payload
  },
  'SET_WAITFORRESULT' (state, payload) {
    state.waitForResult = payload
  }

}

const actions = {
  getTicket_summary: async ({ commit, rootGetters }) => {
    const data = await getTicketHistory(rootGetters['userEntity/userID'])
    if (data) {
      const resulted = filterResultedLotto(data)
      const waitForResult = filterWaitForResult(data)
      commit('SET_WAITFORRESULT', waitForResult)
      commit('SET_RESULTED_HISTORY', resulted)
      commit('SET_GAMEHISTORY', data)
    }
  }
}

const getters = {
  getAllLottoHistory: state => {
    return state.gameHistory
  },
  getWaitForResult: state => {
    return state.waitForResult
  },
  getResultedHistory: state => {
    return state.resulted
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
