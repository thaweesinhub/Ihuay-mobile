import { db } from 'boot/firebase'
import { collection, addDoc, deleteDoc, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import moment from 'moment'
import { NotifyError, NotifySuccess } from 'src/logic/handler'

// eslint-disable-next-line camelcase
export async function CreateUserNumber_memo (payload) {
  try {
    await addDoc(collection(db, 'setNumber'), {
      createTime: moment().locale('th').format('DD/MM/YYYY HH:MM'),
      displayname: payload.displayname,
      player: payload.userID,
      selectNumber: payload.selectNumber
    })
    NotifySuccess('ทำรายการสำเร็จ')
  } catch (e) {
    console.log('Error adding document: ', e)
    NotifyError('เกิดข้อผิดพลาดขึ้น')
  }
}

export async function createDummy (collection, document) {
  await setDoc(doc(db, collection, document), {
    dummy: 'dummy'
  })
}

export async function deleteDocuments (collection, docID) {
  await deleteDoc(doc(db, collection, docID))
    .catch((error) => {
      console.log(error)
      return 'error'
    })
    .then(() => { return 'success' })
}

// eslint-disable-next-line camelcase
export async function updateNumberPrice (unique_key, numberPriceCollection, betType, number, value, agentID) {
  await setDoc(doc(db, numberPriceCollection, unique_key), {
    [agentID]: { [betType]: { [number]: value } }
  }, { merge: true }).catch((error) => {
    NotifyError(error)
  })
}

// eslint-disable-next-line camelcase
export async function createNumberPrice (unique_key, numberPriceCollection, betType, number, value, agentID) {
  await setDoc(doc(db, numberPriceCollection, unique_key), {
    [agentID]: { [betType]: { [number]: value } }
  }, { merge: true }).catch((error) => {
    NotifyError(error)
  })
}

export async function updateUserCredit (UserCredit, userID) {
  const docRef = doc(db, 'users', userID)
  await updateDoc(docRef, {
    credit: UserCredit
  }).catch((error) => {
    NotifyError(error)
  })
}

// eslint-disable-next-line camelcase
export async function createLottoOrder (gameUnique_key, Lotto, member, agentID, gameKey, gameName, betPrice, lottoCloseTime) {
  let ref = null
  await addDoc(collection(db, 'boughtLottery'), {
    boughtLottery: Lotto,
    player: member,
    agentID: agentID,
    gameID: gameKey,
    unique_key: gameUnique_key,
    gameName: gameName,
    betPrice: betPrice,
    display_date_time: moment().locale('th').format('L HH:mm '),
    lottoCloseTime: lottoCloseTime,
    STATUS: 'waiting',
    IsReWard: false,
    IsCancel: false,
    IsWaiting: true
  }).catch((error) => {
    NotifyError(error)
  }).then((docRef) => {
    console.log(docRef.id)
    ref = docRef.id
  })
  return ref
}
export async function sentingJubyeekee (docID, roundID, displayUsername, submittedTime, userName, yeekeeNumber,userID) {
  await setDoc(doc(db, 'JukyeekeeGameRoom', docID), {
    [roundID]: {
      sendingNumber: arrayUnion({
        displayUsername: displayUsername,
        submittedTime: submittedTime,
        userName: userName,
        userID: userID,
        yeekeeNumber: yeekeeNumber
      })
    }
  }, { merge: true })
}

export async function addCreditTransaction (doneBy, doneTo, info, remainCredit, transactionCredit, transactionType) {
  await addDoc(collection(db, 'creditTransaction'), {
    doneBy: doneBy,
    doneTo: doneTo,
    info: info,
    remainCredit: remainCredit,
    transactionCredit: transactionCredit,
    transactionDate: moment().locale('th').format('DD/MM/YYYY'),
    transactionDateTime: moment().locale('th').format('DD/MM/YYYY HH:mm'),
    transactionType: transactionType,
    unixTime: moment().unix()
  }).catch((err) => {
    NotifyError('เกิดข้อผิดพลาด')
    console.log(err)
  })
}
