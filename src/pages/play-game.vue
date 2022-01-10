<template>
  <q-page class="q-pa-md">
    <div class="q-ma-lg">
      <q-btn class="float-left" round icon="arrow_back" v-on:click="$router.go(-1)"/>
      <span class="text-h4 flex-center flex">{{gameInfo.gameName}}</span>
      <div class="text-h6 flex flex-center ">เวลาเหลือ
        <div class="q-ml-sm" v-if="gameInfo.gameTimeLeft > 0 ">
          <vue-countdown :time="gameInfo.gameTimeLeft" :interval="1000" v-slot="{ totalHours, minutes, seconds }" @end="$router.go(-1)">
                  <span class="text-h6" >
                   {{ totalHours }} ชั่วโมง  {{ minutes }} นาที {{ seconds }} วินาที
                  </span>
          </vue-countdown>
        </div>
        <div v-else>
          <span class="text-h6">ปิดรับแทง</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md">
        <div class="row">
          <div class="col">
            <div class="q-mx-sm cursor-pointer " @click="setSelectedBetType('three_up')">
              <div class="row">
                <div class="col-8 bg-blue-7 q-pa-md ">
                  <span class="flex-center flex">{{$t('three_up')}}</span>
                </div>
                <div class="col bg-primary flex-center flex">
                  <span class="flex flex-center" >{{setGamePayRate('three_up')}}</span>
                </div>
              </div>
            </div>

            <div class="q-ma-sm cursor-pointer" @click="setSelectedBetType('two_up')">
              <div class="row">
                <div class="col-8 bg-orange-7 q-pa-md">
                  <span class="flex-center flex">{{$t('two_up')}}</span>
                </div>
                <div class="col bg-orange-12 flex-center flex">
                  <span class="flex flex-center" >{{setGamePayRate('two_up')}}</span>
                </div>
              </div>
            </div>

            <div class="q-ma-sm cursor-pointer" @click="setselectedAddOn('three_reverse')">
              <div class="row">
                <div class="col-8 bg-blue-6 q-pa-md">
                  <span class="flex-center flex">{{$t('three_reverse')}}</span>
                </div>
                <div class="col bg-primary flex-center flex">
                  <q-icon name="swap_horiz" size="lg"/>
                </div>
              </div>
            </div>

            <div class="q-ma-sm cursor-pointer" @click="setSelectedBetType('run_up')">
              <div class="row">
                <div class="col-8 bg-green-7 q-pa-md">
                  <span class="flex-center flex">{{$t('run_up')}}</span>
                </div>
                <div class="col bg-light-green-9 flex-center flex">
                  <span class="flex flex-center" >{{setGamePayRate('run_up')}}</span>
                </div>
              </div>
            </div>

          </div>
          <div class="col">
            <div class="q-mx-sm cursor-pointer" @click="setSelectedBetType('three_up_tod')">
              <div class="row">
                <div class="col-8 bg-blue-6 q-pa-md">
                  <span class="flex-center flex">{{$t('three_up_tod')}}</span>
                </div>
                <div class="col bg-primary flex-center flex">
                  <span class="flex flex-center" >{{setGamePayRate('three_up_tod')}}</span>
                </div>
              </div>
            </div>

            <div class="q-ma-sm cursor-pointer" @click="setSelectedBetType('two_down')">
              <div class="row">
                <div class="col-8 bg-orange-7 q-pa-md">
                  <span class="flex-center flex">{{$t('two_down')}}</span>
                </div>
                <div class="col bg-orange-12 flex-center flex">
                  <span class="flex flex-center" >{{setGamePayRate('two_down')}}</span>
                </div>
              </div>
            </div>

            <div class="q-ma-sm cursor-pointer" @click="setselectedAddOn('two_reverse')">
              <div class="row">
                <div class="col-8 bg-orange-7 q-pa-md">
                  <span class="flex-center flex">{{$t('two_reverse')}}</span>
                </div>
                <div class="col bg-orange-12 flex-center flex">
               <q-icon name="swap_horiz" size="lg"/>
                </div>
              </div>
            </div>

            <div class="q-ma-sm cursor-pointer" @click="setSelectedBetType('run_down')">
              <div class="row">
                <div class="col-8 bg-green-7 q-pa-md">
                  <span class="flex-center flex">{{$t('run_down')}}</span>
                </div>
                <div class="col bg-light-green-9 flex-center flex">
                  <span class="flex flex-center" >{{setGamePayRate('run_down')}}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div style="border-width: 1px; border-style: solid; border-color: gray">
          <div class="flex-center flex " >
            <span class="text-h6">รายการที่เลือก</span>
          </div>
          <q-separator/>
          <div class="flex flex-center q-mt-sm " >
            <p class="bg-secondary q-pa-sm q-mx-md rounded-borders">{{$t(`${selectType}`)}}</p>
            <p class="bg-secondary q-pa-sm q-mx-md rounded-borders" v-if="selectedAddOn">{{$t(selectedAddOn)}}</p>
          </div>
          <q-separator/>
          <div class="flex flex-center q-ma-md " >
            <div class="flex flex-center">
              <v-otp-input
                ref="otpInput"
                input-classes="otp-input"
                separator="-"
                :num-inputs="number_input"
                :should-auto-focus="true"
                :is-input-num="true"
                input-type="tel"
                @on-complete="handleOnComplete"
              />
            </div>
          </div>
          <div class="flex flex-center q-my-md">
            <q-btn class="" color="negative" label="ล้างค่า" @click="handleClearInput()"/>
          </div>
          <q-separator/>
          <div class="flex-center flex q-ma-lg">
            <q-btn class="q-mr-md" color="primary" label="เลือกเลขชุด" size="md" @click="dialog = true"/>
            <q-dialog  v-model="dialog" >
              <q-card class="my-card q-pa-lg">
                <q-table
                  grid
                  title="เลือกเลขชุด"
                  :rows="number_memo_row"
                  :columns="columns"
                  row-key="displayname"
                  :pagination="pagination"
                  selection="multiple"
                  v-model:selected="selected"
                  hide-header
                  hide-bottom
                >
                  <template v-slot:item="props">
                    <div
                      class="q-pa-xs grid-style-transition"
                      :style="props.selected ? 'transform: scale(0.95);' : ''"
                    >
                      <q-card :class="props.selected ? 'animate__animated  animate__headShake' : ''">
                        <q-card-section>
                          <q-checkbox class="text-h5" dense v-model="props.selected" :label="props.row.displayname"/>
                        </q-card-section>
                        <q-separator/>
                        <q-list dense>
                          <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                            <q-item-section>
                              <q-item-label class="text-h6">{{ col.label }}</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <div v-if="Array.isArray(col.value)">
                                <q-item-label caption v-for="item in col.value" :key="item"><span
                                  class="text-subtitle1">{{ item.displayText }} : </span>
                                  <span class="text-subtitle1">{{
                                      item.value
                                    }} </span></q-item-label>
                              </div>
                              <div v-else>
                                <q-item-label caption ><span class="text-subtitle1">{{ col.value }}</span></q-item-label>
                              </div>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-card>
                    </div>
                  </template>
                </q-table>
                <q-btn  class="flex-center flex q-mt-lg" color="primary" label="select" v-close-popup @click="handleAddMemo" :disable="selected.length === 0"/>
              </q-card>
            </q-dialog>
            <q-btn color="primary" label="ดึงจากโพยเก่า" size="md" @click="historyDialog = true"/>
            <q-dialog  v-model="historyDialog" >
              <q-card class="flex-center flex">
                <q-table
                  grid
                  title="เลือกจากโพยหวย"
                  :rows="playhistory_row"
                  :columns="columns2"
                  row-key="key"
                  :pagination="pagination"
                  selection="multiple"
                  v-model:selected="selected"
                  hide-header
                  hide-bottom
                >
                  <template v-slot:item="props">
                    <div
                      class="q-pa-xs flex-center flex"
                      :style="props.selected ? 'transform: scale(0.95);' : ''"
                    >
                      <q-card :class="props.selected ? 'animate__animated  animate__headShake' : ''">
                        <q-card-section>
                          <q-checkbox class="text-h5" dense v-model="props.selected" :label="props.row.displayname"/>
                        </q-card-section>
                        <q-separator/>
                        <q-list dense>
                          <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                            <q-item-section>
                              <q-item-label class="text-h6">{{ col.label }}</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <div v-if="Array.isArray(col.value)">
                                <q-item-label caption v-for="item in col.value" :key="item"><span
                                  class="text-subtitle1">{{ item.type }} : </span>
                                  <span class="text-subtitle1">{{
                                      item.value
                                    }} </span></q-item-label>
                              </div>
                              <div v-else>
                                <q-item-label caption ><span class="text-subtitle1">{{ col.value }}</span></q-item-label>
                              </div>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-card>
                    </div>
                  </template>
                </q-table>
                <q-btn  class="flex-center flex q-mt-lg" color="primary" label="select" v-close-popup @click="handleAddMemo" :disable="selected.length === 0"/>
              </q-card>
            </q-dialog>
          </div>
        </div>
      </div>
      <div class="col-12 col-md">
        <div class="">
          <div class="row bg-primary">
            <div class="col">
              <q-icon size="md" name="bookmark"/>
              <span class="text-subtitle1"> ใส่ราคา</span>
            </div>
            <div class="col flex-center flex">
              <span class="q-mr-xs text-subtitle1">รายการที่เลือก</span>
              <span class="text-subtitle1">{{total_selectNumber}}</span>
            </div>
          </div>
          <div class="row">
            <div class="col flex-center flex ">
              ลำดับ
            </div>
            <div class="col flex-center flex ">
              แทงเลข
            </div>
            <div class="col flex-center flex ">
              แทง ฿
            </div>
            <div class="col flex-center flex ">
              จ่าย
            </div>
            <div class="col flex-center flex ">
              ชนะ
            </div>
            <div class="col flex-center flex ">
              ลบ
            </div>
          </div>
          <div>
          </div>
          <transition-group
            enter-active-class="animate__animated animate__fadeInUp"
            leave-active-class="animate__animated animate__fadeOutDownBig ">
          <div class=" " v-for="(item,y) in SelectLotto" :key="y">
            <div class="q-gutter-xs q-my-xs q-ml-xs">
              <span class="text-subtitle1 q-pl-sm q-mr-sm flex-center">{{$t(item.key)}}</span>
              <q-btn color="info" :label="item" :key="item" v-for="item in priceLoop" v-on:click="setBetTypePrice(y, item)" />
            </div>
            <transition-group
              enter-active-class="animate__animated animate__fadeInUp"
              leave-active-class="animate__animated animate__fadeOutDownBig ">
            <div class="row q-my-sm text-h6" style="border-color: gray; border-style: solid; border-width: 0.1px" v-for="(selectNum, x) in item.select_number" :key="x">
              <div class="col flex flex-center ">
                {{x +1}}
              </div>
              <div class="col flex flex-center">
                {{selectNum.num}}
              </div>
              <div class="col flex flex-center">
                <q-input class="flex-center flex text-h6"  v-model.number="selectNum.price" type="tel"  @keypress="isNumber($event)" />
              </div>
              <div class="col flex flex-center">
                {{selectNum.payRate}}
              </div>
              <div class="col flex flex-center">
                {{selectNum.price * selectNum.payRate}}
              </div>
              <div class="col text-right ">
                <q-btn color="negative" padding="md sm" icon="delete_forever" v-on:click="deleteSelectNumber(y,x)" />
              </div>
            </div>
            </transition-group>
            <q-separator/>
          </div>
          </transition-group>
