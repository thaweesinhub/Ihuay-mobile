import { prepareInfo } from 'src/logic/helper'
import { queryDocument, queryDocumentWhere } from 'src/logic/queryDocument'

const state = {
  gameName: null,
  gameKey: null,
  gameTimeLeft: null,
  gameDocID: null,
  gameUnique_key: null,
  gameType: null,
  gameNumberPriceCollection: null,
  gamePayRate: {},
  gamePriceMax: [],
  gameCloseNumber: []
}
const mutations = {
  // setGovernmentLotto: async ({ commit }, payload) => {
  'SET_SELECT_GAME_ROOM'  (state, payload) {
    state.gameName = payload.gameName
    state.gameKey = payload.gameKey
    state.gameTimeLeft = payload.gameTimeLeft
    state.gameUnique_key = payload.gameUnique_key
    state.gameDocID = payload.gameDocID
    state.gameType = payload.gameType
    state.gamePayRate = payload.priceRate
    state.gamePriceMax = payload.gamePriceMax
    state.gameCloseNumber = payload.gameCloseNumber
    state.gameNumberPriceCollection = payload.gameNumberPriceCollection
  }

}

const actions = {

  setSelectedGame: async ({ commit, state, rootGetters }, payload) => {
    const info = prepareInfo(payload.gameKey)
    console.log(info)
    payload.gameCloseNumber = await queryDocumentWhere(info.lottoCloseNumber, payload.gameKey, rootGetters['userEntity/userAgent'])
    payload.gamePriceMax = await queryDocumentWhere(info.lottomax, payload.gameKey, rootGetters['userEntity/userAgent'])
    payload.priceRate = await queryDocument(info.priceRateCollection, rootGetters['userEntity/userAgent'])
    payload.gameNumberPriceCollection = info.gameNumberPrice
    commit('SET_SELECT_GAME_ROOM', payload)
  }
}

const getters = {
  getSelectedGame: state => {
    return state
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
