import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import userEntity from './modules/user'
import appearance from './modules/appearance'
import LottoResult from './modules/Lotto-result'
import NumberMemo from './modules/number-memo'
import LottoGame from './modules/Lotto-game'
import SelectedGameRoom from './modules/Select-game-room'
import PlayHistory from './modules/play-history'
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    plugins: [createPersistedState({
      storage: window.sessionStorage
    })],
    modules: {
      appearance,
      userEntity,
      LottoResult,
      NumberMemo,
      LottoGame,
      SelectedGameRoom,
      PlayHistory
    },
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
