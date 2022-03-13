import { collection, doc, getDoc, getDocs, query, where, orderBy } from 'firebase/firestore'
import moment from 'moment'
import { db } from '../boot/firebase'
import { numberTypeOptions } from 'src/logic/utility'

const IndexLottoCollection = collection(db, 'testIndexlotto')
const NormalLottoCollection = collection(db, 'testLotto')
const ThaiStockLottoCollection = collection(db, 'testIndexlotto')
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

export function lottoCreateOnFirstAndSixteen () {
  if (moment().locale('th').date() <= 16) {
    return 'DATE_'.concat(moment().locale('th').date(16).subtract(7, 'day').format('DD-MM-YYYY'))
  } else if (moment().locale('th').date() >= 16 &&
    moment().locale('th').date() <= moment().locale('th').add(1, 'month').date(1).subtract(7, 'day').date()) {

    return 'DATE_'.concat(moment().locale('th').add(1, 'month').date(1).subtract(7, 'day').format('DD-MM-YYYY'))
  }
  // if (moment().locale('th').date() <= 16) {
  //   // ? check ว่า ถึงวันที่ 9 ละยัง ถ้าถึงเเล้วก็จะใช้ doc ของวันที่ 9
  //   // ? ถ้ายังไม่ถึงก็จะใช้ของเดือนที่เเล้ว
  //   if (moment().locale('th').date() <= moment().locale('th').date(16).subtract(7, 'day').date()) {
  //     return 'DATE_'.concat(
  //       moment()
  //         .date(1)
  //         .subtract(7, 'day')
  //         .locale('th')
  //         .format('DD-MM-YYYY')
  //     )
  //   } else {
  //     return 'DATE_'.concat(
  //       moment().locale('th').date(16).subtract(7, 'day').format('DD-MM-YYYY')
  //     )
  //   }
  // } else {
  //   // ? IF เลย 16 มาเเล้ว
  //   // ? check ว่าถึงวันที่ doc ของงวดใหม่จะถูกสร้างรึยีง ถ้าสร้างเเล้วก็ไปใช้ของอันใหม่
  //   if (moment().locale('th').date() <= moment().locale('th').add(1, 'month').date(1).subtract(7, 'day').date()) {
  //     // ? ถ้า ยังไม่ถึงวันก็กลับไปใช้อันเก่า
  //     return 'DATE_'.concat(
  //       moment().date(16).subtract(7, 'day').locale('th').format('DD-MM-YYYY')
  //     )
  //   } else {
  //     return 'DATE_'.concat(
  //       moment().add('month').date(1).subtract(7, 'day').locale('th').format('DD-MM-YYYY')
  //     )
  //   }
  // }
}

export function resultLottoCreateOnFirstAndSixteen () {
  if (moment().locale('th').date() <= 16) {
    if (moment().locale('th').date() <= moment().locale('th').date(16).subtract(7, 'day').date()) {
      return 'DATE_'.concat(
        moment()
          .date(1)
          .subtract(7, 'day')
          .locale('th')
          .format('DD-MM-YYYY')
      )
    } else {
      return 'DATE_'.concat(
        moment().locale('th').date(16).subtract(7, 'day').format('DD-MM-YYYY')
      )
    }
  } else {
    if (moment().locale('th').date() <= moment().locale('th').add(1, 'month').date(1).subtract(7, 'day').date()) {
      return 'DATE_'.concat(
        moment().date(16).subtract(7, 'day').locale('th').format('DD-MM-YYYY')
      )
    } else {
      return 'DATE_'.concat(
        moment().add('month').date(1).subtract(7, 'day').locale('th').format('DD-MM-YYYY')
      )
    }
  }
}

export function LottoCreateOnSixteen () {
  return 'DATE_'.concat(
    moment().locale('th').date(16).subtract(7, 'day').format('DD-MM-YYYY')
  )
  // if (moment().locale('th').date() <= 16) {
  //   if (moment().locale('th').date() <= moment().locale('th').date(16).subtract(7, 'day').date()) {
  //     return 'DATE_'.concat(
  //       moment().date(16).subtract(7, 'day').subtract(1, 'month').locale('th').format('DD-MM-YYYY')
  //     )
  //   } else {
  //     return 'DATE_'.concat(
  //       moment().locale('th').date(16).subtract(7, 'day').format('DD-MM-YYYY')
  //     )
  //   }
  // } else {
  //   return 'DATE_'.concat(
  //     moment().locale('th').date(16).subtract(7, 'day').format('DD-MM-YYYY')
  //   )
  // }
}

export async function getIndexLotto (queryDate) {
  let document
  await getDoc(doc(IndexLottoCollection, queryDate)).then((docSnap) => {
    if (docSnap.exists()) {
      document = docSnap.data()
    }
  }).catch((error) => {
    console.log(error)
  })
  return document
}

export async function getThaiStockLotto (queryDate) {
  let document
  await getDoc(doc(ThaiStockLottoCollection, queryDate)).then((docSnap) => {
    if (docSnap.exists()) {
      document = docSnap.data()
    }
  }).catch((error) => {
    console.log(error)
  })
  return document
}

export async function getJubyeekee (queryDate) {
  let document
  await getDoc(doc(JubyeekeeCollection, queryDate)).then((docSnap) => {
    if (docSnap.exists()) {
      document = docSnap.data()
    }
  }).catch((error) => {
    console.log(error)
  })
  return document
}

export async function getNormalLotto (queryDate) {
  let document
  await getDoc(doc(NormalLottoCollection, queryDate)).then((docSnap) => {
    if (docSnap.exists()) {
      document = docSnap.data()
    } else {
      return null
    }
  }).catch((error) => {
    console.log(error)
  })
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

export async function queryDocument (collection, document) {
  const docRef = doc(db, collection, document)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    return null
  }
}

export async function queryDocumentWhere (col, value1, value2) {
  if (value1.includes('round')) {
    value1 = 'Jukyeekee'
  }
  const arr = []
  const q = query(collection(db, col), where('lottoType', '==', value1), where('applyTo', '==', value2))
  const querySnapshot = await getDocs(q)
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      arr.push(doc.data())
    })
    return arr
  } else {
    return null
  }
}

export async function getTicketHistory (uid) {
  const arr = []
  const q = query(collection(db, 'boughtLottery'), where('player', '==', uid), orderBy('display_date_time', 'desc'))
  const querySnapshot = await getDocs(q)
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      const newObj = { ...doc.data() }
      newObj.docID = doc.id
      arr.push(newObj)
    })
    return arr
  } else {
    return null
  }
}

export async function getJubyeekeeSentingNumber (id) {
  const docRef = doc(db, 'JukyeekeeGameRoom', id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    return null
  }
}

export async function getLottoLimitPerNumber (collection, uid) {
  let lottoLimitedRow = null
  const lottoLimitedRef = doc(db, collection, uid)
  const lottoLimitedSnap = await getDoc(lottoLimitedRef)
  if (lottoLimitedSnap.exists()) {
    lottoLimitedRow = {}
    for (const item of numberTypeOptions) {
      lottoLimitedRow[item.value] = lottoLimitedSnap.data()[item.value]
    }
  }
  return lottoLimitedRow
}
