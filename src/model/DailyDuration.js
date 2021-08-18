const model = require('../../db/models')

class DailyDuration {
  constructor () {

  } 

  async findDailyDuration (params) {
    const { user_id, date } = params
    try {
      const hasRecord = await model.DailyDuration.findOne({
        where: {
          user_id,
          date,
        }
      })
      return hasRecord
    } catch (error) {
      return false
    }
  }

  async initDailyDuration (params) {
    // const { user_id, date, duration } = params
    try {
      await model.DailyDuration.create({
        where: {
          ...params
        }
      })
    } catch (error) {
      return false
    }
  }

  async incrementDailyDuration (params) {
    const { user_id, date, duration } = params
    try {
      await model.DailyDuration.update({
        duration
      }, {
        where: {
          user_id,
          date
        }
      })
    } catch (error) {
      return false
    }
  }

  // async loginAccount (params) {
  //   const { account, password } = params
  //   try {
  //     const user = await model.User.findOne({
  //       where: {
  //         account
  //       }
  //     })
  //     if ( user && user.password == password ) return user
  //     else return null
  //   } catch (error) {
  //     console.log('find error');
  //     throw error
  //   }
  // }


}

module.exports = new DailyDuration()