const model = require('../../db/models')
class Setting {
  constructor () {

  } 

  async report (params) {
    try {
      const report = await model.Report.create(params)
      return report
    } catch (error) {
      return error
    }
  }

}

module.exports = new Setting()