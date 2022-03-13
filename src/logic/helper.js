import moment from 'moment'

export function covertBetType (betType) {
  switch (betType) {
    case '3 ตัวบน':
      return 'three_up'
    case '3 ตัวโต๊ด':
      return 'three_up_tod'
    case '2 ตัวบน':
      return 'two_up'
    case '2 ตัวล่าง':
      return 'two_down'
    case '3 ตัวหน้า':
      return 'three_front'
    case '3 ตัวล่าง':
      return 'three_back'
    case 'วิ่งบน':
      return 'run_up'
    case 'วิ่งล่าง':
      return 'run_down'
  }
}

export function covertBetTypeENGtoTH (betType) {
  switch (betType) {
    case 'three_up':
      return '3 ตัวบน'
    case 'three_up_tod':
      return '3 ตัวโต๊ด'
    case 'two_up':
      return '2 ตัวบน'
    case 'two_down':
      return '2 ตัวล่าง'
    case 'three_front':
      return '3 ตัวหน้า'
    case 'three_back':
      return '3 ตัวล่าง'
    case 'run_up':
      return 'วิ่งบน'
    case 'run_down':
      return 'วิ่งล่าง'
  }
}

export function checkIfTimeAlredyOver (closeTime, STATUS) {
  if (STATUS === 'open') { return moment(closeTime, 'DD/MM/YYYY HH:mm').valueOf() - moment().locale('th').valueOf() > 0 } else { return 0 }
}

export function getUnixValue (time) {
  return moment(time, 'DD/MM/YYYY HH:mm').valueOf() - moment().locale('th').valueOf()
}

export function inRange (x, min, max) {
  return ((x - min) * (x - max) <= 0)
}

export function prepareInfo (gameKey) {
  const info = {}
  if (
    gameKey === 'lotto_thai_gorverment' ||
    gameKey === 'lotto_baac' ||
    gameKey === 'lotto_gsb' ||
    gameKey === 'lotto_maylasia'
  ) {
    info.priceRateCollection = 'lottoPrize'
    info.lottomax = 'lottomax'
    info.lottoLimited = 'lottoLimited'
    info.lottoCloseNumber = 'lottoCloseNumber'
    info.gameNumberPrice = 'lottoGameNumberPrice'
  } else if (gameKey.includes('round')) {
    info.priceRateCollection = 'JukyeekeePrize'
    info.lottomax = 'JukyeekeeMaxplay'
    info.lottoLimited = 'JukyeekeeLimited'
    info.lottoCloseNumber = 'JukyeekeeClosenumber'
    info.gameNumberPrice = 'JukyeekeeGameNumberPrice'
  } else {
    info.priceRateCollection = 'indexlottoPrize'
    info.lottomax = 'indexLottomax'
    info.lottoLimited = 'indexLottoLimited'
    info.lottoCloseNumber = 'indexLottoCloseNumber'
    info.gameNumberPrice = 'indexLottoGameNumberPrice'
  }
  return info
}

export const betType = [
  { key: 'three_up' },
  { key: 'three_up_tod' },
  { key: 'two_up' },
  { key: 'two_down' },
  { key: 'run_up' },
  { key: 'run_down' },
  { key: 'three_front' },
  { key: 'three_back' }
]

export function filterResultedLotto (payload) {
  const arr = []
  payload.forEach((item) => {
    if (item.STATUS === 'resulted') {
      arr.push(item)
    }
  })
  return arr
}

export function filterWaitForResult (payload) {
  const arr = []
  payload.forEach((item) => {
    if (item.STATUS === 'waiting') {
      arr.push(item)
    }
  })
  return arr
}
