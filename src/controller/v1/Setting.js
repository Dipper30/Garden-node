const BaseController = require('../BaseController')
const ParameterException = require('../../exceptions/ParameterException')
const TokenService = require('../../service/Token')
const TokenException = require('../../exceptions/TokenException')
const ReportValidator = require('../../validator/ReportValidator')
const SettingModel = require('../../model/Setting')

class Setting extends BaseController {
  constructor () {
    super()
  }

  async report (req, res, next) {
    try {
      const Token  = new TokenService(req.headers.token)
      if (!Token.verifyToken()) throw new TokenException()

      let valid = new ReportValidator(req.body)
      if (!valid.goCheck()) throw new ParameterException()
      
      const report = await SettingModel.report(req.body)
      if(!report) throw new Error('未知错误')

      res.json({
        code: 201,
        msg: 'success'
      })
    } catch (error) {
      next(error)
    }
  }

}

module.exports = Setting