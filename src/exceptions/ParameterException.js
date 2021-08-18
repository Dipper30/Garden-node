const BaseException = require('./BaseException')

class ParameterException extends BaseException {
  
  constructor () {
    // super(this.code, this.msg, this.errorCode)
    super()
    this.code = 400
    this.msg = 'invalid parameters'
    this.error_code = 9999
  }
}

module.exports = ParameterException