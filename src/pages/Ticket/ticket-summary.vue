<template>
<q-page class="q-ma-md">
  <div class="flex flex-center q-ma-lg">
    <span class="text-h4">{{this.$route.name}}</span>
  </div>
  <div class="flex-center flex">
    <q-tabs
      v-model="tabView"
      align="justify"
      :breakpoint="0"
    >
      <q-tab name="wait" label="รอผล" @click="setSelectedTab('wait')" />
      <q-tab name="resulted" label="ออกผลแล้ว" @click="setSelectedTab('resulted')" />
      <q-tab class="q-pa-lg" name="all" label="ทั้งหมด" @click="setSelectedTab('all')" />
    </q-tabs>
  </div>
  <div v-if="tabView === 'wait' ">
    <div v-for="(item,i) in waitForResult" :key="i" class="q-pa-xs q-my-md col-xs-12 col-sm-6 col-md-4">
      <div class="row">
        <div class="col col-md"/>
        <div class="col-12 col-md-8">
          <q-card class="">
            <q-card-section class=""  >
              <div class="float-right">
                <q-icon name="schedule" size="sm" />
                <span class="text-subtitle2 q-ml-xs">{{item.display_date_time}}</span>
              </div>
              <div class="text-left">

                <span class="text-h5  ">{{item.gameID}} </span>
              </div>

            </q-card-section>
            <q-separator />
            <q-card-section class="" >
              <div class="row ">
                <div class="col boder" >
                  <div class="flex flex-center">
                    <span class="text-h6">เงินเดิมพัน</span>
                  </div>
                  <q-separator/>
                  <div class="flex-center flex q-mt-md">
                    <p class="text-h6 ">฿ {{item.betPrice}}</p>
                  </div>
                </div>
                <div class="col boder">
                  <div class="flex flex-center">
                    <span class="text-h6">ชนะ/แพ้</span>
                  </div>
                  <q-separator/>
                  <div class="flex-center flex q-mt-md">
                    <div v-if="!item.IsWaiting">
                      <p v-if="findSum(item.boughtLottery) > 0" class="text-positive text-h6">฿ +{{findSum(item.boughtLottery)}}</p>
                      <p v-else-if="findSum(item.boughtLottery) < 0" class="text-h6 text-negative ">฿ {{findSum(item.boughtLottery)}}</p>
                    </div>
                    <div v-else>
                      <p class="text-h6  ">฿ 0.00</p>
                    </div>

                  </div>
                </div>
              </div>
              <div class="row ">
                <div class="col-5 " >
                  <div class="q-mx-xs q-mt-sm">
                    ..
                  </div>
                </div>
                <div class="col ">
                  <div v-if="item.IsWaiting" class="bg-warning q-pa-xs q-mx-xs q-mt-sm rounded-borders flex flex-center">
                    รอผล
                  </div>
                  <div v-else class="bg-positive q-pa-xs q-mx-xs q-mt-sm rounded-borders flex flex-center">
                    ผลออกแล้ว
                  </div>
                </div>
                <div class="col ">
                  <div class="bg-grey-6 q-mx-xs q-mt-sm rounded-borders q-pa-xs flex flex-center cursor-pointer" @click="gotoNextPage(item)">
                    <q-icon name="zoom_in" size="sm" />
                    <span class="q-ml-xs">รายละเอียด</span>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col col-md"/>
      </div>

    </div>
  </div>
  <div v-if="tabView === 'resulted'">
    <div v-for="(item,i) in resulted" :key="i" class="q-pa-xs q-my-md col-xs-12 col-sm-6 col-md-4">
      <div class="row">
        <div class="col col-md"/>
        <div class="col-12 col-md-8">
          <q-card class="">
            <q-card-section class=""  >
              <div class="float-right">
                <q-icon name="schedule" size="sm" />
                <span class="text-subtitle2 q-ml-xs">{{item.display_date_time}}</span>
              </div>
              <div class="text-left">

                <span class="text-h5  ">{{item.gameID}}</span>
              </div>

            </q-card-section>
            <q-separator />
            <q-card-section class="" >
              <div class="row ">
                <div class="col boder" >
                  <div class="flex flex-center">
                    <span class="text-h6">เงินเดิมพัน</span>
                  </div>
                  <q-separator/>
                  <div class="flex-center flex q-mt-md">
                    <p class="text-h6 ">฿ {{item.betPrice}}</p>
                  </div>
                </div>
                <div class="col boder">
                  <div class="flex flex-center">
                    <span class="text-h6">ชนะ/แพ้</span>
                  </div>
                  <q-separator/>
                  <div class="flex-center flex q-mt-md">
                    <div v-if="!item.IsCancel">
                      <p v-if="findSum(item.boughtLottery) > 0" class="text-positive text-h6">฿ +{{findSum(item.boughtLottery)}}</p>
                      <p v-else class="text-h6 text-negative ">฿ {{findSum(item.boughtLottery)}}</p>
                    </div>
                    <div v-else>
                      <p class="text-h6  ">฿ 0.00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row ">
                <div class="col-5 " >
                  <div class="q-mx-xs q-mt-sm">
                    ..
                  </div>
                </div>
                <div class="col ">
                  <div v-if="item.IsWaiting" class="bg-warning q-pa-xs q-mx-xs q-mt-sm rounded-borders flex flex-center">
                    รอผล
                  </div>
                  <div v-else class="bg-positive q-pa-xs q-mx-xs q-mt-sm rounded-borders flex flex-center">
                    ผลออกแล้ว
                  </div>
                </div>
                <div class="col ">
                  <div class="bg-grey-6 q-mx-xs q-mt-sm rounded-borders q-pa-xs flex flex-center cursor-pointer" @click="gotoNextPage(item)">
                    <q-icon name="zoom_in" size="sm" />
                    <span class="q-ml-xs">รายละเอียด</span>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col col-md"/>
      </div>

    </div>
  </div>
  <div v-if="tabView === 'all'">
    <div v-for="(item,i) in allLotto" :key="i" class="q-pa-xs q-my-md col-xs-12 col-sm-6 col-md-4">
      <div class="row">
        <div class="col col-md"/>
        <div class="col-12 col-md-8">
          <q-card class="">
            <q-card-section class=""  >
              <div class="float-right">
                <q-icon name="schedule" size="sm" />
                <span class="text-subtitle2 q-ml-xs">{{item.display_date_time}}</span>
              </div>
              <div class="text-left">

                <span class="text-h5  ">{{item.gameID}}</span>
              </div>

            </q-card-section>
            <q-separator />
            <q-card-section class="" >
              <div class="row ">
                <div class="col boder" >
                  <div class="flex flex-center">
                    <span class="text-h6">เงินเดิมพัน</span>
                  </div>
                  <q-separator/>
                  <div class="flex-center flex q-mt-md">
                    <p class="text-h6 ">฿ {{item.betPrice}}</p>
                  </div>
                </div>
                <div class="col boder">
                  <div class="flex flex-center">
                    <span class="text-h6">ชนะ/แพ้</span>
                  </div>
                  <q-separator/>
                  <div class="flex-center flex q-mt-md">
                    <div v-if="!item.IsCancel">
                      <p v-if="findSum(item.boughtLottery) > 0" class="text-positive text-h6">฿ +{{findSum(item.boughtLottery)}}</p>
                      <p v-else class="text-h6 text-negative ">฿ {{findSum(item.boughtLottery)}}</p>
                    </div>
                    <div v-else>
                      <p class="text-h6  ">฿ 0.00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row ">
                <div class="col-5 " >
                  <div class="q-mx-xs q-mt-sm">
                    ........
                  </div>
                </div>
                <div class="col ">
                  <div v-if="item.IsWaiting" class="bg-warning q-pa-xs q-mx-xs q-mt-sm rounded-borders flex flex-center">
                    รอผล
                  </div>
                  <div v-else class="bg-positive q-pa-xs q-mx-xs q-mt-sm rounded-borders flex flex-center">
                    ผลออกแล้ว
                  </div>
                </div>
                <div class="col ">
                  <div class="bg-grey-6 q-mx-xs q-mt-sm rounded-borders q-pa-xs flex flex-center cursor-pointer" @click="gotoNextPage(item)">
                    <q-icon name="zoom_in" size="sm" />
                    <span class="q-ml-xs">รายละเอียด</span>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col col-md"/>
      </div>

    </div>
  </div>
