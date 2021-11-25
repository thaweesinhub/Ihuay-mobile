import { Dark, LocalStorage, Notify } from 'quasar'
const state = {
  isDarKtheme: LocalStorage.getItem('darkMode')
}

const mutations = {
  'CHANGE_THEME' (state, payload) {
    state.isDarKtheme = payload.isDarktheme
    LocalStorage.set('darkMode', payload.isDarktheme)
    Dark.set(state.isDarKtheme)
    Notify.create({
      timeout: 1000,
      group: false,
      type: 'positive',
      message: 'Changing Theme'
    })
  }
}

const actions = {
  setUserTheme: ({ commit, state }, isDarkMode) => {
    commit('CHANGE_THEME', { isDarktheme: isDarkMode.isDarkMode })
  }
}

const getters = {
  userIsDarkMode: state => {
    return state.isDarKtheme
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
