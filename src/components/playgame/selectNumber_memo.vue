<template>
  <q-dialog >
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
      <q-btn  class="flex-center flex q-mt-lg" color="primary" label="select"  @click="testing" :disable="selected.length === 0"/>
    </q-card>
  </q-dialog>
</template>

<script>
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

export default {
  name: 'selectNumber_memo',
  setup () {
    return {
      columns
    }
  },
  data () {
    return {
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 0,
        rowsPerPage: 0
      },
      selected: [],
      number_memo_row: []
    }
  },
  async created () {
    await this.$store.dispatch('NumberMemo/getUserNumberMemo')
    this.number_memo_row = this.$store.getters['NumberMemo/userNumber_memo']
  },
  computed: {
    isSelected () {
      return this.selected <= 0
    }
  },
  methods: {
    testing () {
      console.log(this.selected)
    }
  }
}
</script>

<style scoped>

</style>
