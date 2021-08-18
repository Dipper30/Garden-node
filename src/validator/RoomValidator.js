const BaseValidator = require("./BaseValidator")

class RoomValidator extends BaseValidator {

  // 这里定义了所有参数的校验标准
  rules = ['name|string|required', 'owner_id|number|required', 'password|string|allowNull', 'volume|number|allowNull']

  constructor (params) {
    super()
    this.params = params
  }

  goCheck () {
    return this.checkParams(this.params, this.rules)
  }
}

module.exports = RoomValidator