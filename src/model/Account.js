const model = require('../../db/models')
class Account {
  constructor () {

  } 

  async findAccount (params) {
    const { username } = params
    try {
      const hasAccount = await model.User.findOne({
        where: {
          username
        }
      })
      return hasAccount
    } catch (error) {
      return error
    }
  }

  async loginAccount (params) {
    const { username, password } = params
    try {
      const user = await model.User.findOne({
        where: {
          username
        }
      })
      if ( user && user.password == password ) return user
      else return null
    } catch (error) {
      console.log('find error')
      return false
    }
  }


}

module.exports = new Account()