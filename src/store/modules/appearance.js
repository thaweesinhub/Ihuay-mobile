import { Dark, LocalStorage, Notify } from 'quasar'
const state = {
  isDarKtheme: LocalStorage.getItem('darkMode'),
  language: LocalStorage.getItem('language')
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
  },
  'CHANGE_LANGUAGE' (state, payload) {
    state.language = payload
    LocalStorage.set('language', payload)
  }
}

const actions = {
  setUserTheme: ({ commit, state }, isDarkMode) => {
    commit('CHANGE_THEME', { isDarktheme: isDarkMode.isDarkMode })
  },
  setUserLanguage: ({ commit, state }, selectLanguage) => {
    commit('')
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
