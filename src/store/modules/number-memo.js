// eslint-disable-next-line camelcase
import { CreateUserNumber_memo } from 'src/logic/postDocument'
import { getNumberMemo } from 'src/logic/queryDocument'

const state = {
  user_number_memo: []
}
const mutations = {
  'SET_USER_NUMBER_MEMO' (state, payload) {
    state.user_number_memo = payload
  }
}

const actions = {

  createUserNumberMemo: async ({ rootGetters }, payload) => {
    await CreateUserNumber_memo({ displayname: payload.numberMemoName, userID: rootGetters['userEntity/userID'], selectNumber: payload.numberMemoValue })
  },
  getUserNumberMemo: async ({ commit, rootGetters }) => {
    const numberMemoList = await getNumberMemo(rootGetters['userEntity/userID'])
    console.log(numberMemoList)
    if (numberMemoList) {
      commit('SET_USER_NUMBER_MEMO', numberMemoList)
    }
  }
}

const getters = {
  userNumber_memo: state => {
    return state.user_number_memo
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
