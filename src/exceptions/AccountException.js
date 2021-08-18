const BaseException = require('./BaseException')

class AccountException extends BaseException {
  msg = 'unknown exception of users'
  constructor (msg) {
    super()
    this.code = 500
    this.error_code = 30000
    if (msg) this.msg = msg
  }
}

module.exports = AccountException