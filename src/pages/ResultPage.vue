<template>
  <q-page class="q-pa-md scroll">
    <q-pull-to-refresh @refresh="refresh_LottoResult">
    <div class="flex flex-center">
      <span class="text-h5 " style="margin: 40px" >เลือกวันที่</span>
      <q-input v-model="selectedDate" filled type="date" placeholder="Placeholder" />
    </div>
      <gorverment-lotto/>
      <bank-lotto/>
      <foreign-lotto/>
      <thai-stock-lotto/>
      <index-lotto/>
      <jubyeekee-lotto/>
    </q-pull-to-refresh>
  </q-page>
</template>

<script>
import moment from 'moment'
import { useQuasar } from 'quasar'
import { defineComponent } from 'vue'
// eslint-disable-next-line camelcase
import { documentDate, Lotto_create_on_First_and_Sixteen_Date, Lotto_create_on_Frist } from 'src/logic/queryDocument'
import DisplayIndex from 'components/table/DisplayIndexLotto'
import DisplayGovermentLotto from 'components/table/DisplayGovermentLotto'
import DisplayThaiStockLotto from 'components/table/DisplayThaiStockLotto'
import DIsplayBankLotto from 'components/table/DIsplayBankLotto'
import DisplayForeignLotto from 'components/table/DisplayForeignLotto'
import DisplayJubyeekee from 'components/table/DisplayJubyeekee'
export default defineComponent({
  name: 'PageIndex',
  components: {
    indexLotto: DisplayIndex,
    gorvermentLotto: DisplayGovermentLotto,
    thaiStockLotto: DisplayThaiStockLotto,
    bankLotto: DIsplayBankLotto,
    foreignLotto: DisplayForeignLotto,
    jubyeekeeLotto: DisplayJubyeekee
  },
  setup () {
    return {
      q: useQuasar()
    }
  },
  data () {
    return {
      GovermentLotto: [
        {
          key: 'lotto_thai_gorverment',
          name: 'หวยรัฐบาลไทย',
          result_first_prize: '123232',
          result_run_down: ['2', '4'],
          result_run_up: ['6', '2', '1'],
          result_three_back_1: '831',
          result_three_back_2: '261',
          result_three_front_1: '512',
          result_three_front_2: '734',
          result_three_tod: ['750', '705', '570', '507', '075', '057'],
          result_three_up: '750',
          result_two_down: '24',
          result_two_up: '41'
        }
      ],
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 0,
        rowsPerPage: 0
      },
      LottoColumns: [{ name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true }],
      selectedDate: moment().locale('th').format('YYYY-MM-DD'),
      queryDate: moment().locale('th').format('DD-MM-YYYY')
    }
  },
  created () {
    this.setupLogic()
  },
  methods: {
    setupLogic (val) {
      let date = documentDate()
      let displayDate = moment().locale('th')
      if (val) {
        date = 'DATE_'.concat(moment(val).format('DD-MM-YYYY'))
        displayDate = moment(val)
      }
      this.$store.dispatch('Lotto/setIndexLotto', { docDate: date, displayDocDate: moment(displayDate).format('DD/MM/YYYY') })
      this.$store.dispatch('Lotto/setThaiStockLotto', { docDate: date })
      this.$store.dispatch('Lotto/setForeignLotto', { docDate: date })
      this.$store.dispatch('Lotto/setJubyeekee', { docDate: date })
      this.$store.dispatch('Lotto/setGovernmentLotto', { docDate: Lotto_create_on_First_and_Sixteen_Date() })
      this.$store.dispatch('Lotto/setBankLotto', { baccDate: Lotto_create_on_Frist(), gsbDate: Lotto_create_on_First_and_Sixteen_Date() })
    },
    refresh_LottoResult (done) {
      this.setupLogic()
      setTimeout(() => {
        done()
        this.selectedDate = moment().locale('th').format('YYYY-MM-DD')
      }, 1000)
    },
    iconPic (lottoName, type) {
      let images
      if (type === 'index') {
        images = require.context('src/assets/countryIcon', false, /\.png$/)
        return images('./' + lottoName + '.png')
      } else if (type === 'malay') {
        images = require.context('src/assets/countryIcon', false, /\.png$/)
        return images('./' + lottoName + '.png')
      } else if (type === 'bank') {
        images = require.context('src/assets/bankIcon', false, /\.jpeg$/)
        return images('./' + lottoName + '.jpeg')
      }
    }
  },
  watch: {
    selectedDate: function (val) {
      if (val) {
        this.setupLogic(val)
      }
    }
  }
})
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
