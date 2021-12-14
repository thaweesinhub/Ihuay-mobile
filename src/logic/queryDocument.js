import { collection, doc, getDoc, where, query, getDocs } from 'firebase/firestore'
import moment from 'moment'
import { db } from '../boot/firebase'
const IndexLottoCollection = collection(db, 'testIndexlotto')
const NormalLottoCollection = collection(db, 'testLotto')
const ThaiStockLottoCollection = collection(db, 'testLotto')
const JubyeekeeCollection = collection(db, 'JukyeekeeGameRoom')
// const Number_memoCollection = collection(db, 'setNumber')

export function documentDate () {
  const format = 'hh:mm:ss'
  let date
  const time2 = moment().locale('th'),
    beforeTime = moment('04:00:00', format).locale('th')

  if (time2.locale('th').isBefore(beforeTime)) {
    date = 'DATE_'.concat(
      moment().subtract(1, 'day').locale('th').format('DD-MM-YYYY')
    )
    return date
  } else {
    date = 'DATE_'.concat(moment().locale('th').format('DD-MM-YYYY'))
    return date
  }
}

// eslint-disable-next-line camelcase
export function Lotto_create_on_First_and_Sixteen_Date () {
  if (moment().locale('th').date() <= 16) {
    return 'DATE_'.concat(
      moment()
        .add(1, 'month')
        .date(1)
        .subtract(7, 'day')
        .locale('th')
        .format('DD-MM-YYYY')
    )
  } else {
    return 'DATE_'.concat(
      moment().date(16).subtract(7, 'day').locale('th').format('DD-MM-YYYY')
    )
  }
}
// eslint-disable-next-line camelcase
export function Lotto_create_on_Frist () {
  const date = 'DATE_'.concat(
    moment()
      .add(1, 'month')
      .date(1)
      .subtract(7, 'day')
      .locale('th')
      .format('DD-MM-YYYY')
  )
  return date
}

export async function getIndexLotto (queryDate) {
  let document
  await getDoc(doc(IndexLottoCollection, queryDate)).then((docSnap) => {
    if (docSnap.exists()) {
      document = docSnap.data()
    }
  }).catch((error) => { console.log(error) })
  return document
}

export async function getThaiStockLotto (queryDate) {
  let document
  await getDoc(doc(ThaiStockLottoCollection, queryDate)).then((docSnap) => {
    if (docSnap.exists()) {
      document = docSnap.data()
    }
  }).catch((error) => { console.log(error) })
  return document
}

export async function getJubyeekee (queryDate) {
  let document
  await getDoc(doc(JubyeekeeCollection, queryDate)).then((docSnap) => {
    if (docSnap.exists()) {
      document = docSnap.data()
    }
  }).catch((error) => { console.log(error) })
  return document
}

export async function getNormalLotto (queryDate) {
  let document
  await getDoc(doc(NormalLottoCollection, queryDate)).then((docSnap) => {
    if (docSnap.exists()) {
      document = docSnap.data()
    }
  }).catch((error) => { console.log(error) })
  return document
}

export async function getNumberMemo (player) {
  const data = []
  const q = query(collection(db, 'setNumber'), where('player', '==', player))
  await getDocs(q).catch(err => console.log(err)).then((docSnap) => {
    if (!docSnap.empty) {
      docSnap.forEach((doc) => {
        const obj = doc.data()
        obj.docID = doc.id
        data.push(obj)
      })
    }
  })
  return data
}
