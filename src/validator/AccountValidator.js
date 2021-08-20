const BaseValidator = require("./BaseValidator")
const validator = require('validator')

class AccountValidator extends BaseValidator {

  // 这里定义了所有参数的校验标准
  rules = ['username|string|required', 'password|string|required', 'name|string|allowNull', 'grade|number|allowNull', 'school|number|allowNull']

  constructor (params) {
    super()
    this.params = params
  }

  goCheck () {
    const valid = this.checkParams(this.params, this.rules)
    if ( !valid ) return false
    const { password } = this.params
    if ( password.length < 6 ) return false
    return true
  }
}

module.exports = AccountValidator