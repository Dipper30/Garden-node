const BaseController = require('./BaseController')
// import BaseValidator from '../../validator/BaseValidator'
// 异常类
const ParameterException = require('../exceptions/ParameterException')

const IDMustBePositiveInteger = require('../validator/IDMustBePositiveInteger')
const AccountValidator = require('../validator/AccountValidator')
const UserModel = require('../model/User')

// const userModel = new UserModel()
// const pi = new IDMustBePositiveInteger()

class Register extends BaseController {
  constructor () {
    super()
  }

  async createUser (req, res, next) {

  }

  async updateUser (req, res, next) {
    try {
      const valid = new UserValidator(req.body)
      if (!valid.goCheck()) throw new ParameterException()

      const user = await UserModel.createUser(req.body)
      res.json({
        code: 200,
        msg: 'success'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new Register()