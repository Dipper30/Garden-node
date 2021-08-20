const model = require('../../db/models')

class Clock {
  constructor () {

  } 

  async getClocksByUID (params) {
    try {
      const clocks = await model.Clock.findAll({
        where: {
          user_id: params
        }
      })
      return clocks
    } catch (error) {
      return error
    }
  }

  async createClock (params) {
    try {
      const clock = await model.Clock.create({
        ...params
      })
      return clock
    } catch (error) {
      return error
    }
  }


}

module.exports = new Clock()