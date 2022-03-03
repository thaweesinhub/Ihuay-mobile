<template>
  <q-page class="q-pa-md">
    <div class="q-ma-lg">
      <q-btn class="float-left" round icon="arrow_back" v-on:click="$router.go(-1)"/>
      <span class="text-h4 flex-center flex">{{ gameInfo.gameName }}</span>
      <div class="text-h6 flex flex-center ">
        <q-icon name="timer"/>
        <div class="q-ml-sm" v-if="gameInfo.gameTimeLeft > 0 ">
          <vue-countdown :time="gameInfo.gameTimeLeft" :interval="1000" v-slot="{ totalHours, minutes, seconds }"
                         @end="$router.go(-1)">
                  <span class="text-h6">
                   {{ totalHours }} ชั่วโมง  {{ minutes }} นาที {{ seconds }} วินาที
                  </span>
          </vue-countdown>
        </div>
        <div v-else>
          <span class="text-h6">ปิดรับแทง</span>
        </div>
      </div>
      <div class="text-right q-mt-md" v-if="gameInfo.gameType === 'jubyeekee'">
        <q-btn label="ยิงเลข" v-on:click="shootNumberDialog = true"/>
        <q-dialog v-model="shootNumberDialog">
          <q-card class=" " style="width: 100%; ">
            <div class="flex-center flex q-mb-md q-pa-lg">
              <span class="text-h6">ยิงเลขจับยี้กี้รอบที่ ...</span>
            </div>
            <div class="flex flex-center">
              <v-otp-input
                ref="jubyeekeeOtpInput"
                input-classes="otp-input-jubyeekee"
                separator="-"
                :num-inputs="5"
                :should-auto-focus="false"
                :is-input-num="true"
                input-type="tel"
                @on-change="handleJubyeekeeOnChange"
                @on-complete="handleJubyeekeeComplete"
              />
            </div>
            <div class="flex flex-center q-mt-md">
              <q-btn label="เพิ่มเลข" class="q-mr-md" @click="sentJubyeekeeNumber()"/>
              <q-btn label="ล้างค่า" @click="handleClearJubyeekee()"/>
            </div>
            <div class="q-mt-lg ">
              <div class="flex-center flex q-pa-md">
                <span>ผลรวมยอดแทงทั้งหมด</span>
              </div>
              <div class="flex-center flex ">
                <span class="text-h6">{{ yeekeeLists.length }}</span>
              </div>
              <div class="flex-center flex q-pa-md">
                <span>รายชื่อผู้ที่เเทง</span>
              </div>
              <div class="row q-ma-xs" v-for="(item, n) in yeekeeLists " :key="n">
                <div class="col-3 bg-negative"
                     style="border-width: 1px;border-style: solid;border-color: #dddddd; border-radius: 5px">
                  <div class="">
                    <span class="flex flex-center text-subtitle1">ลำดับที่ {{ n + 1 }}</span>
                    <span class="flex flex-center text-subtitle1">{{ item.yeekeeNumber }}</span>
                  </div>
                </div>
                <div class="col bg-positive"
                     style="border-width: 1px;border-style: solid;border-color: #dddddd; border-radius: 5px">
                  <div class="">
                    <div class="q-ml-sm q-mt-xs">
                      <q-icon name="account_circle"/>
                      <span class="q-mr-sm text-subtitle1">ผู้ส่งเลข : </span> <span
                      class="text-subtitle1">{{ item.displayUsername }}</span></div>
                    <q-separator class="q-my-xs"/>
                    <div class="q-ml-sm q-mb-xs">
                      <q-icon name="calendar_today"/>
                      <span class="q-mr-sm text-subtitle1"> ส่งเมื่อ : </span> <span
                      class="text-subtitle1">{{ item.submittedTime }}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </q-card>
        </q-dialog>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md q-mb-md">
        <div class="row cursor-pointer q-mb-md">
          <q-btn class="col bg-red " label="กดเลขเอง" @click="handleInputNumberView('manual')" :disable="inputView === 'manual'"/>
          <q-btn class="col bg-green " label="เลือกจากแผง" @click="handleInputNumberView('board')" :disable="inputView === 'board'"/>
        </div>
        <div  v-if="inputView === 'manual'">
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
            <div class="flex-center flex ">
              <span class="text-h6">รายการที่เลือก</span>
            </div>
            <q-separator/>
            <div class="flex flex-center q-mt-sm ">
              <p class="bg-secondary q-pa-sm q-mx-md rounded-borders">{{ $t(`${selectType}`) }}</p>
              <p class="bg-secondary q-pa-sm q-mx-md rounded-borders" v-if="selectedAddOn">{{ $t(selectedAddOn) }}</p>
            </div>
            <q-separator/>
            <div class="flex flex-center q-ma-md ">
              <div class="flex flex-center">
                <v-otp-input
                  ref="otpInput"
                  input-classes="otp-input"
                  separator="-"
                  :num-inputs="number_input"
                  :should-auto-focus="false"
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
              <q-dialog v-model="dialog">
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
                                  <q-item-label caption><span class="text-subtitle1">{{ col.value }}</span></q-item-label>
                                </div>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-card>
                      </div>
                    </template>
                  </q-table>
                  <q-btn class="flex-center flex q-mt-lg" color="primary" label="select" v-close-popup
                         @click="handleAddMemo" :disable="selected.length === 0"/>
                </q-card>
              </q-dialog>
              <q-btn color="primary" label="ดึงจากโพยเก่า" size="md" @click="historyDialog = true"/>
              <q-dialog v-model="historyDialog">
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
                                  <q-item-label caption><span class="text-subtitle1">{{ col.value }}</span></q-item-label>
                                </div>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-card>
                      </div>
                    </template>
                  </q-table>
                  <q-btn class="flex-center flex q-mt-lg" color="primary" label="select" v-close-popup
                         @click="handleAddMemo" :disable="selected.length === 0"/>
                </q-card>
              </q-dialog>
            </div>
          </div>
        </div>
        <div v-if="inputView === 'board'" >
          <div class="row justify-center  cursor-pointer ">
            <q-btn class="col-4 bg-primary " label="สามตัว" @click="setBoardDecimalInput('three')" :disable="decimalInput === 'three'"/>
            <q-btn class="col-4 bg-secondary " label="สองตัว" @click="setBoardDecimalInput('two')" :disable="decimalInput === 'two'"/>
            <q-btn class="col-4 bg-accent " label="เลขวิ่ง" @click="setBoardDecimalInput('one')" :disable="decimalInput === 'one'"/>
          </div>

          <div v-if="decimalInput === 'three'">
            <div class="q-mt-sm q-pa-sm">
              <div class="row justify-evenly">
                <q-btn class="col-4 bg-blue-4" :label="`3ตัวบน ${setGamePayRate('three_up')}`" @click="setSelectedBetType('three_up')" :disable="selectType === 'three_up'" />
                <q-btn class="col-4 bg-blue-5" :label="`3ตัวโต๊ต ${setGamePayRate('three_up_tod')}`" @click="setSelectedBetType('three_up_tod')"  :disable="selectType === 'three_up_tod'"/>
                <q-btn v-bind:class="{'col-4 bg-grey': selectedAddOn !== 'three_reverse', 'col-4 bg-negative' : selectedAddOn === 'three_reverse'}" :label="`กลับเลข`" @click="setselectedAddOn('three_reverse')" >
                  <q-icon name="swap_horiz" size="sm"/>
                </q-btn>
              </div>
            </div>
            <div class="row flex-center flex "  >
              <div class="q-gutter-sm q-pa-sm ">
                <q-btn color="primary" size="md" :label="`${n-1}00`" v-for="n in 10" :key="`sm-${n}`"
                       @click="createArr((n-1)) "/>
              </div>
            </div>
          </div>
          <div v-if="decimalInput === 'two'">
            <div class="q-mt-sm q-pa-sm">
              <div class="row justify-evenly">
                <q-btn class="col-4 bg-orange-5" :label="`2 ตัวบน ${setGamePayRate('two_up')}`" @click="setSelectedBetType('two_up')" :disable="selectType === 'two_up'" />
                <q-btn class="col-4 bg-orange-6" :label="`2 ตัวล่าง ${setGamePayRate('two_down')}`" @click="setSelectedBetType('two_down')"  :disable="selectType === 'two_down'"/>
                <q-btn v-bind:class="{'col-4 bg-grey': selectedAddOn !== 'two_reverse', 'col-4 bg-negative' : selectedAddOn === 'two_reverse'}" :label="`กลับเลข`" @click="setselectedAddOn('two_reverse')" >
                  <q-icon name="swap_horiz" size="sm"/>
                </q-btn>
              </div>
            </div>

            <div class="q-pa-sm" v-if="selectType === 'two_up' || selectType === 'two_down'" >
              <div class="row">
                <div class="col-12 col-md q-ma-xs">
                  <span>19 ประตู</span>
                  <div class="row">
                    <q-btn class="col" color="amber-7" v-for="n in 10" :label="(n-1)" :key="n"  @click="handleLoopForTwoType((n-1),'both')"/>
                  </div>
                </div>
                <div class="col-12 col-md q-ma-xs">
                  <span> รูดหน้า</span>
                  <div class="row">
                    <q-btn class="col" color="yellow-9" v-for="n in 10" :label="(n-1)" :key="n" @click="handleLoopForTwoType((n-1),'front')"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-md q-ma-xs">
                  <span> รูดหลัง</span>
                  <div class="row">
                    <q-btn class="col" color="orange-9" v-for="n in 10" :label="(n-1)" :key="n" @click="handleLoopForTwoType((n-1),'back')" />
                  </div>
                </div>
                <div class="col-12 col-md q-ma-xs"/>
              </div>
            </div>

          </div>
          <div v-if="decimalInput === 'one'">
            <div class="q-mt-sm q-pa-sm">
              <div class="row justify-evenly">
                <q-btn class="col-4 bg-orange-5" :label="`วิ่งบน${setGamePayRate('run_up')}`" @click="setSelectedBetType('run_up')" :disable="selectType === 'run_up'" />
                <q-btn class="col-4 bg-orange-6" :label="`วิ่งล่าง${setGamePayRate('run_down')}`" @click="setSelectedBetType('run_down')"  :disable="selectType === 'run_down'"/>
              </div>
            </div>
          </div>

          <div  v-if="(decimalInput === 'two' && (selectType === 'two_up' || selectType === 'two_down') ||
          (decimalInput === 'three' && (selectType === 'three_up' || selectType === 'three_up_tod' || selectType === 'three_front' || selectType === 'three_back' )) ||
          (decimalInput === 'one' && (selectType === 'run_up' || selectType === 'run_down'))
          )">
            <div class="row q-col-gutter-sm q-mt-xs flex-center flex">
              <q-btn v-bind:class="{
                'col-2 q-ma-xs flex-center flex bg-secondary' : !(checkForDuplicateNumber(this.selectType,n) || disableButtonInCloseNumber(this.selectType, n)),
             'col-2 q-ma-xs flex-center flex bg-negative' : (checkForDuplicateNumber(this.selectType,n) || disableButtonInCloseNumber(this.selectType, n))
              }"
                     v-for="n in arr" :key="n"
                     :disable="checkForDuplicateNumber(this.selectType,n) || disableButtonInCloseNumber(this.selectType, n)"
                     @click="handleOnComplete(n)" >{{n}}</q-btn>
            </div>
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
              <span class="text-subtitle1">{{ total_selectNumber }}</span>
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
                <span class="text-subtitle1 q-pl-sm q-mr-sm flex-center">{{ $t(item.key) }}</span>
                <q-btn color="info" :label="item" :key="item" v-for="item in priceLoop"
                       v-on:click="setBetTypePrice(y, item)"/>
              </div>
              <transition-group
                enter-active-class="animate__animated animate__fadeInUp"
                leave-active-class="animate__animated animate__fadeOutDownBig ">
                <div class="row q-my-sm text-h6" style="border-color: gray; border-style: solid; border-width: 0.1px"
                     v-for="(selectNum, x) in item.select_number" :key="x">
                  <div class="col flex flex-center ">
                    {{ x + 1 }}
                  </div>
                  <div class="col flex flex-center">
                    {{ selectNum.num }}
                  </div>
                  <div class="col flex flex-center">
                    <q-input class="flex-center flex text-h6" v-model.number="selectNum.price" type="tel"
                             @keypress="isNumber($event)"/>
                  </div>
                  <div class="col flex flex-center">
                    {{ selectNum.payRate }}
                  </div>
                  <div class="col flex flex-center">
                    {{ selectNum.price * selectNum.payRate }}
                  </div>
                  <div class="col text-right ">
                    <q-btn color="negative" padding="md sm" icon="delete_forever" v-on:click="deleteSelectNumber(y,x)"/>
                  </div>
                </div>
              </transition-group>
              <q-separator/>
            </div>
          </transition-group>
          <div class="row">
            <div class="col q-pa-xs">
              <div class="column" style="height: 70px">
                <div class="col   bg-secondary flex-center flex">
                  ยอดเครดิตคงเหลือ
                </div>
                <div class="col-8 bg-teal-4 flex flex-center">
                  {{ this.$store.getters['userEntity/user_Credit'] }}
                </div>
              </div>
            </div>
            <div class="col q-pa-xs">
              <div class="column" style="height: 70px">
                <div class="col   bg-secondary flex-center flex">
                  รวมยอดแทง
                </div>
                <div class="col-8 bg-teal-4 flex flex-center">
                  {{ total_bet }}
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col q-pa-xs">
              <div class="column cursor-pointer" style="height: 70px" @click="deleteAllSelected()">
                <div class="col   bg-negative flex-center flex">
                  <q-icon class="q-mr-xs" name="delete_forever" size="lg"/>
                  <span class="text-h6">
                    ล้างรายการ
                  </span>
                </div>
              </div>
            </div>
            <div class="col q-pa-xs">
              <div class="column cursor-pointer" style="height: 70px" @click="handleSentLotto()">
                <div class="col   bg-positive flex-center flex">
                  <q-icon class="q-mr-xs" name="send" size="lg"/>
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
import { onMounted, ref } from 'vue'
import { NotifyError, NotifySuccess, NotifyWarning } from 'src/logic/handler'
import { betType, covertBetTypeENGtoTH, inRange } from 'src/logic/helper'
import { getJubyeekeeSentingNumber, queryDocument } from 'src/logic/queryDocument'
import {
  addCreditTransaction,
  createDummy,
  createLottoOrder,
  createNumberPrice,
  sentingJubyeekee,
  updateNumberPrice,
  updateUserCredit
} from 'src/logic/postDocument'
import moment from 'moment'

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
      jubyeekeeOtpInput: ref(''),
      selectType: 'three_up',
      jubyeekeeShotNumber: 0,
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
      yeekeeLists: [],
      selectedHistory: [],
      selected: [],
      shootNumberDialog: false,
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
      const isnum = /^\d+$/.test(value)
      if (isnum) {
        if (!this.selectedAddOn) {
          this.addNumber(value, this.selectType)
        } else {
          const mutations = this.permutations(value)
          mutations.forEach((item) => {
            this.addNumber(item, this.selectType)
          })
        }
      } else {
        NotifyError('input error')
        setTimeout(this.handleClearInput, 100)
      }
    },
    handleJubyeekeeComplete (value) {
      this.jubyeekeeShotNumber = value
    },
    handleJubyeekeeOnChange (value) {
      this.jubyeekeeShotNumber = value
    },
    handleClearInput () {
      if (this.$refs.otpInput) { this.$refs.otpInput.clearInput() }
    },
    handleClearJubyeekee () {
      this.$refs.jubyeekeeOtpInput.clearInput()
    },
    handleAddMemo () {
      this.selected.forEach((item) => {
        item.selectNumber.forEach((x) => {
          this.addNumber(x.value, x.type)
        })
      })
      this.selected = []
    },
    handleAddPlayHistory () {
    },
    handleLoopForTwoType (number, type) {
      let i = 0
      const len = 10
      switch (type) {
        case 'back' :
          while (i < len) {
            this.handleOnComplete(`${i}${number}`)
            i++
          }
          break
        case 'front' :
          while (i < len) {
            this.handleOnComplete(`${number}${i}`)
            i++
          }
          break
        case 'both' :
          while (i < len) {
            this.handleOnComplete(`${number}${i}`)
            this.handleOnComplete(`${i}${number}`)
            i++
          }
          break
      }
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
      const price = this.$store.getters['SelectedGameRoom/getSelectedGame']
      if (this.checkIfTypeAlreadyExist(type)) {
        if (!this.checkForDuplicateNumber(type, number)) {
          if (!this.disableButtonInCloseNumber(type, number)) {
            this.SelectLotto[this.checkIfArrayIndexWithKey()].select_number.push({
              num: number,
              payRate: price.gamePayRate[type].level0.prize,
              price: 1,
              isWaiting: true,
              isWin: false,
              STATUS: 'waiting'
            })
          } else {
            NotifyWarning(`เลข ${number} ของประเภท ${this.$t(type)}  เป็นเลขปิด`)
          }
        } else NotifyWarning('เลขซ้ำ')
      } else {
        if (!this.disableButtonInCloseNumber(type, number)) {
          this.SelectLotto.push({
            key: type,
            select_number: [{
              num: number,
              payRate: price.gamePayRate[type].level0.prize,
              price: 1,
              isWaiting: true,
              isWin: false,
              STATUS: 'waiting'
            }]
          })
        } else NotifyWarning(`เลข ${number} ของประเภท ${this.$t(type)}  เป็นเลขปิด`)
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

    checkMaxPerNumber () {

    },
    checkIfTypeAlreadyExist (type) {
      return this.SelectLotto.some(item => item.key === type)
    },
    checkForDuplicateNumber (type, number) {
      for (let x = 0; x < this.SelectLotto.length; x++) {
        if (this.SelectLotto[x].key === type) {
          return this.SelectLotto[x].select_number.some(item => item.num === number)
        }
      }
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
    disableButtonInCloseNumber (type, number) {
      const lottoCloseNumber = this.$store.getters['SelectedGameRoom/getSelectedGame'].gameCloseNumber
      if (lottoCloseNumber) {
        const checkUp = (item) => {
          if (item.betType === type) {
            return item.number === number
          }
        }
        return lottoCloseNumber.some(checkUp)
      }
      return false
    },
    checkForCloseNumber () {
      const dupicate = []
      let i = 0
      const len = this.SelectLotto.length
      while (i < len) {
        for (let x = 0; x < this.SelectLotto[i].select_number.length; x++) {
          dupicate.push(this.disableButtonInCloseNumber(this.SelectLotto[i].key, this.SelectLotto[i].select_number[x].num))
        }
        i++
      }
      return dupicate.includes(true)
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
    async updateUserCredit (gameRef) {
      const userCredit = this.$store.getters['userEntity/user_Credit']
      const sum = userCredit - this.total_bet
      const gameName = this.$store.getters['SelectedGameRoom/getSelectedGame'].gameName
      const userID = this.$store.getters['userEntity/userID']
      await Promise.all([
        await addCreditTransaction(
          this.$store.getters['userEntity/username'],
          this.$store.getters['userEntity/username'],
          `แทงพนัน หวย ${gameName} / ${moment().locale('th').format('DD/MM/YYYY HH:mm')}  #${gameRef}`,
          sum,
          (this.total_bet * -1),
          'bet'),
        await updateUserCredit(sum, userID)
      ])
    },
    async createOrder () {
      const gameInfo = this.$store.getters['SelectedGameRoom/getSelectedGame']
      const userID = this.$store.getters['userEntity/userID']
      const agentID = this.$store.getters['userEntity/userAgent']
      const lotto = this.prepareData()
      const ref = await createLottoOrder(
        gameInfo.gameUnique_key,
        lotto,
        userID,
        agentID,
        gameInfo.gameKey,
        gameInfo.gameName,
        this.total_bet,
        gameInfo.gameCloseDateTime
      )
      return ref
    },
    confirmDialog () {
      this.$q.dialog({
        title: 'โปรดตรวจสอบความถุกต้องอีกครั้ง',
        message: 'เมื่อทำรายการเเล้วจะไม่สามารถแเก้ไขได้',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        Loading.show({
          delay: 100
        })
        const gameRef = await this.createOrder()
        if (gameRef) {
          await Promise.all([
            await this.updateUserCredit(gameRef),
            await this.updatePriceRateinDB(),
            await this.$store.dispatch('userEntity/fetchUser'),
            await this.$router.push('/ticket_summary')
          ])
        } else { NotifyError('เกิดข้อผิดพลาดขึ้น') }
        Loading.hide()
      })
    },
    prepareData () {
      const obj = {}
      for (let x = 0; x < this.SelectLotto.length; x++) {
        for (let y = 0; y < betType.length; y++) {
          if (this.SelectLotto[x].key === betType[y].key) {
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
      return [...new Set(permutationsArray)]
    },
    async setupss () {
      await this.$store.dispatch('NumberMemo/getUserNumberMemo')
      await this.$store.dispatch('PlayHistory/getTicket_summary')
      await this.$store.dispatch('PlayHistory/prepareInfoForPlayGame')
      this.number_memo_row = this.$store.getters['NumberMemo/userNumber_memo']
      this.playhistory_row = this.$store.getters['PlayHistory/getInfoForPlayGame']
      const type = this.$store.getters['SelectedGameRoom/getSelectedGame']
      if (type.gameType === 'jubyeekee') {
        await this.getSendingNumber()
      }
    },
    async getSendingNumber () {
      const type = this.$store.getters['SelectedGameRoom/getSelectedGame']
      const yeekee = await getJubyeekeeSentingNumber(type.gameDocID)
      for (let x = 0; x < yeekee[type.gameKey].sendingNumber.length; x++) {
        const obj = {}
        obj.displayUsername = yeekee[type.gameKey].sendingNumber[x].displayUsername
        obj.userName = yeekee[type.gameKey].sendingNumber[x].userName
        obj.submittedTime = yeekee[type.gameKey].sendingNumber[x].submittedTime
        obj.yeekeeNumber = yeekee[type.gameKey].sendingNumber[x].yeekeeNumber
        this.yeekeeLists.push(obj)
      }
    },
    async sentJubyeekeeNumber () {
      // eslint-disable-next-line no-extend-native
      String.prototype.replaceAt = function (index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length)
      }
      if (this.jubyeekeeShotNumber.length === 5) {
        const username = this.$store.getters['userEntity/username']
        const userID = this.$store.getters['userEntity/userID']
        const gameInfo = this.$store.getters['SelectedGameRoom/getSelectedGame']
        const DocID = gameInfo.gameDocID
        const gameKey = gameInfo.gameKey
        const displayUsername = username.replaceAt(2, '***')
        const userName = username
        const submittedTime = moment().locale('th').format('DD/MM/YYYY HH:mm:ss')
        const yeekeeNumber = parseInt(this.jubyeekeeShotNumber)
        await sentingJubyeekee(DocID, gameKey, displayUsername, submittedTime, userName, yeekeeNumber, userID).then(async () => {
          NotifySuccess('ทำรายการสำเร็จ')
          setTimeout(this.handleClearJubyeekee, 100)
          this.yeekeeLists = []
          await this.getSendingNumber()
        })
      } else {
        NotifyWarning('กรอกเลขไม่ครบ')
      }
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
                    if (info.gameLottoLimited[betType[i].key] > 0) {
                      if (sum > info.gameLottoLimited[betType[i].key]) {
                        dup = true
                        NotifyWarning(`เลข ${this.SelectLotto[x].select_number[y].num} ถึงจำนวนที่อั้นแล้ว`)
                      }
                    }
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
                    if (info.gameLottoLimited[betType[i].key] > 0) {
                      if (sum > info.gameLottoLimited[betType[i].key]) {
                        dup = true
                        NotifyWarning(`เลข ${this.SelectLotto[x].select_number[y].num} ถึงจำนวนที่อั้นแล้ว`)
                      }
                    }
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
                  if (info.gameLottoLimited[betType[i].key] > 0) {
                    if (sum > info.gameLottoLimited[betType[i].key]) {
                      dup = true
                      NotifyWarning(`เลข ${this.SelectLotto[x].select_number[y].num} ถึงจำนวนที่อั้นแล้ว`)
                    }
                  }
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
                if (info.gameLottoLimited[betType[i].key] > 0) {
                  if (sum > info.gameLottoLimited[betType[i].key]) {
                    dup = true
                    NotifyWarning(`เลข ${this.SelectLotto[x].select_number[y].num} ถึงจำนวนที่อั้นแล้ว`)
                  }
                }
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
    const arr = ref([])
    const closeNumber = ['342', '001', '002', '003']
    const inputView = ref('board')
    const decimalInput = ref('three')
    const selectedHeaderBoardNumber = ref(0)
    const checkForDisable = (n) => {
      return closeNumber.includes(n)
    }
    const handleAddNumberFromBoard = (number) => {
      closeNumber.push(number)
      createArr(selectedHeaderBoardNumber.value)
    }
    const handleInputNumberView = (type) => {
      inputView.value = type
    }

    const setBoardDecimalInput = (decimal) => {
      decimalInput.value = decimal
      createArr(0)
    }

    const createArr = (number) => {
      selectedHeaderBoardNumber.value = number
      arr.value = []
      let x = 0
      const len = 100
      if (decimalInput.value === 'three') {
        while (x < len) {
          if (x < 10) {
            arr.value.push(`${number}0${x}`)
          } else {
            arr.value.push((`${number}${x}`))
          }
          x++
        }
      } else if (decimalInput.value === 'two') {
        while (x < len) {
          if (x < 10) {
            arr.value.push(`0${x}`)
          } else {
            arr.value.push((`${x}`))
          }
          x++
        }
      } else {
        while (x < len) {
          if (x < 10) {
            arr.value.push(`${x}`)
          }
          x++
        }
      }
    }

    onMounted(() => {
      createArr(0)
    })
    return {
      arr,
      inputView,
      checkForDisable,
      closeNumber,
      handleInputNumberView,
      handleAddNumberFromBoard,
      selectedHeaderBoardNumber,
      setBoardDecimalInput,
      decimalInput,
      createArr,
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

.otp-input-jubyeekee {
  width: 40px;
  height: 40px;
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
