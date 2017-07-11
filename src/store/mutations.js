import * as types from './mutation-types'

const updatePageTitle = (state, title) => {
  state.title = title
}

export default {
  [types.UPDATE_PAGE_TITLE]: updatePageTitle
}

// [types.UPDATE_PAGE_TITLE]

