<template>
  <q-page class="q-pa-md scroll">
    <q-pull-to-refresh >
      <div class="flex flex-center">
        <span class="text-h5 " style="margin-top: 40px" >เลือกหวยที่ต้องการ</span>
      </div>
      <div class="flex flex-center">
        <div class="q-pa-md">
          <div class="q-gutter-y-md" style="max-width: 600px">
            <q-tabs
              v-model="tab"
              dense
              align="left"
              class=""
              :breakpoint="0"
              @click="testing()"
            >
              <q-tab name="lotto" label="หวย" />
              <q-tab name="yeekee" label="จับยี่กี 24 ซม" />
            </q-tabs>
          </div>
        </div>
      </div>
      <div v-if="changeView === 'lotto'">
        <gorverment-lotto/>
        <bank-lotto/>
        <thai-index/>
        <index-lotto/>
      </div>
      <div v-else>
        <JubyeekeeLotto/>
      </div>

    </q-pull-to-refresh>
  </q-page>

</template>

<script>
import indexLottoRoom from 'components/select_game_room/index_lotto'
import gorvermentlotto from 'components/select_game_room/gorverment_lotto'
import bankLotto from 'components/select_game_room/bankLotto'
import thaiIndexLotto from 'components/select_game_room/thaiIndexLotto'
import JubyeekeeLotto from 'components/select_game_room/JubyeekeeLotto'

export default {
  name: 'select_room_layout',
  components: {
    JubyeekeeLotto,
    indexLotto: indexLottoRoom,
    gorvermentLotto: gorvermentlotto,
    ThaiIndex: thaiIndexLotto,
    bankLotto: bankLotto
  },

  methods: {
    setup () {
      this.$store.dispatch('LottoGame/getIndexLottoRoom')
      this.$store.dispatch('LottoGame/getGovernmentLotto')
      this.$store.dispatch('LottoGame/getBankLotto')
      this.$store.dispatch('LottoGame/getThaiLotto')
      this.$store.dispatch('LottoGame/getJubyeekee')
    },
    testing () {
      this.$store.dispatch('LottoGame/changeView', this.tab)
    }
  },
  data () {
    return {
      tab: this.$store.getters['LottoGame/select_state']
    }
  },
  created () {
    this.setup()
  },
  computed: {
    changeView () {
      return this.$store.getters['LottoGame/select_state']
    }
  }

}
</script>

<style scoped>

</style>
