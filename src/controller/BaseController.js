class BaseController {

  attrsToOmit = ['createdAt', 'updatedAt']

  constructor (params) {
    this.params = params
  }

}

module.exports = BaseController