<!--          <div class="row">-->
<!--            <div class="col q-pa-xs">-->
<!--              <div class="column" style="height: 70px">-->
<!--                <div class="column cursor-pointer" style="height: 70px" @click="handleCheckDuplicateNum()">-->
<!--                  <div class="col   bg-warning flex-center flex">-->
<!--                    <q-icon class="q-mr-xs" name="search" size="lg" />-->
<!--                    <span class="text-h6">-->
<!--                    ตรวจเลขซ้ำ-->
<!--                  </span>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="col q-pa-xs">-->
<!--              <div class="column" style="height: 70px">-->
<!--                <div class="column cursor-pointer" style="height: 70px" @click="deleteAllSelected()">-->
<!--                  <div class="col   bg-warning flex-center flex">-->
<!--                    <q-icon class="q-mr-xs" name="highlight_off" size="lg" />-->
<!--                    <span class="text-h6">-->
<!--                    ตัดเลขซ้ำ-->
<!--                  </span>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
          <div class="row">
            <div class="col q-pa-xs">
              <div class="column" style="height: 70px">
                <div class="col   bg-secondary flex-center flex">
                  ยอดเครดิตคงเหลือ
                </div>
                <div class="col-8 bg-teal-4 flex flex-center">
                    {{this.$store.getters['userEntity/user_Credit']}}
                </div>
              </div>
            </div>
            <div class="col q-pa-xs">
              <div class="column" style="height: 70px">
                <div class="col   bg-secondary flex-center flex">
                  รวมยอดแทง
                </div>
                <div class="col-8 bg-teal-4 flex flex-center">
                  {{total_bet}}
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col q-pa-xs">
              <div class="column cursor-pointer" style="height: 70px" @click="deleteAllSelected()">
                <div class="col   bg-negative flex-center flex">
                  <q-icon class="q-mr-xs" name="delete_forever" size="lg" />
                  <span class="text-h6">
                    ล้างรายการ
                  </span>
                </div>
              </div>
            </div>
            <div class="col q-pa-xs">
              <div class="column cursor-pointer" style="height: 70px" @click="handleSentLotto()">
                <div class="col   bg-positive flex-center flex" >
                  <q-icon class="q-mr-xs" name="send" size="lg" />
                  <span class="text-h6">
                    ส่งโพย
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import OtpInput from 'vue3-otp-input'
import { Loading, useQuasar } from 'quasar'
import { ref } from 'vue'
import { NotifyError, NotifyWarning } from 'src/logic/handler'
import { betType, covertBetTypeENGtoTH, inRange } from 'src/logic/helper'
import { queryDocument } from 'src/logic/queryDocument'
import {
  createDummy,
  createLottoOrder,
  createNumberPrice,
  updateNumberPrice,
  updateUserCredit
} from 'src/logic/postDocument'
const columns = [
  {
    name: 'desc',
    required: true,
    label: 'ชื่อเลขชุด',
    align: 'left',
    field: row => row.displayname,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'createTime',
    align: 'center',
    label: 'วันที่สร้าง',
    field: 'createTime',
    sortable: true
  },
  {
    name: 'selectNumber',
    label: 'เลข',
    field: 'selectNumber',
    sortable: true
  }
]
const columns2 = [
  {
    name: 'desc',
    required: true,
    label: 'ชื่อเลขชุด',
    align: 'left',
    field: row => row.displayname,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'createTime',
    align: 'center',
    label: 'playedGame',
    field: 'createTime',
    sortable: true
  },
  {
    name: 'selectNumber',
    label: 'เลข',
    field: 'selectNumber',
    sortable: true
  }
]

