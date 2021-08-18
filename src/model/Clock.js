const model = require('../../db/models')

class Clock {
  constructor () {

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