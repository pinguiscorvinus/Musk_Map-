import { combineReducers } from 'redux'

let initState = {
  currentcity: 'Nation',
}
//取得口罩地圖資料
const muskmapdata = (state = [], action) => {
  switch (action.type) {
    case 'GET_MUSKMAPSDATA':
      return action.value
    default:
      return state
  }
}
// 取得所選縣市
const passlocationdata = (state = initState, action) => {
  switch (action.type) {
    case 'SENT_LOCATIONDATA':
      return Object.assign({}, state, {
        currentcity: action.currentcity,
      })
    default:
      return state
  }
}
//合併多個reducer(歸納函式)，為了配合瀏覽器開發外掛而必須的
const muskmapreducer = combineReducers({
  muskmapdata,
  passlocationdata,
})
export { muskmapreducer }
