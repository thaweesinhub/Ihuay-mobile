<template>
<q-page class="q-pa-md">
  <div class="row q-mt-lg" >
    <div class="col col-md"/>
    <div class="col-12 col-md-8">
      <q-card class="">
        <q-card-section class="flex-center" >
<!--          <q-btn class="float-left" round icon="arrow_back" v-on:click="$router.back()"/>-->
<!--          <q-btn class="float-right" label="คืนโพย"/>-->
<!--          <div class="flex-center flex">-->
<!--            <span class="text-h5  ">{{lottoInfo.gameID}} </span>-->
<!--          </div>-->
<!--          <div class="flex-center flex">-->
<!--            <span class="text-subtitle2 q-ml-xs q-mt-xs">ทำรายการเมื่อ  {{lottoInfo.display_date_time}}</span>-->
<!--          </div>-->
<!--          <div class="q-mt-sm">-->
<!--            <span class="text-subtitle2 q-ml-xs q-mt-xs">หวยปิดในเวลา {{lottoInfo.lottoCloseTime}}</span>-->
<!--          </div>-->
          <div class="row justify-between">
            <div class="col-4">
              <q-btn class="float-left" round icon="arrow_back" v-on:click="$router.back()"/>
            </div>
            <div class="col-4">
              <q-btn color="primary" class="float-right" label="คืนโพย" @click="handleReturnPoll"/>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="flex-center flex">
                <span class="text-h5">{{lottoInfo.gameName}}</span>
              </div>
              <div class="flex-center flex">
                <span class="text-subtitle2 q-ml-xs q-mt-xs">ทำรายการเมื่อ  {{lottoInfo.display_date_time}}</span>
              </div>
              <div class="flex-center flex ">
                <span class="text-caption text-bold ">หวยปิดในเวลา {{lottoInfo.lottoCloseTime}}</span>
              </div>
            </div>
          </div>
        </q-card-section >
        <q-separator class="" />
        <q-card-section class="" >
          <div class="row ">
            <div class="col boder" >
              <div class="flex flex-center">
                <span class="text-h6">เงินเดิมพัน</span>
              </div>
              <q-separator/>
              <div class="flex-center flex q-mt-md">
                <p class="text-h6 ">฿ {{lottoInfo.betPrice}}</p>
              </div>
            </div>
            <div class="col boder">
              <div class="flex flex-center">
                <span class="text-h6">ชนะ/แพ้</span>
              </div>
              <q-separator/>
              <div class="flex-center flex q-mt-md">
                <div v-if="lottoInfo.STATUS !== 'waiting' && lottoInfo.STATUS !== 'return' && lottoInfo.STATUS !== 'cancel'">
                  <p v-if="findSum(lottoInfo.boughtLottery) > 0" class="text-positive text-h6">฿ +{{findSum(lottoInfo.boughtLottery)}}</p>
                  <p v-else-if="findSum(lottoInfo.boughtLottery) < 0" class="text-h6 text-negative ">฿ {{findSum(lottoInfo.boughtLottery)}}</p>
                </div>
                <div v-else>
                  <p class="text-h6  ">฿ 0.00</p>
                </div>
              </div>
            </div>
          </div>
          <div class="boder q-mt-md" v-for="(item, k)  in getLottoSelectedInfo" :key="k">
            <div class="row boder">
              <div class="col ">
                <div class="q-mt-xs q-mx-sm">
                  <span class="text-h6 ">ลำดับที่ {{k + 1}}  </span>
                </div>
              </div>
              <div class="col">
                <div class="row">
                  <div class="col"/>
                  <div class="col">
                    <div v-if="lottoInfo.STATUS !== 'cancel' && lottoInfo.STATUS !== 'return'">
                      <div v-if="item.STATUS === 'waiting'" class="bg-warning q-pa-xs rounded-borders flex flex-center  q-ma-xs">
                        <span class="">รอผล</span>
                      </div>
                      <div v-else-if="item.STATUS === 'win'"  class="bg-positive q-pa-xs rounded-borders flex flex-center  q-ma-xs">
                        <span class="">ถูกว่างวัล</span>
                      </div>
                      <div v-else-if="item.STATUS === 'lose'"  class="bg-negative q-pa-xs rounded-borders flex flex-center  q-ma-xs">
                        <span class="">ไม่ถูกว่างวัล</span>
                      </div>
                      <div v-else-if="item.STATUS === 'return'"  class="bg-negative q-pa-xs rounded-borders flex flex-center  q-ma-xs">
                        <span class="">คืนโพย</span>
                      </div>
                    </div>
                    <div v-else-if="lottoInfo.STATUS === 'cancel'" class="bg-negative q-pa-xs rounded-borders flex flex-center  q-ma-xs">
                      <span class="">ยกเลิก</span>
                    </div>
                    <div v-else-if="lottoInfo.STATUS === 'return'" class="bg-negative q-pa-xs rounded-borders flex flex-center  q-ma-xs">
                      <span class="">คืนโพย</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="row">
              <div class="col bg-secondary q-ma-xs rounded-borders">
                <div>
                  <div class="flex flex-center q-ma-xs">
                    <span class="text-h4">{{item.num}}</span>
                  </div>
                  <div class="flex-center flex q-ma-xs">
                    <span class="text-h6">{{$t(`${item.key}`)}}</span>
                  </div>
                </div>
              </div>
              <div class="col-7 col-sm-8 ">
                <div >
                <div class="q-mt-sm q-pa-md">
                  <span class=" flex-center flex " >
                    เลขที่ออก
                    <div v-if="!item.isWaiting">
                      <div v-if="Array.isArray(item.result)">
                        <span class="q-ml-xs text-h6" v-for="value in item.result" :key="value" >{{value}}</span>
                      </div>
                      <div v-else>
                           <span  class="q-ml-xs text-h6" >{{item.result}}</span>
                      </div>
                    </div>
                  </span>
                </div>
                </div>
                <div class="flex flex-center bg-warning q-mb-xs">
                  <span>
                        ราคาจ่าย : {{item.payRate}}
                  </span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="q-ma-sm">
                  ราคาเเทง : {{item.price}} ฿
                </div>
              </div>
              <div class="col">
                <div class="q-ma-sm text-right">
                  ผลได้เสีย ฿
                  <span v-if="item.isWaiting">
                    0.00
                  </span>
                  <span v-else-if="!item.isWaiting && item.isWin" class="text-positive">
                    {{item.price * item.payRate}}
                  </span>
                  <span v-else-if="!item.isWaiting && !item.isWin" class="text-negative">
                     - {{item.price}}
                  </span>
                  <span v-else>
                    0.00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col col-md"/>
  </div>
