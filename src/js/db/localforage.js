import * as localforage from 'localforage'

export const dbStore = localforage.createInstance({
  name: 'lovers',
  version: 1.0,
  storeName: 'lovers',
  description: 'db'
})
