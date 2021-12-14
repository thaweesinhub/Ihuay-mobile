import { boot } from 'quasar/wrappers'
import 'animate.css'
import { documentDate } from 'src/logic/queryDocument'

const date = documentDate()
export default boot(async ({ app, router, store }) => {
  // await getNumberMemo()
  const data = store.getters['LottoResult/JubyeekeeLotto']
  if (data.length === 0) {
    await store.dispatch('LottoResult/setJubyeekee', { docDate: date })
  }
})
