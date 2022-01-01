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

export function checkIfTimeAlredyOver (closeTime) {
  return moment(closeTime, 'MM/DD/YYYY HH:mm').valueOf() - moment().locale('th').valueOf() > 0
}

export function getUnixValue (time) {
  return moment(time, 'MM/DD/YYYY HH:mm').valueOf() - moment().locale('th').valueOf()
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
    gameKey === 'lotto_maylasia' ||
    gameKey === 'lotto_thai_gorverment' ||
    gameKey === 'thai_stock_afternoon' ||
    gameKey === 'thai_stock_evening' ||
    gameKey === 'thai_stock_morning' ||
    gameKey === 'thai_stock_noon'
  ) {
    info.priceRateCollection = 'lottoPrize'
    info.lottomax = 'lottomax'
    info.lottoCloseNumber = 'lottoCloseNumber'
    info.gameNumberPrice = 'lottoGameNumberPrice'
  } else {
    info.priceRateCollection = 'indexlottoPrize'
    info.lottomax = 'indexLottomax'
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
  { key: 'run_down' }
]
