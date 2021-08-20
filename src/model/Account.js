const model = require('../../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
class Account {
  constructor () {

  } 

  async findAccount (params) {
    const { username } = params
    // username = username.toLowerCase()
    try {
      //TODO ignore case
      const hasAccount = await model.User.findOne({
        where: {
          username
        }
      })
      console.log('find', hasAccount);
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