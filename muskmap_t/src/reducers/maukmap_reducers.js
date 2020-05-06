import { combineReducers } from 'redux'
//取得口罩地圖資料
const muskmapdata = (state = [], action) => {
  switch (action.type) {
    case 'GET_MUSKMAPSDATA':
      return action.value
    default:
      return state
  }
}
//合併多個reducer(歸納函式)，為了配合瀏覽器開發外掛而必須的
const muskmapreducer = combineReducers({
  muskmapdata,
})
export { muskmapreducer }
