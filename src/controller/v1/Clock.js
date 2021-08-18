const BaseController = require('../BaseController')
const ParameterException = require('../../exceptions/ParameterException')
// const TokenService = require('../../service/Token')
// const TokenException = require('../../exceptions/TokenException')
const ClockValidator = require('../../validator/ClockValidator')
const ClockModel = require('../../model/Clock')

class Clock extends BaseController {
  constructor () {
    super()
  }

  async createClock (req, res, next) {
    try {
      let valid = new ClockValidator(req.body)
      if (!valid.goCheck()) throw new ParameterException()
      
      const report = await ClockModel.createClock(req.body)
      if(!report) throw new Error('unknown error')

      res.json({
        code: 201,
        msg: 'success'
      })
    } catch (error) {
      next(error)
    }
  }

}

module.exports = new Clock()