</q-page>
</template>

<script>
import { betType } from 'src/logic/helper'

export default {
  name: 'ticket-summary',
  data () {
    return {
      tab: 'wait'
    }
  },
  created () {
    this.$store.dispatch('PlayHistory/getTicket_summary')
  },
  methods: {
    findSum (item) {
      let wimSum = 0
      let loseSum = 0
      for (let x = 0; x < betType.length; x++) {
        if (item[betType[x].key]) {
          for (let i = 0; i < item[betType[x].key].nums.length; i++) {
            if (item[betType[x].key].nums[i].isWin) {
              const sum = item[betType[x].key].nums[i].payRate * item[betType[x].key].nums[i].price
              wimSum = wimSum + sum
            } else {
              loseSum = loseSum + item[betType[x].key].nums[i].price
            }
          }
        }
      }
      const sum = wimSum - loseSum
      return sum
    },
    async gotoNextPage (item) {
      await this.$store.dispatch('PlayHistory/setTicket_info', item)
      await this.$router.push('ticket_info')
    },
    setSelectedTab (tab) {
      this.$store.dispatch('PlayHistory/getSelectedType',tab)
    }
  },
  computed: {
    resulted () {
      return this.$store.getters['PlayHistory/getResultedHistory']
    },
    waitForResult () {
      return this.$store.getters['PlayHistory/getWaitForResult']
    },
    allLotto () {
      return this.$store.getters['PlayHistory/getAllLottoHistory']
    },
    tabView () {
      return this.$store.getters['PlayHistory/getTabSelect']
    },
  }
}
</script>

<style scoped>

.boder {
  border-style: solid;
  border-width: 0.5px;
  border-color: gray;
}
</style>
