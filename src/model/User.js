const model = require('../../db/models')

class User {
  constructor () {

  }

  async getUserByID (params) {
    const { id } = params
    try {
      const user = await model.User.findOne({
        where: {
          id
        }
      })
      return user
    } catch (error) {
      return false
    }  
  }

  async createUser (params) {
    const { account, password, name, gender } = params
    console.log('params',params);
    const daily_duration = JSON.stringify({})
    try {
      const user = await model.User.create({
        account,
        password,
        name,
        gender,
        daily_duration
      })
      return user
    } catch (error) {
      return false
    }  
  }
}

module.exports = new User()