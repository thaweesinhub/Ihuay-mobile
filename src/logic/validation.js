
export function checkLottoAlreadyHaveResult (lottoResult) {
  if (lottoResult === '') {
    return 'รอผล'
  } else {
    return lottoResult
  }
}
//
export function createDummyGovermentLotto () {
  return {
    name: 'หวยรัฐบาลไทย',
    key: 'lotto_thai_gorverment',
    result_first_prize: 'xxxxxx',
    result_three_back_1: 'xxx',
    result_three_back_2: 'xxx',
    result_three_front_1: 'xxx',
    result_three_front_2: 'xxx',
    result_two_down: 'xx'
  }
}
export const dummyBAACLotto = {
  name: 'หวย ธกศ',
  key: 'lotto_baac',
  result_three_up: 'xxx',
  result_two_down: 'xx'
}
export const dummyGSBLotto = {
  name: 'หวยออมสิน',
  key: 'lotto_gsb',
  result_three_up: 'xxx',
  result_two_down: 'xx'
}
