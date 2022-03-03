import { Notify } from 'quasar'
export function getMessageFromErrorCode (ErrorCode) {
  switch (ErrorCode) {
    case 'ERROR_EMAIL_ALREADY_IN_USE':
    case 'auth/account-exists-with-different-credential':
    case 'email-already-in-use':
      return 'ขณะนี้มันการใช้งานบัญชีนี้อยู่ โปรดลองอีกครั้งภายหลัง'
    case 'ERROR_WRONG_PASSWORD':
    case 'auth/wrong-password':
      return 'ชื่อผู้ใช้ หรือ รหัสผ่านผิด โปรดตรวจสอบอีกครั้ง'
    case 'auth/user-not-found':
    case 'user-not-found':
      return 'ไม่พบชื่อผู้ใช้งานที่ระบุมา'
    case 'auth/user-disabled':
    case 'user-disabled':
      return 'ขออภัยบัชญีของท่านได้ถูกระงับ'
    case 'ERROR_TOO_MANY_REQUESTS':
    case 'operation-not-allowed':
      return 'ขออภัย มีความพยายามในการล็อกอินบัญชีนี้เกินกว่ากำหนด โปรดลองอีกครั้งภายหลัง'
    case 'ERROR_OPERATION_NOT_ALLOWED':
    case 'ERROR_INVALID_EMAIL':
    case 'auth/invalid-email':
      return 'รูปแบบของชื่อบัญชีผิด'
    default:
      return 'เข้าสู่ระบบไม่สำเร็จโปรดลองอีกครั้ง'
  }
}

export function NotifyWarning (msg) {
  Notify.create({
    type: 'warning',
    group: false,
    message: `${msg}`
  })
}

export function NotifyError (msg) {
  Notify.create({
    group: false,
    type: 'negative',
    message: `${msg}`
  })
}

export function NotifySuccess (msg) {
  Notify.create({
    type: 'positive',
    message: `${msg}`
  })
}
