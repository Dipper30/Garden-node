const BaseController = require('../BaseController')
// import BaseValidator from '../../validator/BaseValidator'
// 异常处理
const ParameterException = require('../../exceptions/ParameterException')
const AccountException = require('../../exceptions/AccountException')

// 校验层
const IDMustBePositiveInteger = require('../../validator/IDMustBePositiveInteger')
const UserValidator = require('../../validator/UserValidator')
const AccountValidator = require('../../validator/AccountValidator')
const UserModel = require('../../model/User')
const AccountModel = require('../../model/Account')
const TokenService = require('../../service/Token')
const TokenException = require('../../exceptions/TokenException')

// const userModel = new UserModel()
// const pi = new IDMustBePositiveInteger()

class User extends BaseController {
  constructor () {
    super()
  }

  async getUserByID (req, res, next) {
    try {
      const Token  = new TokenService(req.headers.token)
      if (!Token.verifyToken()) throw new TokenException()

      let valid = new IDMustBePositiveInteger(req.params)
      if (!valid.goCheck()) throw new ParameterException()
      
      const user = await UserModel.getUserByID(req.params)
      if(!user) throw new Error('未知错误')
      
      res.json({
        code: 200,
        data: user,
        msg: 'success'
      })
    } catch (error) {
      next(error)
    }
  }

  async updateUser (req, res, next) {
    try {
      const Token  = new TokenService(req.headers.token)
      if (!Token.verifyToken()) throw new TokenException()

      let valid = new UserValidator(req.body)
      if (!valid.goCheck()) throw new ParameterException() 
      
      const user = await UserModel.getUserByID(req.params)
      if(!user) throw new Error('未知错误')
      
      res.json({
        code: 200,
        data: user,
        msg: 'success'
      })
    } catch (error) {
      next(error)
    }
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

module.exports = new User()