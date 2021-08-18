const BaseException = require('./BaseException')

class TokenException extends BaseException {
  msg = 'Token Exception'
  constructor (msg) {
    super()
    this.code = 500
    this.error_code = 10002
    if (msg) this.msg = msg
  }
}

module.exports = TokenException