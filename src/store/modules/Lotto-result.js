import { getIndexLotto, getJubyeekee, getNormalLotto, getThaiStockLotto } from 'src/logic/queryDocument'
import { BankLotto, IndexLotto, ThaiLotto, ThaiStock } from 'src/dto/lotto'
import {
  checkLottoAlreadyHaveResult,
  createDummyGovermentLotto,
  dummyBAACLotto,
  dummyGSBLotto
} from 'src/logic/validation'

const state = {
  selectedDate: null,
  indexLotto: [],
  governmentLotto: [],
  thaiStockLotto: [],
  bankLotto: [],
  foreignLotto: [],
  jubyeekeeLotto: []
}

const mutations = {
  'SET_INDEX_LOTTO_RESULT' (state, payload) {
    state.indexLotto = payload
  },
  'SET_SELECT_LOTTO_DATE' (state, payload) {
    state.selectedDate = payload
  },
  'SET_GOVERNMENT_LOTTO_RESULT' (state, payload) {
    state.governmentLotto = payload
  },
  'SET_THAI_STOCK_LOTTO_RESULT' (state, payload) {
    state.thaiStockLotto = payload
  },
  'SET_BANK_LOTTO_RESULT' (state, payload) {
    state.bankLotto = payload
  },
  'SET_FOREIGN_LOTTO_RESULT' (state, payload) {
    state.foreignLotto = payload
  },
  'SET_JUBYEEKEE_LOTTO_RESULT' (state, payload) {
    state.jubyeekeeLotto = payload
  }
}
const actions = {
  setIndexLotto: async ({ commit }, payload) => {
    const lotto = await getIndexLotto(payload.docDate)
    const Lotto = []
    if (lotto) {
      for (let x = 0; x < IndexLotto.length; x++) {
        if (lotto[IndexLotto[x].key] !== undefined) {
          Lotto.push({
            name: lotto[IndexLotto[x].key].name,
            key: IndexLotto[x].key,
            result_three_up: checkLottoAlreadyHaveResult(lotto[IndexLotto[x].key].result_three_up),
            result_two_down: checkLottoAlreadyHaveResult(lotto[IndexLotto[x].key].result_two_down)
          })
        }
      }
    }
    commit('SET_SELECT_LOTTO_DATE', payload.displayDocDate)
    commit('SET_INDEX_LOTTO_RESULT', Lotto)
  },
  setGovernmentLotto: async ({ commit }, payload) => {
    const lotto = await getNormalLotto(payload.docDate)
    console.log(payload.docDate)
    const Lotto = []
    if (lotto) {
      for (let x = 0; x < ThaiLotto.length; x++) {
        if (lotto[ThaiLotto[x].key] !== undefined) {
          if (ThaiLotto[x].key === 'lotto_thai_gorverment') {
            Lotto.push({
              name: lotto[ThaiLotto[x].key].name,
              key: ThaiLotto[x].key,
              result_first_prize: checkLottoAlreadyHaveResult(lotto[ThaiLotto[x].key].result_first_prize),
              result_three_back_1: checkLottoAlreadyHaveResult(lotto[ThaiLotto[x].key].result_three_back_1),
              result_three_back_2: checkLottoAlreadyHaveResult(lotto[ThaiLotto[x].key].result_three_back_2),
              result_three_front_1: checkLottoAlreadyHaveResult(lotto[ThaiLotto[x].key].result_three_front_1),
              result_three_front_2: checkLottoAlreadyHaveResult(lotto[ThaiLotto[x].key].result_three_front_2),
              result_two_down: checkLottoAlreadyHaveResult(lotto[ThaiLotto[x].key].result_two_down)
            })
          }
        } else {
          //! in case lotto not created yet just create dummy to display same as below
          // Lotto.push(createDummyGovermentLotto())
        }
      }
    } else {
      Lotto.push(createDummyGovermentLotto())
    }
    commit('SET_GOVERNMENT_LOTTO_RESULT', Lotto)
  },
  setThaiStockLotto: async ({ commit }, payload) => {
    const lotto = await getThaiStockLotto(payload.docDate)
    const Lotto = []
    if (lotto) {
      for (let x = 0; x < ThaiStock.length; x++) {
        if (lotto[ThaiStock[x].key] !== undefined) {
          Lotto.push({
            name: lotto[ThaiStock[x].key].name,
            key: ThaiStock[x].key,
            result_three_up: checkLottoAlreadyHaveResult(lotto[ThaiStock[x].key].result_three_up),
            result_two_down: checkLottoAlreadyHaveResult(lotto[ThaiStock[x].key].result_two_down)
          })
        }
      }
    }
    commit('SET_THAI_STOCK_LOTTO_RESULT', Lotto)
  },
  setBankLotto: async ({ commit }, payload) => {
    const baccLotto = await getNormalLotto(payload.baccDate)
    const gsbLotto = await getNormalLotto(payload.gsbDate)
    const Lotto = []
    if (baccLotto) {
      for (let x = 0; x < BankLotto.length; x++) {
        if (BankLotto[x].key === 'lotto_baac') {
          if (baccLotto[BankLotto[x].key] !== undefined) {
            Lotto.push({
              name: baccLotto[BankLotto[x].key].name,
              key: BankLotto[x].key,
              result_three_up: checkLottoAlreadyHaveResult(baccLotto[BankLotto[x].key].result_three_up),
              result_two_down: checkLottoAlreadyHaveResult(baccLotto[BankLotto[x].key].result_two_down)
            })
          } else {
            Lotto.push(dummyBAACLotto)
          }
        }
      }
    } else {
      Lotto.push(dummyBAACLotto)
    }
    if (gsbLotto) {
      for (let x = 0; x < BankLotto.length; x++) {
        if (BankLotto[x].key === 'lotto_gsb') {
          if (gsbLotto[BankLotto[x].key] !== undefined) {
            Lotto.push({
              name: gsbLotto[BankLotto[x].key].name,
              key: BankLotto[x].key,
              result_three_up: checkLottoAlreadyHaveResult(gsbLotto[BankLotto[x].key].result_three_up),
              result_two_down: checkLottoAlreadyHaveResult(gsbLotto[BankLotto[x].key].result_two_down)
            })
          } else {
            Lotto.push(dummyGSBLotto)
          }
        }
      }
    } else {
      Lotto.push(dummyGSBLotto)
    }
    commit('SET_BANK_LOTTO_RESULT', Lotto)
  },
  setForeignLotto: async ({ commit }, payload) => {
    const lotto = await getNormalLotto(payload.docDate)
    const Lotto = []
    if (lotto) {
      for (let x = 0; x < ThaiLotto.length; x++) {
        if (lotto[ThaiLotto[x].key] !== undefined && ThaiLotto[x].key === 'lotto_maylasia') {
          Lotto.push({
            name: lotto[ThaiLotto[x].key].name,
            key: ThaiLotto[x].key,
            result_three_up: checkLottoAlreadyHaveResult(lotto[ThaiLotto[x].key].result_three_up),
            result_two_down: checkLottoAlreadyHaveResult(lotto[ThaiLotto[x].key].result_two_down)
          })
        }
      }
    }
    commit('SET_FOREIGN_LOTTO_RESULT', Lotto)
  },
  setJubyeekee: async ({ commit }, payload) => {
    const jukyeekee = await getJubyeekee(payload.docDate)
    const Jukyeeke = []
    if (jukyeekee) {
      for (let x = 0; x < 88; x++) {
        const roundID = `round${x + 1}`
        if (jukyeekee[roundID] !== undefined) {
          Jukyeeke.push({
            name: jukyeekee[roundID].name,
            key: roundID,
            index: x + 1,
            result_three_up: checkLottoAlreadyHaveResult(jukyeekee[roundID].result_three_up),
            result_two_down: checkLottoAlreadyHaveResult(jukyeekee[roundID].result_two_down)
          })
        }
      }
    }
    commit('SET_JUBYEEKEE_LOTTO_RESULT', Jukyeeke)
  }
}

const getters = {
  IndexLotto: state => {
    return state.indexLotto
  },
  selectedDate: state => {
    return state.selectedDate
  },
  GovernmentLotto: state => {
    return state.governmentLotto
  },
  ThaiStockLotto: state => {
    return state.thaiStockLotto
  },
  BankLotto: state => {
    return state.bankLotto
  },
  ForeignLotto: state => {
    return state.foreignLotto
  },
  JubyeekeeLotto: state => {
    return state.jubyeekeeLotto
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
