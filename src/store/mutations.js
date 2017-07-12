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
export default {
  [types.UPDATE_PAGE_TITLE]: updatePageTitle,
  [types.UPDATE_APP_HEIGHT]: updateAppHeight,
  [types.UPDATE_HEADER_HEIGHT]: updateHeaderHeight
}
