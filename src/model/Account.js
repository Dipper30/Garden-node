const model = require('../../db/models')
class Account {
  constructor () {

  } 

  async findAccount (params) {
    const { account } = params
    try {
      const hasAccount = await model.User.findOne({
        where: {
          account
        }
      })
      return hasAccount
    } catch (error) {
      return error
    }
  }

  async loginAccount (params) {
    const { account, password } = params
    try {
      const user = await model.User.findOne({
        where: {
          account
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