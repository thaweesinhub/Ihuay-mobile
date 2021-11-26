import { boot } from 'quasar/wrappers'
// eslint-disable-next-line camelcase
import { documentDate } from 'src/logic/queryDocument'
const date = documentDate()

export default boot(async ({ app, router, store }) => {
  const data = store.getters['Lotto/JubyeekeeLotto']
  if (data.length === 0) {
    await store.dispatch('Lotto/setJubyeekee', { docDate: date })
    console.log(store.getters['Lotto/JubyeekeeLotto'])
  }
})
