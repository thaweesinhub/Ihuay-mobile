<template>
  <q-table
    grid
    card-class="bg-primary text-white"
    title="หวยหุ้นต่างประเทศ"
    :rows="lotto_room"
    :columns="LottoColumns"
    row-key="name"
    no-data-label="I didn't find anything for you"
    :pagination="pagination"
    hide-header
    hide-bottom
  >
    <template v-slot:item="props">
      <q-btn class="q-pa-xs col-xs-6 col-sm-3 col-md-3 " flat  :disable="!props.row.isOpen"  v-if="props.row.isOpen" v-on:click="gotoPlay(
        props.row.key,
        props.row.name,
        props.row.unixTimeLeft,
        props.row.unique_key,
        props.row.docID,
        props.row.display_close_date_time
        )" >
        <div class="q-pa-xs col-xs-12 col-sm-12 col-md-12 ">
          <q-card class="" >
            <q-card-section  >
              <img
                style="width: 30px; height: 20px; margin-top: 1%"
                v-bind:src="
                                        iconPic('Jukyeekee', `Jukyeekee`)
                                      "
                :alt="iconPic('Jukyeekee', `Jukyeekee`)"
              />
              <br/>
              <strong class="text-h6">{{ props.row.name }}</strong>
              <br/>
              <span>เวลาปิดรับ  {{props.row.display_close_date_time}}</span>
              <br>
            </q-card-section>
            <q-separator />
            <q-card-section class="flex flex-center" >
              <div v-if="props.row.unixTimeLeft > 0 && props.row.isOpen === true">
                <vue-countdown :time="props.row.unixTimeLeft" :interval="1000" v-slot="{ totalHours, minutes, seconds }">
                  <span class="text-subtitle1" >
                    เหลือเวลา {{ totalHours }} ชั่วโมง  {{ minutes }} นาที {{ seconds }} วินาที
                  </span>
                </vue-countdown>
              </div>
              <div v-else>
                <span class="text-h6">ปิดรับแทง</span>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-btn>

    </template>
    <template v-slot:top>
      <span class="text-h5">จับยี่กี</span>
      <q-space />
    </template>
  </q-table>
</template>

<script>
export default {
  name: 'JubyeekeeLotto',
  data () {
    return {
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 0,
        rowsPerPage: 0
      },
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
    // eslint-disable-next-line camelcase
    async gotoPlay (key, name, close_date_time, unique_key, doc, dateTime) {
      await this.$store.dispatch('SelectedGameRoom/setSelectedGame',
        {
          gameName: name,
          gameKey: key,
          gameTimeLeft: close_date_time,
          gameUnique_key: unique_key,
          gameDocID: doc,
          gameType: 'jubyeekee',
          gameCloseDateTime: dateTime
        })
      await this.$router.push('playgame')
    }
  },
  computed: {
    lotto_room () {
      return this.$store.getters['LottoGame/JubYeekeeRoom']
    }
  }
}
</script>

<style scoped>

</style>
