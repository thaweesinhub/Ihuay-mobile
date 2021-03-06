import {
  documentDate,
  getIndexLotto,
  getNormalLotto, LottoCreateOnSixteen,
  lottoCreateOnFirstAndSixteen, getThaiStockLotto, getJubyeekee
} from 'src/logic/queryDocument'
import { BankLotto, IndexLotto, ThaiLotto, ThaiStock } from 'src/dto/lotto'
import { checkIfTimeAlredyOver, getUnixValue } from 'src/logic/helper'

const state = {
  select_state: 'lotto',
  indexLotto: [],
  governmentLotto: [],
  thaiStockLotto: [],
  bankLotto: [],
  foreignLotto: [],
  jubyeekeeLotto: []
}

const mutations = {
  'SET_TIMEOUT_GAME' (state, payload) {
    state[payload.type][payload.index].isOpen = false
  },
  'SET_INDEX_LOTTO_GAME' (state, payload) {
    state.indexLotto = payload
  },
  'SET_SELECT_STATE' (state, payload) {
    state.select_state = payload
  },
  'SET_GOVERNMNET_LOTTO_GAME' (state, payload) {
    state.governmentLotto = payload
  },
  'SET_THAI_STOCK_LOTTO_GAME' (state, payload) {
    state.thaiStockLotto = payload
  },
  'SET_THAI_BANK_LOTTO_GAME' (state, payload) {
    state.bankLotto = payload
  },
  'SET_FOREIGN_LOTTO_GAME' (state, payload) {
    state.foreignLotto = payload
  },
  'SET_JUBYEEKEE_LOTTO_GAME' (state, payload) {
    state.jubyeekeeLotto = payload
  }
}

