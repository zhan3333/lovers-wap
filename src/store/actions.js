import * as types from './mutation-types'

/* 修改页面标题 */
export const changePageTitle = ({commit, state}, title) => {
  commit(types.UPDATE_PAGE_TITLE, title)
}
export const updateAppHeight = ({commit}, height) => {
  commit(types.UPDATE_APP_HEIGHT, height)
}
export const updateHeaderHeight = ({commit}, height) => {
  commit(types.UPDATE_HEADER_HEIGHT, height)
}

