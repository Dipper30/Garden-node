const BaseValidator = require("./BaseValidator")
const validator = require('validator')

class UserValidator extends BaseValidator {

  // 这里定义了所有参数的校验标准
  rules = ['name|string|required|allowNull', 'gender|number|required']

  constructor (params) {
    super()
    this.params = params
  }

  goCheck () {
    return this.checkParams(this.params, this.rules)
  }
}

module.exports = UserValidator