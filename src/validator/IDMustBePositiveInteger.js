const BaseValidator = require("./BaseValidator")
const validator = require('validator')

class IDMustBePositiveInteger extends BaseValidator {
  // 这里定义了所有required的参数
  rules = ['id|number|required']

  constructor (params, rules) {
    super()
    this.params = params
    this.rules = rules 
  }

  goCheck () {
    const { id } = this.params
    if ( !validator.isNumeric(id) || parseInt(id) < 0 ) return false
    // const valid = this.checkParams(this.params, this.rules)
    return true
  }
}

module.exports = IDMustBePositiveInteger