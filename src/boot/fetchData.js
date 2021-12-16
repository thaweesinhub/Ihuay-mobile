import { boot } from 'quasar/wrappers'
import 'animate.css'
import vueAwesomeCountdown from 'vue-awesome-countdown'
import VueCountdown from '@chenfengyuan/vue-countdown'
import { documentDate } from 'src/logic/queryDocument'
const date = documentDate()
export default boot(async ({ app, router, store }) => {
  // await getNumberMemo()
  app.use(vueAwesomeCountdown, 'vac')
  app.component(VueCountdown.name, VueCountdown)
  const data = store.getters['LottoResult/JubyeekeeLotto']
  if (data.length === 0) {
    await store.dispatch('LottoResult/setJubyeekee', { docDate: date })
  }
})
