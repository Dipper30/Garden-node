
const BaseController = require('./BaseController')
// 异常类
const ParameterException = require('../exceptions/ParameterException')
const AccountException = require('../exceptions/AccountException')
// 校验层
const AccountValidator = require('../validator/AccountValidator')
const UserValidator = require('../validator/UserValidator')
// 模型层
const UserModel = require('../model/User')
const AccountModel = require('../model/Account')
// TokenService
const TokenService = require('../service/Token')

const { omit } = require('../lib/OmitFields')

// const userModel = new UserModel()
// const pi = new IDMustBePositiveInteger()

class Account extends BaseController {
  constructor () {
    super()
  }

  async checkAccount (req, res, next) {
    try {
      if (!req.body.username) throw new AccountException('params error')

      const hasAccount = await AccountModel.findAccount(req.body)
      if ( hasAccount ) throw new AccountException('user exsists')

      res.json({
        code: 200,
        msg: 'ok'
      })

    } catch (error) {
      next(error)
    }
  }

  async register (req, res, next) {
    try {
      const valid = new AccountValidator(req.body)
      if (!valid.goCheck()) throw new AccountException('params error')

      const hasAccount = await AccountModel.findAccount(req.body)
      if ( hasAccount ) throw new AccountException('user exsists')

      // const isUser = new UserValidator(req.body)
      // if (!isUser.goCheck()) throw new AccountException('params error')

      const user = await UserModel.createUser(req.body)
      if (!user) throw new AccountException('db error')

      res.json({
        code: 201,
        msg: 'success'
      })
    } catch (error) {
      next(error)
    }
  }

  async login (req, res, next) {
    try {
      const valid = new AccountValidator(req.body)
      if (!valid.goCheck()) throw new AccountException('incorrect username or password')

      const account = await AccountModel.loginAccount(req.body)
      if ( !account ) throw new AccountException('incorrect username or password')

      // logged in, return a token
      let Token = new TokenService(account.dataValues.id)
      let token = Token.generateToken()
      
      res.json({
        code: 200,
        msg: 'Logged in!',
        data: omit(account),
        token
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Account