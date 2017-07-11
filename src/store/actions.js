import * as types from './mutation-types'

/* 修改页面标题 */
export const changePageTitle = ({commit, state}, title) => {
  commit(types.UPDATE_PAGE_TITLE, title)
}