export default {

  name: 'play-game',
  components: {
    'v-otp-input': OtpInput
  },
  data () {
    return {
      otpInput: ref(''),
      selectType: 'three_up',
      selectedAddOn: '',
      SelectLotto: [],
      priceLoop: [1, 5, 10, 20, 50],
      test: '',
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 0,
        rowsPerPage: 0
      },
      number_memo_row: [],
      playhistory_row: [],
      selectedHistory: [],
      selected: [],
      dialog: false,
      historyDialog: false,
      priceRate: {},
      info: {},
      $q: useQuasar()
    }
  },
  computed: {
    number_input () {
      if (this.selectType === 'three_up' || this.selectType === 'three_up_tod') {
        return 3
      } else if (this.selectType === 'two_up' || this.selectType === 'two_down') {
        return 2
      } else if (this.selectType === 'run_up' || this.selectType === 'run_down') {
        return 1
      } else {
        return 0
      }
    },
    total_selectNumber () {
      let number = 0
      this.SelectLotto.forEach((type) => {
        type.select_number.forEach(() => {
          number++
        })
      })
      return number
    },
    total_bet () {
      let number = 0
      this.SelectLotto.forEach((type) => {
        type.select_number.forEach((item) => {
          number = number + item.price
        })
      })
      return number
    },
    gameInfo () {
      return this.$store.getters['SelectedGameRoom/getSelectedGame']
    }
  },
  methods: {
    handleOnComplete (value) {
      if (!this.selectedAddOn) {
        this.addNumber(value, this.selectType)
      } else {
        const mutations = this.permutations(value)
        mutations.forEach((item) => { this.addNumber(item, this.selectType) })
      }
    },
    handleClearInput () {
      this.$refs.otpInput.clearInput()
    },
    handleAddMemo () {
      this.selected.forEach((item) => {
        console.log(item.selectNumber)
        item.selectNumber.forEach((x) => {
          this.addNumber(x.value, x.type)
        })
      })
      this.selected = []
    },
    handleAddPlayHistory () {
      console.log(this.selectedHistory)
    },
    async handleSentLotto () {
      const isDupilcateCloseNum = this.checkForCloseNumber()
      const isMax = this.checkForMaxNumber()

      const checkPriceRate = await this.checkForPriceRate()
      const isNotprice = this.checkUserInput()
      const checkUserAmout = this.checkUserAmout()
      const isBoughtLotto = this.SelectLotto.length > 0
      if (!isDupilcateCloseNum && !isMax && !isNotprice && !checkPriceRate && !checkUserAmout && isBoughtLotto) {
        this.confirmDialog()
      }
    },
    addNumber (number, type) {
      console.log(type)
      const price = this.$store.getters['SelectedGameRoom/getSelectedGame']
      if (this.checkIfTypeAlreadyExist(type)) {
        this.SelectLotto[this.checkIfArrayIndexWithKey()].select_number.push({ num: number, payRate: price.gamePayRate[type].level0.prize, price: 1, isWaiting: true, isWin: false })
      } else {
        this.SelectLotto.push({ key: type, select_number: [{ num: number, payRate: price.gamePayRate[type].level0.prize, price: 1, isWaiting: true, isWin: false }] })
      }
      setTimeout(this.handleClearInput, 100)
    },
    setSelectedBetType (value) {
      setTimeout(this.handleClearInput, 100)
      this.selectedAddOn = ''
      this.selectType = value
    },
    setselectedAddOn (value) {
      if (this.checkNumberType(value)) {
        if (this.selectedAddOn === '') {
          this.selectedAddOn = value
        } else {
          this.selectedAddOn = ''
        }
      } else {
        NotifyError('ประเภทของเลขไม่ถูกต้อง')
      }
    },
    setGamePayRate (type) {
      const rate = this.$store.getters['SelectedGameRoom/getSelectedGame']
      return rate.gamePayRate[type].level0.prize
    },
    setBetTypePrice (index, price) {
      this.SelectLotto[index].select_number.forEach((item) => {
        item.price = price
      })
    },
    isNumber: function (evt) {
      evt = evt || window.event
      const charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    deleteAllSelected () {
      this.SelectLotto = []
    },
    checkIfTypeAlreadyExist (type) {
      return this.SelectLotto.some(item => item.key === type)
    },
    checkIfArrayIndexWithKey () {
      return this.SelectLotto.findIndex(item => item.key === this.selectType)
    },
    checkNumberType (value) {
      if (value === 'three_reverse') {
        return this.selectType === 'three_up' || this.selectType === 'three_up_tod'
      } else if (value === 'two_reverse') {
        return this.selectType === 'two_up' || this.selectType === 'two_down'
      }
    },
    checkForCloseNumber () {
      let dupicate = false
      const LottoInfo = this.$store.getters['SelectedGameRoom/getSelectedGame']
      const CloseNumber = LottoInfo.gameCloseNumber
      if (CloseNumber) {
        for (let i = 0; i < betType.length; i++) {
          for (let x = 0; x < this.SelectLotto.length; x++) {
            if (this.SelectLotto[x].key === betType[i].key) {
              this.SelectLotto[x].select_number.forEach((Number) => {
                if (CloseNumber.some(item => item.number === Number.num)) {
                  NotifyError(`เลข ${Number.num} เป็นเลขปิด`)
                  dupicate = true
                }
              })
            }
          }
        }
      }

      return dupicate
    },

    checkUserInput () {
      let check = false
      for (let i = 0; i < betType.length; i++) {
        for (let x = 0; x < this.SelectLotto.length; x++) {
          if (this.SelectLotto[x].key === betType[i].key) {
            this.SelectLotto[x].select_number.forEach((Number) => {
              if (!Number.price || Number.price === 0) {
                check = true
                NotifyError(`เลข ${Number.num} เป็นยังไม่ได้ใส่ราคา`)
              }
              // if (CloseNumber.some(item => item.number === Number.num)) {
              //   NotifyError(`เลข ${Number.num} เป็นเลขปิด`)
              //   check = true
              // }
            })
          }
        }
      }
      return check
    },
    checkUserAmout () {
      let vali = false
      const amout = this.$store.getters['userEntity/user_Credit']
      if (amout - this.total_bet < 0) {
        NotifyError(this.$t('not_enough_credit'))
        vali = true
      }
      return vali
    },
    checkForMaxNumber () {
      let dupicate = false
      const LottoInfo = this.$store.getters['SelectedGameRoom/getSelectedGame']
      const LottoMax = LottoInfo.gamePriceMax
      if (LottoMax) {
        for (let i = 0; i < betType.length; i++) {
          for (let x = 0; x < this.SelectLotto.length; x++) {
            if (this.SelectLotto[x].key === betType[i].key) {
              this.SelectLotto[x].select_number.forEach((Number) => {
                LottoMax.forEach((maxNum) => {
                  if (Number.num === maxNum.number) {
                    if (Number.price > maxNum.max_price) {
                      dupicate = true
                      NotifyError(`เลข ${Number.num} เป็นเลขอั้นไม่เกิด ${maxNum.max_price}`)
                    }
                  }
                })
              })
            }
          }
        }
      }

      return dupicate
    },
    async updateUserCredit () {
      const userCredit = this.$store.getters['userEntity/user_Credit']
      const sum = userCredit - this.total_bet
      const userID = this.$store.getters['userEntity/userID']
      await updateUserCredit(sum, userID)
    },
    async createOrder () {
      const gameInfo = this.$store.getters['SelectedGameRoom/getSelectedGame']
      const userID = this.$store.getters['userEntity/userID']
      const agentID = this.$store.getters['userEntity/userAgent']
      const lotto = this.prepareData()
      await createLottoOrder(
        gameInfo.gameUnique_key,
        lotto,
        userID,
        agentID,
        gameInfo.gameKey,
        gameInfo.gameName,
        this.total_bet,
        gameInfo.gameCloseDateTime
      )
    },
    confirmDialog () {
      this.$q.dialog({
        title: 'โปรดตรวจสอบความถุกต้องอีกครั้ง',
        message: 'เมื่อทำรายการเเล้วจะไม่สามารถแเก้ไขได้',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        // console.log('>>>> OK')
        Loading.show({
          delay: 100
        })
        await this.updatePriceRateinDB()
        await this.updateUserCredit()
        await this.createOrder()
        await this.$store.dispatch('userEntity/fetchUser')
        await this.$router.push('/ticket_summary')
        Loading.hide()
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    prepareData () {
      const obj = {}
      console.log(this.SelectLotto)
      for (let x = 0; x < this.SelectLotto.length; x++) {
        for (let y = 0; y < betType.length; y++) {
          if (this.SelectLotto[x].key === betType[y].key) {
            console.log('dsd')
            obj[betType[y].key] = {}
            obj[betType[y].key].name = betType[y].key
            obj[betType[y].key].displayname = covertBetTypeENGtoTH(betType[y].key)
            obj[betType[y].key].nums = this.SelectLotto[x].select_number
          }
        }
      }
      return obj
    },
    deleteSelectNumber (y, x) {
      this.SelectLotto[y].select_number.splice(x, 1)
      if (this.SelectLotto[y].select_number.length <= 0) {
        this.SelectLotto.splice(y, 1)
      }
    },
    permutations (string) {
      if (!string || typeof string !== 'string') {
        return 'Please enter a string'
      } else if (string.length < 2) {
        return string
      }
      const permutationsArray = []

      for (let i = 0; i < string.length; i++) {
        const char = string[i]

        const remainingChars =
          string.slice(0, i) + string.slice(i + 1, string.length)

        for (const permutation of this.permutations(remainingChars)) {
          permutationsArray.push(char + permutation)
        }
      }
      return permutationsArray
    },
    async setupss () {
      await this.$store.dispatch('NumberMemo/getUserNumberMemo')
      await this.$store.dispatch('PlayHistory/getTicket_summary')
      await this.$store.dispatch('PlayHistory/prepareInfoForPlayGame')
      this.number_memo_row = this.$store.getters['NumberMemo/userNumber_memo']
      this.playhistory_row = this.$store.getters['PlayHistory/getInfoForPlayGame']
    },
    async checkForPriceRate () {
      let dup = false
      const info = this.$store.getters['SelectedGameRoom/getSelectedGame']
      const agentID = this.$store.getters['userEntity/userAgent']
      const ratePrize = info.gamePayRate
      let levelRate = await queryDocument(info.gameNumberPriceCollection, info.gameUnique_key)
      if (!levelRate) {
        await createDummy(info.gameNumberPriceCollection, info.gameUnique_key)
        levelRate = await queryDocument(info.gameNumberPriceCollection, info.gameUnique_key)
      }
      for (let i = 0; i < betType.length; i++) {
        for (let x = 0; x < this.SelectLotto.length; x++) {
          if (this.SelectLotto[x].key === betType[i].key) {
            for (let y = 0; y < this.SelectLotto[x].select_number.length; y++) {
              //! code รกสุดๆตรงนี้ เป็นการเช็ค rate
              if (levelRate[agentID]) {
                // ? ถ้า levelRate ของ agent ยังไม่ถูกสร้างมันก็จะ check ของตัวอันเองและก็จะเหมือนกันกับอันอื่นๆ
                if (levelRate[agentID][betType[i].key]) {
                  if (levelRate[agentID][betType[i].key]['rateNumber_'.concat(this.SelectLotto[x].select_number[y].num)]) {
                    const rateFromDB = levelRate[agentID][betType[i].key]['rateNumber_'.concat(this.SelectLotto[x].select_number[y].num)]
                    const sum = rateFromDB + this.SelectLotto[x].select_number[y].price
                    if (inRange(sum, ratePrize[betType[i].key].level0.min, ratePrize[betType[i].key].level0.max)) {
                      const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                      this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level0.prize
                      if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                        dup = true
                        NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง`)
                      }
                    } else if (inRange(sum, ratePrize[betType[i].key].level1.min, ratePrize[betType[i].key].level1.max)) {
                      const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                      this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level1.prize
                      if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                        dup = true
                        NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                      }
                    } else if (inRange(sum, ratePrize[betType[i].key].level2.min, ratePrize[betType[i].key].level2.max)) {
                      const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                      this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level2.prize
                      if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                        dup = true
                        NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                      }
                    } else if (inRange(sum, ratePrize[betType[i].key].level3.min, ratePrize[betType[i].key].level3.max)) {
                      const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                      this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level3.prize
                      if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                        dup = true
                        NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                      }
                    } else if (inRange(sum, ratePrize[betType[i].key].level4.min, ratePrize[betType[i].key].level4.max)) {
                      const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                      this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level4.prize
                      if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                        dup = true
                        NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                      }
                    } else if (inRange(sum, ratePrize[betType[i].key].level5.min, ratePrize[betType[i].key].level5.max)) {
                      const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                      this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level5.prize
                      if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                        dup = true
                        NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                      }
                    } else if (inRange(sum, ratePrize[betType[i].key].level6.min, ratePrize[betType[i].key].level6.max)) {
                      const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                      this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level6.prize
                      if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                        dup = true
                        NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                      }
                    } else {
                      const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                      this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level6.prize
                      if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                        dup = true
                        NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                      }
                    }
                  } else {
                    const sum = this.SelectLotto[x].select_number[y].price
                    if (inRange(sum, ratePrize[betType[i].key].level0.min, ratePrize[betType[i].key].level0.max)) {
                      const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                      this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level0.prize
                      if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                        dup = true
                        NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง`)
                      }
                    } else if (inRange(sum, ratePrize[betType[i].key].level1.min, ratePrize[betType[i].key].level1.max)) {
                      const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                      this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level1.prize
                      if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                        dup = true
                        NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                      }
                    } else if (inRange(sum, ratePrize[betType[i].key].level2.min, ratePrize[betType[i].key].level2.max)) {
                      const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                      this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level2.prize
                      if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                        dup = true
                        NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                      }
                    } else if (inRange(sum, ratePrize[betType[i].key].level3.min, ratePrize[betType[i].key].level3.max)) {
                      const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                      this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level3.prize
                      if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                        dup = true
                        NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                      }
                    } else if (inRange(sum, ratePrize[betType[i].key].level4.min, ratePrize[betType[i].key].level4.max)) {
                      const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                      this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level4.prize
                      if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                        dup = true
                        NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                      }
                    } else if (inRange(sum, ratePrize[betType[i].key].level5.min, ratePrize[betType[i].key].level5.max)) {
                      const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                      this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level5.prize
                      if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                        dup = true
                        NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                      }
                    } else if (inRange(sum, ratePrize[betType[i].key].level6.min, ratePrize[betType[i].key].level6.max)) {
                      const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                      this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level6.prize
                      if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                        dup = true
                        NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                      }
                    } else {
                      const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                      this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level6.prize
                      if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                        dup = true
                        NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                      }
                    }
                  }
                } else {
                  const sum = this.SelectLotto[x].select_number[y].price
                  if (inRange(sum, ratePrize[betType[i].key].level0.min, ratePrize[betType[i].key].level0.max)) {
                    const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                    this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level0.prize
                    if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                      dup = true
                      NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง`)
                    }
                  } else if (inRange(sum, ratePrize[betType[i].key].level1.min, ratePrize[betType[i].key].level1.max)) {
                    const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                    this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level1.prize
                    if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                      dup = true
                      NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                    }
                  } else if (inRange(sum, ratePrize[betType[i].key].level2.min, ratePrize[betType[i].key].level2.max)) {
                    const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                    this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level2.prize
                    if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                      dup = true
                      NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                    }
                  } else if (inRange(sum, ratePrize[betType[i].key].level3.min, ratePrize[betType[i].key].level3.max)) {
                    const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                    this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level3.prize
                    if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                      dup = true
                      NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                    }
                  } else if (inRange(sum, ratePrize[betType[i].key].level4.min, ratePrize[betType[i].key].level4.max)) {
                    const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                    this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level4.prize
                    if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                      dup = true
                      NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                    }
                  } else if (inRange(sum, ratePrize[betType[i].key].level5.min, ratePrize[betType[i].key].level5.max)) {
                    const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                    this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level5.prize
                    if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                      dup = true
                      NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                    }
                  } else if (inRange(sum, ratePrize[betType[i].key].level6.min, ratePrize[betType[i].key].level6.max)) {
                    const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                    this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level6.prize
                    if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                      dup = true
                      NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                    }
                  } else {
                    const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                    this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level6.prize
                    if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                      dup = true
                      NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                    }
                  }
                }
              } else {
                const sum = this.SelectLotto[x].select_number[y].price
                if (inRange(sum, ratePrize[betType[i].key].level0.min, ratePrize[betType[i].key].level0.max)) {
                  const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                  this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level0.prize
                  if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                    dup = true
                    NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง`)
                  }
                } else if (inRange(sum, ratePrize[betType[i].key].level1.min, ratePrize[betType[i].key].level1.max)) {
                  const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                  this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level1.prize
                  if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                    dup = true
                    NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                  }
                } else if (inRange(sum, ratePrize[betType[i].key].level2.min, ratePrize[betType[i].key].level2.max)) {
                  const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                  this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level2.prize
                  if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                    dup = true
                    NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                  }
                } else if (inRange(sum, ratePrize[betType[i].key].level3.min, ratePrize[betType[i].key].level3.max)) {
                  const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                  this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level3.prize
                  if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                    dup = true
                    NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                  }
                } else if (inRange(sum, ratePrize[betType[i].key].level4.min, ratePrize[betType[i].key].level4.max)) {
                  const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                  this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level4.prize
                  if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                    dup = true
                    NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                  }
                } else if (inRange(sum, ratePrize[betType[i].key].level5.min, ratePrize[betType[i].key].level5.max)) {
                  const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                  this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level5.prize
                  if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                    dup = true
                    NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                  }
                } else if (inRange(sum, ratePrize[betType[i].key].level6.min, ratePrize[betType[i].key].level6.max)) {
                  const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                  this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level6.prize
                  if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                    dup = true
                    NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                  }
                } else {
                  const oldpayRate = this.SelectLotto[x].select_number[y].payRate
                  this.SelectLotto[x].select_number[y].payRate = ratePrize[betType[i].key].level6.prize
                  if (oldpayRate !== this.SelectLotto[x].select_number[y].payRate) {
                    dup = true
                    NotifyWarning(`อัตตราการจ่ายของเลข ${this.SelectLotto[x].select_number[y].num} มีการเปลี่ยนแปลง โปรดยืนยันอีกครั้ง`)
                  }
                }
              }
            }
          } else {
            // ? no key do notthing
          }
        }
      }
      return dup
    },
    async updatePriceRateinDB () {
      const info = this.$store.getters['SelectedGameRoom/getSelectedGame']
      const agentID = this.$store.getters['userEntity/userAgent']
      const ratePrize = info.gamePayRate
      let levelRate = await queryDocument(info.gameNumberPriceCollection, info.gameUnique_key)
      if (!levelRate) {
        await createDummy(info.gameNumberPriceCollection, info.gameUnique_key)
        levelRate = await queryDocument(info.gameNumberPriceCollection, info.gameUnique_key)
      }
      for (let i = 0; i < betType.length; i++) {
        for (let x = 0; x < this.SelectLotto.length; x++) {
          if (this.SelectLotto[x].key === betType[i].key) {
            for (let y = 0; y < this.SelectLotto[x].select_number.length; y++) {
              //! code รกสุดๆตรงนี้ เป็นการเช็ค rate
              if (levelRate[agentID]) {
                // ? ถ้า levelRate ของ agent ยังไม่ถูกสร้างมันก็จะ check ของตัวอันเองและก็จะเหมือนกันกับอันอื่นๆ
                if (levelRate[agentID][betType[i].key]) {
                  //!
                  if (levelRate[agentID][betType[i].key]['rateNumber_'.concat(this.SelectLotto[x].select_number[y].num)]) {
                    //!
                    const rateFromDB = levelRate[agentID][betType[i].key]['rateNumber_'.concat(this.SelectLotto[x].select_number[y].num)]
                    const sum = rateFromDB + this.SelectLotto[x].select_number[y].price
                    if (inRange(sum, ratePrize[betType[i].key].level0.min, ratePrize[betType[i].key].level0.max)) {
                      await updateNumberPrice(info.gameUnique_key, info.gameNumberPriceCollection,
                        betType[i].key,
                        'rateNumber_'.concat(this.SelectLotto[x].select_number[y].num),
                        sum,
                        agentID)
                    } else if (inRange(sum, ratePrize[betType[i].key].level1.min, ratePrize[betType[i].key].level1.max)) {
                      await updateNumberPrice(info.gameUnique_key, info.gameNumberPriceCollection,
                        betType[i].key,
                        'rateNumber_'.concat(this.SelectLotto[x].select_number[y].num),
                        sum,
                        agentID)
                    } else if (inRange(sum, ratePrize[betType[i].key].level2.min, ratePrize[betType[i].key].level2.max)) {
                      await updateNumberPrice(info.gameUnique_key, info.gameNumberPriceCollection,
                        betType[i].key,
                        'rateNumber_'.concat(this.SelectLotto[x].select_number[y].num),
                        sum,
                        agentID)
                    } else if (inRange(sum, ratePrize[betType[i].key].level3.min, ratePrize[betType[i].key].level3.max)) {
                      await updateNumberPrice(info.gameUnique_key, info.gameNumberPriceCollection,
                        betType[i].key,
                        'rateNumber_'.concat(this.SelectLotto[x].select_number[y].num),
                        sum,
                        agentID)
                    } else if (inRange(sum, ratePrize[betType[i].key].level4.min, ratePrize[betType[i].key].level4.max)) {
                      await updateNumberPrice(info.gameUnique_key, info.gameNumberPriceCollection,
                        betType[i].key,
                        'rateNumber_'.concat(this.SelectLotto[x].select_number[y].num),
                        sum,
                        agentID)
                    } else if (inRange(sum, ratePrize[betType[i].key].level5.min, ratePrize[betType[i].key].level5.max)) {
                      await updateNumberPrice(info.gameUnique_key, info.gameNumberPriceCollection,
                        betType[i].key,
                        'rateNumber_'.concat(this.SelectLotto[x].select_number[y].num),
                        sum,
                        agentID)
                    } else if (inRange(sum, ratePrize[betType[i].key].level6.min, ratePrize[betType[i].key].level6.max)) {
                      await updateNumberPrice(info.gameUnique_key, info.gameNumberPriceCollection,
                        betType[i].key,
                        'rateNumber_'.concat(this.SelectLotto[x].select_number[y].num),
                        sum,
                        agentID)
                    } else {
                      await updateNumberPrice(info.gameUnique_key, info.gameNumberPriceCollection,
                        betType[i].key,
                        'rateNumber_'.concat(this.SelectLotto[x].select_number[y].num),
                        sum,
                        agentID)
                    }
                  } else {
                    await createNumberPrice(info.gameUnique_key, info.gameNumberPriceCollection,
                      betType[i].key,
                      'rateNumber_'.concat(this.SelectLotto[x].select_number[y].num),
                      this.SelectLotto[x].select_number[y].price,
                      agentID)
                  }
                } else {
                  await createNumberPrice(info.gameUnique_key, info.gameNumberPriceCollection,
                    betType[i].key,
                    'rateNumber_'.concat(this.SelectLotto[x].select_number[y].num),
                    this.SelectLotto[x].select_number[y].price,
                    agentID)
                }
              } else {
                await createNumberPrice(info.gameUnique_key, info.gameNumberPriceCollection,
                  betType[i].key,
                  'rateNumber_'.concat(this.SelectLotto[x].select_number[y].num),
                  this.SelectLotto[x].select_number[y].price,
                  agentID)
              }
            }
          } else {
            // ? no key do notthing
          }
        }
      }
    }
  },
  async created () {
    await this.setupss()
  },
  setup () {
    return {
      columns,
      columns2
    }
  }
}

</script>

<style>

.otp-input {
  width: 70px;
  height: 70px;
  padding: 5px;
  margin: 0 10px;
  font-size: 35px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
.my-card {
  width: 100%;
  max-width: 350px;
}
</style>
