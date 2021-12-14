<template>
  <div class="q-pa-md">

    <q-table
      grid
      card-class="bg-primary text-white"
      title="Treats"
      :rows="number_memo_row"
      :columns="columns"
      row-key="displayname"
      :pagination="pagination"
      selection="multiple"
      v-model:selected="selected"
      :filter="filter"
      hide-header
      hide-bottom
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>
      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
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

    <q-page-sticky v-if="selected.length !== 0" position="right" :offset="[25, 25]" v-on:click="deleteNumberMemo()">
      <q-btn fab icon="delete" color="primary" />
    </q-page-sticky>
  </div>
</template>

<script>
import { ref } from 'vue'
import { deleteDocuments } from 'src/logic/postDocument'

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
  name: 'DisplayNumber-memo',
  setup () {
    return {
      filter: ref(''),
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
  methods: {
    deleteNumberMemo () {
      for (let x = 0; x < this.selected.length; x++) {
        this.number_memo_row = this.number_memo_row.filter(item => item.docID !== this.selected[x].docID)
        deleteDocuments('setNumber', this.selected[x].docID)
      }
      this.selected = []
    }
  }
}
</script>

<style lang="sass">
.grid-style-transition
  transition: transform .28s, background-color .28s

.my-table-details
  font-size: 0.85em
  font-style: italic
  max-width: 200px
  white-space: normal
  color: #555
  margin-top: 4px

</style>
