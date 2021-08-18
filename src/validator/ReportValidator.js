const BaseValidator = require("./BaseValidator")
const validator = require('validator')

class ReportValidator extends BaseValidator {

  // 这里定义了所有参数的校验标准
  rules = ['user_id|number|required', 'type|number|required', 'descriptions|string|required']

  constructor (params) {
    super()
    this.params = params
  }

  goCheck () {
    return this.checkParams(this.params, this.rules)
  }
}

module.exports = ReportValidator