</q-page>
</template>

<script>
import { betType } from 'src/logic/helper'
import moment from 'moment'
import { useQuasar } from 'quasar'
import { NotifyError, NotifyWarning } from 'src/logic/handler'
import { addCreditTransaction, changeBetStatus, updateUserCredit } from 'src/logic/postDocument'

export default {
  name: 'ticket_info',
  data () {
    return {
      lotto: [],
      $q: useQuasar(),
      info: this.$store.getters['PlayHistory/getSelectedInfo']
    }
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
      return wimSum - loseSum
    },
    handleReturnPoll () {
      const isBefore = moment().locale('th').isBefore(moment(this.lottoInfo.lottoCloseTime, 'DD/MM/YYYY HH:mm').subtract(15, 'minutes'))
      if (isBefore) {
        this.$q.dialog({
          title: 'โปรดตรวจสอบความถูกต้อง',
          message: 'เมื่อทำรายการไปเเล้วจะไม่สามารถกลับมาเเก้ไขได้',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          const userInfo = {
            username: this.$store.getters['userEntity/username'],
            uid: this.$store.getters['userEntity/userID'],
            BefoceCredit: this.$store.getters['userEntity/user_Credit'],
            transactionCredit: this.lottoInfo.betPrice,
            remainCredit: this.$store.getters['userEntity/user_Credit'] + this.lottoInfo.betPrice
          }
          const boughtLottoRef = this.lottoInfo.docID

          await Promise.all([
            changeBetStatus(boughtLottoRef, 'return'),
            updateUserCredit(userInfo.remainCredit, userInfo.uid),
            addCreditTransaction(
              userInfo.username,
              userInfo.username,
                `คืนโพยหวย ${this.lottoInfo.gameName} / ${moment().locale('th').format('DD/MM/YYYY')}  #${boughtLottoRef}`,
                userInfo.remainCredit,
                userInfo.transactionCredit,
                'return')
          ]).then(() => {
            this.$store.dispatch('userEntity/fetchUser')
            this.$router.back()
          }).catch((error) => {
            console.log('error @ promise')
            console.log(error)
            NotifyError('เกิดข้อผิดพลาด')
          })
        })
      } else NotifyWarning('ไม่สามารถคืนโพยได้')
    }
  },

  async created () {
    await this.$store.dispatch('PlayHistory/prepareInfo')
  },
  computed: {
    lottoInfo () {
      return this.$store.getters['PlayHistory/getSelectedInfo']
    },
    getLottoSelectedInfo () {
      return this.$store.getters['PlayHistory/getLottoSelectedInfo']
    }
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
