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
    const { username, password, name , avartar, gender, grade, school, character } = params
    console.log('paeams,',params,model.User.create);
    try {
      const user = await model.User.create({
        username,
        password,
        name,
        gender,
        grade, 
        avartar,
        school, 
        character
      })
      console.log('?',user);
      return user
    } catch (error) {
      console.log(error)
      return false
    }  
  }
}

module.exports = new User()