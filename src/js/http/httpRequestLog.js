import variables from '../../config/variables'
const debug = variables.config.debug

const log = {
  log (...args) {
    if (debug) {
      console.log(...args)
    }
  },
  groupError (...args) {
    if (debug) {
      console.error(...args)
    }
  },
  group (...args) {
    if (debug) {
      console.group(...args)
    }
  },
  groupEnd () {
    if (debug) {
      console.groupEnd()
    }
  },
  error (...args) {
    if (debug) {
      console.error(...args)
    }
  }
}

export default log
