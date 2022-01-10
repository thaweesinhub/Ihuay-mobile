import { getTicketHistory } from 'src/logic/queryDocument'
import { betType, filterResultedLotto, filterWaitForResult } from 'src/logic/helper'
import { v4 as uuidv4 } from 'uuid'
const state = {
  gameHistory: null,
  allHistory: null,
  waitForResult: null,
  resulted: null,
  selected: null,
  selectedLottoInfo: null,
  forPlayGame: null
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
  },
  'SET_SELECTED_INFO' (state, payload) {
    state.selected = payload
  },
  'PREPARE_DATA' (state, info) {
    const lotto = []
    if (info.IsReWard) {
      for (let x = 0; x < betType.length; x++) {
        if (info.boughtLottery[betType[x].key]) {
          for (let y = 0; y < info.boughtLottery[betType[x].key].nums.length; y++) {
            info.boughtLottery[betType[x].key].nums[y].result = info.result.calculateResult[betType[x].key]
            info.boughtLottery[betType[x].key].nums[y].key = betType[x].key
            lotto.push(info.boughtLottery[betType[x].key].nums[y])
          }
        }
      }
    } else {
      for (let x = 0; x < betType.length; x++) {
        if (info.boughtLottery[betType[x].key]) {
          for (let y = 0; y < info.boughtLottery[betType[x].key].nums.length; y++) {
            info.boughtLottery[betType[x].key].nums[y].key = betType[x].key
            lotto.push(info.boughtLottery[betType[x].key].nums[y])
          }
        }
      }
    }
    state.selectedLottoInfo = lotto
  },
  'PREPARE_DATAFORPLAYGAME' (state, info) {
    const lotto = []
    for (let x = 0; x < info.length; x++) {
      const obj = {}
      obj.createTime = info[x].display_date_time
      obj.displayname = info[x].gameID
      obj.key = uuidv4()
      obj.selectNumber = []
      for (let y = 0; y < betType.length; y++) {
        if (info[x].boughtLottery[betType[y].key]) {
          for (let z = 0; z < info[x].boughtLottery[betType[y].key].nums.length; z++) {
            const ob = {}
            ob.value = info[x].boughtLottery[betType[y].key].nums[z].num
            ob.type = info[x].boughtLottery[betType[y].key].name
            obj.selectNumber.push(ob)
          }
        }
      }
      lotto.push(obj)
    }

    state.forPlayGame = lotto
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
  },
  setTicket_info: async ({ commit }, payload) => {
    commit('SET_SELECTED_INFO', payload)
  },
  prepareInfo: async ({ commit, getters }) => {
    const info = getters.getSelectedInfo
    commit('PREPARE_DATA', info)
  },
  prepareInfoForPlayGame: async ({ commit, getters }) => {
    const info = getters.getAllLottoHistory
    commit('PREPARE_DATAFORPLAYGAME', info)
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
  },
  getSelectedInfo: state => {
    return state.selected
  },
  getLottoSelectedInfo: state => {
    return state.selectedLottoInfo
  },
  getInfoForPlayGame: state => {
    return state.forPlayGame
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
