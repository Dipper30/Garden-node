const BaseController = require('../BaseController')
const ParameterException = require('../../exceptions/ParameterException')
// const TokenService = require('../../service/Token')
// const TokenException = require('../../exceptions/TokenException')
const ClockValidator = require('../../validator/ClockValidator')
const ClockModel = require('../../model/Clock')
const { omit } = require('../../lib/OmitFields')
class Clock extends BaseController {
  constructor () {
    super()
  }

  async getClocksByUID (req, res, next) {
    try {
      const { user_id } = req.query
      if (!user_id) throw new ParameterException()
      
      const clocks = await ClockModel.getClocksByUID(user_id)
      if(!clocks) throw new Error('unknown error')

      res.json({
        code: 200,
        msg: 'success',
        data: omit(clocks)
      })
    } catch (error) {
      next(error)
    }
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

module.exports = Clock