const actions = {
  setTimeoutLotto: async ({ commit }, payload) => {
    commit('SET_TIMEOUT_GAME', payload)
  },
  changeView: async ({ commit, getters }, payload) => {
    commit('SET_SELECT_STATE', payload)
  },
  getIndexLottoRoom: async ({ commit }) => {
    const data = await getIndexLotto(documentDate())
    const arr = []
    if (data) {
      for (let x = 0; x < IndexLotto.length; x++) {
        if (data[IndexLotto[x].key] !== undefined) {
          arr.push({
            name: data[IndexLotto[x].key].name,
            key: IndexLotto[x].key,
            unique_key: data[IndexLotto[x].key].unique_key,
            display_close_date_time: data[IndexLotto[x].key].display_close_date_time,
            unixTimeLeft: getUnixValue(data[IndexLotto[x].key].display_close_date_time),
            isOpen: checkIfTimeAlredyOver(data[IndexLotto[x].key].display_close_date_time, data[IndexLotto[x].key].STATUS),
            docID: documentDate()
          })
        }
      }
    }
    commit('SET_INDEX_LOTTO_GAME', arr)
  },
  getForeignLotto: async ({ commit }) => {
    const Lotto = []
    const lotto = await getNormalLotto(documentDate())
    if (lotto.lotto_maylasia) {
      Lotto.push({
        name: lotto.lotto_maylasia.name,
        key: 'lotto_maylasia',
        for_countdown: lotto.lotto_maylasia.for_countdown,
        unique_key: lotto.lotto_maylasia.unique_key,
        docID: documentDate(),
        display_close_date_time: lotto.lotto_maylasia.display_close_date_time,
        unixTimeLeft: getUnixValue(lotto.lotto_maylasia.display_close_date_time),
        isOpen: checkIfTimeAlredyOver(lotto.lotto_maylasia.display_close_date_time, lotto.lotto_maylasia.STATUS)
      })
    }
    commit('SET_FOREIGN_LOTTO_GAME', Lotto)
  },
  getGovernmentLotto: async ({ commit }) => {
    const lotto = await getNormalLotto(lottoCreateOnFirstAndSixteen())
    const Lotto = []
    if (lotto) {
      for (let x = 0; x < ThaiLotto.length; x++) {
        if (lotto[ThaiLotto[x].key]) {
          if (ThaiLotto[x].key === 'lotto_thai_gorverment') {
            Lotto.push({
              name: lotto[ThaiLotto[x].key].name,
              key: ThaiLotto[x].key,
              for_countdown: lotto[ThaiLotto[x].key].for_countdown,
              unique_key: lotto[ThaiLotto[x].key].unique_key,
              docID: lottoCreateOnFirstAndSixteen(),
              display_close_date_time: lotto[ThaiLotto[x].key].display_close_date_time,
              unixTimeLeft: getUnixValue(lotto[ThaiLotto[x].key].display_close_date_time),
              isOpen: checkIfTimeAlredyOver(lotto[ThaiLotto[x].key].display_close_date_time, lotto[ThaiLotto[x].key].STATUS)
            })
          }
        } else {
          //! in case lotto not created yet just create dummy to display same as below
          // Lotto.push({
          //   name: '????????????????????????????????????',
          //   key: ThaiLotto[x].key,
          //   display_close_date_time: '????????? ???????????????????????????????????? 7 ???????????????????????????????????????',
          //   unixTimeLeft: getUnixValue('12/12/1994 12:44'),
          //   isOpen: false
          // })
        }
      }
    } else {
      Lotto.push({
        name: '????????????????????????????????????',
        key: 'lotto_thai_gorverment',
        display_close_date_time: '????????? ???????????????????????????????????? 7 ???????????????????????????????????????',
        unixTimeLeft: getUnixValue('12/12/1994 12:44'),
        isOpen: false
      })
    }
    commit('SET_GOVERNMNET_LOTTO_GAME', Lotto)
  },
  getBankLotto: async ({ commit }) => {
    const baccLotto = await getNormalLotto(LottoCreateOnSixteen())
    const gsbLotto = await getNormalLotto(lottoCreateOnFirstAndSixteen())
    const Lotto = []
    if (baccLotto) {
      for (let x = 0; x < BankLotto.length; x++) {
        if (BankLotto[x].key === 'lotto_baac') {
          if (baccLotto[BankLotto[x].key] !== undefined) {
            Lotto.push({
              name: baccLotto[BankLotto[x].key].name,
              key: BankLotto[x].key,
              docID: LottoCreateOnSixteen(),
              unique_key: baccLotto[BankLotto[x].key].unique_key,
              display_close_date_time: baccLotto[BankLotto[x].key].display_close_date_time,
              unixTimeLeft: getUnixValue(baccLotto[BankLotto[x].key].display_close_date_time),
              isOpen: checkIfTimeAlredyOver(baccLotto[ThaiLotto[x].key].display_close_date_time, baccLotto[ThaiLotto[x].key].STATUS)
            })
          }
        }
      }
    } else {
      Lotto.push({
        name: '????????? ?????????.',
        key: 'lotto_baac',
        display_close_date_time: '????????? ???????????????????????????????????? 7 ???????????????????????????????????????',
        unixTimeLeft: getUnixValue('12/12/1994 12:44'),
        isOpen: false
      })
    }
    if (gsbLotto) {
      for (let x = 0; x < BankLotto.length; x++) {
        if (BankLotto[x].key === 'lotto_gsb') {
          if (gsbLotto[BankLotto[x].key] !== undefined) {
            Lotto.push({
              name: gsbLotto[BankLotto[x].key].name,
              key: BankLotto[x].key,
              docID: lottoCreateOnFirstAndSixteen(),
              unique_key: gsbLotto[BankLotto[x].key].unique_key,
              display_close_date_time: gsbLotto[BankLotto[x].key].display_close_date_time,
              unixTimeLeft: getUnixValue(gsbLotto[BankLotto[x].key].display_close_date_time),
              isOpen: checkIfTimeAlredyOver(gsbLotto[BankLotto[x].key].display_close_date_time, gsbLotto[BankLotto[x].key].STATUS)
            })
          }
        }
      }
    } else {
      Lotto.push({
        name: '???????????????????????????',
        key: 'lotto_gsb',
        display_close_date_time: '????????? ???????????????????????????????????? 7 ???????????????????????????????????????',
        unixTimeLeft: getUnixValue('12/12/1994 12:44'),
        isOpen: false
      })
    }
    commit('SET_THAI_BANK_LOTTO_GAME', Lotto)
  },
  getThaiLotto: async ({ commit }) => {
    const ThaiLotto = await getThaiStockLotto(documentDate())
    const Lotto = []
    if (ThaiLotto) {
      for (let x = 0; x < ThaiStock.length; x++) {
        if (ThaiLotto[ThaiStock[x].key] !== undefined) {
          Lotto.push({
            name: ThaiLotto[ThaiStock[x].key].name,
            key: ThaiStock[x].key,
            docID: documentDate(),
            unique_key: ThaiLotto[ThaiStock[x].key].unique_key,
            display_close_date_time: ThaiLotto[ThaiStock[x].key].display_close_date_time,
            unixTimeLeft: getUnixValue(ThaiLotto[ThaiStock[x].key].display_close_date_time),
            isOpen: checkIfTimeAlredyOver(ThaiLotto[ThaiStock[x].key].display_close_date_time, ThaiLotto[ThaiStock[x].key].STATUS)
          })
        }
      }
    }
    commit('SET_THAI_STOCK_LOTTO_GAME', Lotto)
  },
  getJubyeekee: async ({ commit }) => {
    const data = await getJubyeekee(documentDate())
    const jukyeekee = []
    if (data) {
      for (let x = 0; x < 88; x++) {
        const roundID = `round${x + 1}`
        if (data[roundID] !== undefined) {
          jukyeekee.push({
            name: data[roundID].name,
            key: roundID,
            unique_key: data[roundID].unique_key,
            docID: documentDate(),
            display_close_date_time: data[roundID].display_close_date_time,
            unixTimeLeft: getUnixValue(data[roundID].display_close_date_time),
            isOpen: checkIfTimeAlredyOver(data[roundID].display_close_date_time, data[roundID].STATUS)
          })
        }
      }
    }
    commit('SET_JUBYEEKEE_LOTTO_GAME', jukyeekee)
  }
}

const getters = {
  IndexLottoRoom: state => {
    return state.indexLotto
  },
  GovermentLottoRoom: state => {
    return state.governmentLotto
  },
  BankLottoRoom: state => {
    return state.bankLotto
  },
  ForeignLottoRoom: state => {
    return state.foreignLotto
  },
  ThaiStockRoom: state => {
    return state.thaiStockLotto
  },
  JubYeekeeRoom: state => {
    return state.jubyeekeeLotto
  },
  select_state: state => {
    return state.select_state
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
