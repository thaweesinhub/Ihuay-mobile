<template>
  <q-table
    grid
    class="q-pa-md gt-sm"
    card-class="bg-primary text-white"
    title="หก"
    :rows="jubyeekeeLotto_Row"
    :columns="LottoColumns"
    row-key="name"
    no-data-label="I didn't find anything for you"
    :pagination="pagination"
    hide-header
    hide-bottom
  >
    <template v-slot:item="props" >
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
        <q-card class="">
          <q-card-section class="text-center">
            <strong>{{ props.row.name }}</strong>
            <br>
            <img
              style="width: 50px; height: 30px; margin-top: 1%"
              v-bind:src="
                          iconPic('Jukyeekee', `Jukyeekee`)
                        "
              :alt="iconPic('Jukyeekee', `Jukyeekee`)"
            />
          </q-card-section>
          <q-separator />
          <q-card-section class="flex flex-center" >
            <div>3 ตัวบน :  <strong class="text-h6">{{props.row.result_three_up}}</strong></div>
            <q-separator vertical spaced></q-separator>
            <div>2 ตัวล่าง : <strong class="text-h6">{{props.row.result_two_down}}</strong></div>
          </q-card-section>
        </q-card>
      </div>
    </template>
    <template v-slot:top>
      <span class="text-h5">จับยี่กี</span>
      <q-space />
      <span class="text-h6">{{selectedDate}} </span>
    </template>
  </q-table>
  <q-table
    grid
    class="q-pa-md lt-md"
    card-class="bg-primary text-white"
    :rows="jubyeekeeLotto_Row"
    :columns="LottoColumns"
    row-key="name"
    no-data-label="I didn't find anything for you"
    :pagination="pagination"
    hide-header
    hide-bottom
  >
    <template v-slot:item="props" >
      <div class="q-pa-xs  row items-start q-gutter-md">
          <q-btn padding="sm"  v-on:click="test(props.row)">{{props.row.index}}</q-btn>
      </div>
    </template>
    <template v-slot:top>
      <span class="text-h5">จับยี่กี</span>
      <q-space />
      <span class="text-h6">{{selectedDate}} </span>
    </template>
  </q-table>
  <transition-group
    enter-active-class="animate__animated animate__fadeInLeftBig"
    leave-active-class="animate__animated animate__lightSpeedOutRight "
  >
  <div class="q-pa-md lt-md"  v-for="item in lottoRows" :key="item.name">
    <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
        <q-card class="" >
          <q-card-section class="text-center">
            <strong>{{item.name}}</strong>
            <br>
            <img
              style="width: 50px; height: 30px; margin-top: 1%"
              v-bind:src="
                          iconPic('Jukyeekee', `Jukyeekee`)
                        "
              :alt="iconPic('Jukyeekee', `Jukyeekee`)"
            />
          </q-card-section>
          <q-separator />
          <q-card-section class="flex flex-center" >
            <div>3 ตัวบน :  <strong class="text-h6">{{item.result_three_up}}</strong></div>
            <q-separator vertical spaced></q-separator>
            <div>2 ตัวล่าง : <strong class="text-h6">{{item.result_two_down}}</strong></div>
          </q-card-section>
        </q-card>
    </div>
  </div>
  </transition-group>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DisplayJubyeekee',
  data () {
    return {
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 0,
        rowsPerPage: 0
      },
      loop: 0,
      lottoRows: [{ name: 'testyeekee', result_two_down: '548', result_three_up: '132' }],
      LottoColumns: [{ name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true }]
    }
  },
  methods: {
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
      } else if (type === 'Jukyeekee') {
        images = require.context('src/assets/jubyeekee', false, /\.png$/)
        return images('./' + lottoName + '.png')
      }
    },
    testLoop () {
      this.lottoRows.splice(0, 1)
      if (this.loop === 88) {
        this.loop = 0
      }
      setTimeout(() => {
        this.lottoRows.push(this.jubyeekeeLotto_Row[this.loop])
        this.loop++
      }, 1000)
      setTimeout(this.testLoop, 6000)
    },
    test (data) {
      this.lottoRows.splice(0, 1)
      setTimeout(() => {
        this.lottoRows.push(data)
      }, 900)

      // this.JubyeekeeArray.push(data)
      // this.yeekeeShortViewModel = data
      // console.log(this.yeekeeShortViewModel)
    }
  },
  async created () {
    this.testLoop()
  },
  computed: {
    ...mapGetters({
      jubyeekeeLotto_Row: 'LottoResult/JubyeekeeLotto',
      selectedDate: 'LottoResult/selectedDate'
    })
  }
}
</script>

<style scoped>

</style>
