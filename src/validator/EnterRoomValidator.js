const BaseValidator = require("./BaseValidator")
const validator = require('validator')

class EnterRoomValidator extends BaseValidator {

  // 这里定义了所有参数的校验标准
  rules = ['room_id|number|required', 'user_id|number|required', 'password|string|allowNull']

  constructor (params) {
    super()
    this.params = params
  }

  goCheck () {
    return this.checkParams(this.params, this.rules)
  }
}

module.exports = EnterRoomValidator