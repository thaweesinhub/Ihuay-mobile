<template>
  <q-table
    grid
    card-class="bg-primary text-white"
    title="หวยหุ้นไทย"
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
      lottoRows: [],
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
    }
  },
  computed: {
    ...mapGetters({
      jubyeekeeLotto_Row: 'Lotto/JubyeekeeLotto',
      selectedDate: 'Lotto/selectedDate'
    })
  }
}
</script>

<style scoped>

</style>
