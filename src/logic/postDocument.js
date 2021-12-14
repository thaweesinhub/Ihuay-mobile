import { db } from '../boot/firebase'
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore'
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

export async function deleteDocuments (collection, docID) {
  await deleteDoc(doc(db, collection, docID))
    .catch((error) => {
      console.log(error)
      return 'error'
    })
    .then(() => { return 'success' })
}
