<template>
  <q-table
    grid
    card-class="bg-primary text-white"
    title="หวยหุ้นต่างประเทศ"
    :rows="index_lotto_room"
    :columns="LottoColumns"
    row-key="name"
    no-data-label="I didn't find anything for you"
    :pagination="pagination"
    hide-header
    hide-bottom
  >
    <template v-slot:item="props">
      <q-btn class="q-pa-xs col-xs-6 col-sm-3 col-md-3" flat  :disable="!props.row.isOpen" v-on:click="gotoPlay(
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
                                        iconPic(props.row.key, `index`)
                                      "
                :alt="iconPic(props.row.key, `index`)"
              />
              <br/>
              <strong>{{ props.row.name }}</strong>
              <br/>
              <span>เวลาปิดรับ  {{props.row.display_close_date_time}}</span>
              <br>
            </q-card-section>
            <q-separator />
            <q-card-section class="flex flex-center" >
              <div v-if="props.row.unixTimeLeft > 0 && props.row.isOpen === true">
                <vue-countdown :time="props.row.unixTimeLeft" :interval="1000" v-slot="{ totalHours, minutes, seconds }" @end="closeRoom(props.rowIndex)">
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
      <span class="text-h5">หวยหุ้นต่างประเทศ</span>
      <q-space />
    </template>
  </q-table>
</template>

<script>
export default {
  name: 'index_lotto',
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
    closeRoom (index) {
      this.$store.dispatch('LottoGame/setTimeoutLotto', index)
    },
    sss () {
      alert('sss')
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
    },
    // eslint-disable-next-line camelcase
    async gotoPlay (key, name, close_date_time, unique_key, doc,dateTime) {
      await this.$store.dispatch('SelectedGameRoom/setSelectedGame',
        {
          gameName: name,
          gameKey: key,
          gameTimeLeft: close_date_time,
          gameUnique_key: unique_key,
          gameDocID: doc,
          gameType: 'lotto',
          gameCloseDateTime: dateTime
        })
      await this.$router.push('playgame')
    }
  },
  computed: {
    index_lotto_room () {
      return this.$store.getters['LottoGame/IndexLottoRoom']
    }
  }
}
</script>

<style scoped>

</style>
