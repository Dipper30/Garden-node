const BaseException = require('./BaseException')

class ClockException extends BaseException {
  msg = 'unknown exception of clocks'
  constructor (msg) {
    super()
    this.code = 500
    this.error_code = 50000
    if (msg) this.msg = msg
  }
}

module.exports = ClockException