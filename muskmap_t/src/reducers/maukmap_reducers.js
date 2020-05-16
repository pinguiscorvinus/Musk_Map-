import { combineReducers } from 'redux'
//預設資料
let initState1 = {
  currentcity: 'Nation',
}
let initState2 = {
  currentarea: 'Unset',
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
const passlocationdata = (state = initState1, action) => {
  switch (action.type) {
    case 'SENT_LOCATIONDATA':
      return Object.assign({}, state, {
        currentcity: action.currentcity,
      })
    default:
      return state
  }
}
//取得所選鄉鎮市區
const passlocationareadata = (state = initState2, action) => {
  switch (action.type) {
    case 'SENT_LOCATIONAREADATA':
      return Object.assign({}, state, {
        currentarea: action.currentarea,
      })
    default:
      return state
  }
}
//合併多個reducer(歸納函式)，為了配合瀏覽器開發外掛而必須的
const muskmapreducer = combineReducers({
  muskmapdata,
  passlocationdata,
  passlocationareadata,
})
export { muskmapreducer }
