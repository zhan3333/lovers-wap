var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  SERVER_BASE_URL: 'http://test.com:1025/api/'
})
