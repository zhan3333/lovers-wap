import * as types from './mutation-types'

const updatePageTitle = (state, title) => {
  state.title = title
}
const updateAppHeight = (state, height) => {
  state.appHeight = height
}
const updateHeaderHeight = (state, height) => {
  state.headerHeight = height
}
const changeTabbarStatus = (state, status) => {
  if (status) {
    state.showTabbar = ''
  } else {
    state.showTabbar = 'none'
  }
}
const changeHeaderShowBack = (state, status) => {
  state.headerShowBack = status
}
export default {
  [types.UPDATE_PAGE_TITLE]: updatePageTitle,
  [types.UPDATE_APP_HEIGHT]: updateAppHeight,
  [types.UPDATE_HEADER_HEIGHT]: updateHeaderHeight,
  [types.CHANGE_TABBAR_STATUS]: changeTabbarStatus,
  [types.CHANGE_HEADER_SHOW_BACK]: changeHeaderShowBack
}
