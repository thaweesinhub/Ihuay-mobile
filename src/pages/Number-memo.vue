<template>
  <q-form class="q-pa-lg">
  <Display_numberMemo :key="reload"/>
    <q-separator/>
      <span class="text-h3 flex flex-center" style="margin: 40px" >สร้างเลขชุด</span>
    <div class="flex flex-center">
      <q-input class="flex flex-center" filled standout bottom-slots v-model="numberMemoName" label="ชื่อเลขชุด" counter maxlength="18" :rules="[val => !!val]">
        <template v-slot:after>
          <q-btn style="margin-left: 5%" round dense flat icon="add_circle" v-on:click="addMoreRow()"/>
        </template>
      </q-input>
    </div>
    <q-form
    >
      <transition-group
        enter-active-class="animate__animated animate__fadeInDownBig"
        leave-active-class="animate__animated animate__fadeOutDownBig "
      >
      <div  v-for="(item,x) in input" :key="x">
      <q-input class="q-py-sm" style="margin: 3%"
               standout bottom-slots v-model="item.value"
               @keypress="isNumber($event)"
               label="เลข" counter :maxlength="Maxlength(item.displayText)"
               :rules="[val => val.length === Maxlength(item.displayText) || 'asdasd']"
      >
        <template v-slot:before>
          <q-select class="q-py-lg-lg" v-model="item.displayText" :options="numType" label="ประเภทของเลข" style="width: 150px" />
        </template>
        <template v-slot:after>
          <q-btn style="margin-left: 5%" round dense flat icon="remove_circle" v-on:click="deleteRow(x)"/>
        </template>
      </q-input>
      </div>
      </transition-group>
    </q-form>
    <div class="flex flex-center">
      <q-btn class="lt-md" color="white" text-color="black" label="ยืนยันการสร้าง" v-on:click="sentData" style="margin: 10%" />
      <q-btn class="gt-sm" color="white" text-color="black" label="ยืนยันการสร้าง" v-on:click="sentData" style="margin-top: 2%" />
    </div>
  </q-form>
</template>

<script>
import DisplayNumberMemo from 'components/table/Number-memo/DisplayNumberMemo'
import { NotifyWarning } from 'src/logic/handler'
import { covertBetType } from 'src/logic/helper'

export default {
  name: 'Number-memo',
  components: {
    Display_numberMemo: DisplayNumberMemo
  },
  data () {
    return {
      numberMemoName: null,
      numType: [
        '3 ตัวบน', '3 ตัวโต๊ด', '2 ตัวบน', '2 ตัวล่าง', 'วิ่งบน', 'วิ่งล่าง'
      ],
      input: [
        { value: '', displayText: '3 ตัวบน' },
        { value: '', displayText: '3 ตัวบน' }
      ],
      reload: 1
    }
  },
  methods: {
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
    Maxlength (type) {
      if (type === '3 ตัวบน' || type === '3 ตัวโต๊ด') return 3
      else if (type === '2 ตัวบน' || type === '2 ตัวล่าง') return 2
      else if (type === 'วิ่งบน' || type === 'วิ่งล่าง') return 1
      else return 3
    },
    addMoreRow () {
      this.input.push({ value: '', displayText: '3 ตัวบน' })
    },
    deleteRow (index) {
      if (this.input.length === 1) {
        NotifyWarning('    ไม่สามารถลบได้   ')
      } else {
        this.input.splice(index, 1)
      }
    },
    async sentData () {
      let isVali = true
      const arr = []
      for (let x = 0; x < this.input.length; x++) {
        if (this.input[x].value && this.numberMemoName) {
          arr.push({
            value: this.input[x].value,
            displayText: this.input[x].displayText,
            type: covertBetType(this.input[x].displayText)
          })
        } else {
          isVali = false
        }
      }
      if (isVali) {
        await this.$store.dispatch('NumberMemo/createUserNumberMemo', {
          numberMemoName: this.numberMemoName,
          numberMemoValue: arr
        }).then(() => {
          // this.numberMemoName = ''
          // this.input = [
          //   { value: '', displayText: '3 ตัวบน' },
          //   { value: '', displayText: '3 ตัวบน' }
          // ]
          this.$store.dispatch('NumberMemo/getUserNumberMemo')
          this.reload++
        }
        )
      } else {
        NotifyWarning('โปรดใส่ข้อมูลให้ครบ')
      }
    }
  }

}
</script>

<style scoped>

</style>
