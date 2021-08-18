const model = require('../../db/models')
const DailyDurationModel = require('../model/DailyDuration')
const { getDateTS, getCurrentTS } = require('../lib/DateFormat')
const {TZ} = require('../lib/TimeZone')

class StudyDuration {

  constructor() {

  }

  async calculateStudyDuration (req, res, err) {
    console.log('正在进行零点学习时间清算')
    // 当前日期零点时刻的秒级时间戳
    const currentDateTS = getDateTS()
    try {
      // 联表查询用户User.recent_duration_id = StudyDuration.id
      // belongsTo 是根据 User 的外键作为条件去查询 StudyDuration 的主键
      // hasOne是根据 StudyDuration 的外键作为条件去查询User的主键
      model.User.belongsTo(model.StudyDuration, {
        foreignKey: 'recent_duration_id',
        as: 'study_duration'
      })
      const users = await model.User.findAll({
        where: {
          status: 1,
        }
      }, {
        include: {
          model: model.StudyDuration,
          as: 'study_duration'
        }
      })

      users.forEach(async user => {
        // 计算到零点时的学习时间
        let duration = currentDateTS - user.study_starts_from
        let dailyDuration = await model.DailyDuration.findOrCreate({
          where: {
            user_id: user.id,
            date: currentDateTS - 3600*24
          }, 
          defaults: {

            duration: 0,
          }
        })
        dailyDuration = dailyDuration[0]
        console.log('find one daily duration', dailyDuration,dailyDuration.user_id)
        dailyDuration.duration += duration
        await dailyDuration.save()
        
      })
      res.json({
        code: 200,
        msg: 'success'
      })
      
      

      // model.StudyDuration.belongsTo(model.User)


    } catch (error) {
      res.json({
        code: 90000,
        msg: '零点定时操作错误'
      })
    }
    
  }

}

module.exports = new StudyDuration()