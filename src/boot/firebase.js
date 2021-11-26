import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import 'animate.css'
const firebaseConfig = {
  apiKey: 'AIzaSyDQIcd2GAINbsPHgwFZOYs3tlGA8FTpEFw',
  authDomain: 'statingihuay.firebaseapp.com',
  projectId: 'statingihuay',
  storageBucket: 'statingihuay.appspot.com',
  messagingSenderId: '162705076002',
  appId: '1:162705076002:web:fb7d97faef892ad6443f7b',
  measurementId: 'G-FF1JR9FQXQ'
}
let firebaseApp = initializeApp(firebaseConfig)

if (!firebaseApp) {
  firebaseApp = initializeApp(firebaseConfig)
}

const auth = getAuth()
let uid = null
onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid
  }
})

const db = getFirestore()

export { db, uid }
