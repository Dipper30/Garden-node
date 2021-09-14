const model = require('../../db/models')
const { getCurrentTS } = require('../lib/DateFormat')

class Clock {
  constructor () {

  } 

  async getClocksByUID (params) {
    try {
      let {user_id, locale} = params
      const clocks = await model.Clock.findAll({
        where: {
          user_id
        }
      })

      if (!clocks) return false
      if (!locale) locale = getCurrentTS()
      clocks.sort(this.sortByDate)
      const future = clocks.filter(clock => clock.set_time > locale)
      const past = clocks.filter(clock => clock.set_time <= locale)

      return {
        total: clocks.length,
        future,
        past
      }
    } catch (error) {
      return error
    }
  }

  sortByDate (a, b) {
    console.log(a, b)
    return a.set_time - b.set_time
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

  async deleteClocksByUID (params) {
    try {
      const { clock_id } = params
      const deleted = await model.Clock.destroy({
        where: {
          id: clock_id
        }
      })
      return deleted
    } catch (error) {
      return error
    }
  }


}

module.exports = new Clock()