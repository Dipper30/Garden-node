const model = require('../../db/models')
const DailyDurationModel = require('../model/DailyDuration')
const { getDateTS, getCurrentTS } = require('../lib/DateFormat')
const {TZ} = require('../lib/TimeZone')

class Room {

  constructor() {
    this._currentDate = getDateTS()
    console.log('current', this._currentDate, new Date(this._currentDate*1000))
  }

  async enterRoom ( room, user_id ) {
    let { current_users, daily_liveness } = room
    if ( !current_users || current_users.length == 0 ) {
      current_users = JSON.stringify([])
    }
    if ( !daily_liveness || daily_liveness.length == 0 ) {
      daily_liveness = JSON.stringify({})
    }
    current_users = JSON.parse(current_users)
    daily_liveness = JSON.parse(daily_liveness)

    // 若果日活跃度没有当天记录，则初始化为0
    if ( !daily_liveness.hasOwnProperty(this._currentDate) ) {
      daily_liveness[this._currentDate] = 0
    }
    // 当前房间用户推入用户id
    if (!current_users.includes(user_id)) {
      current_users.push(user_id)
      daily_liveness[this._currentDate]++
    }

    try {
      // 设置用户状态
      let status = 1, 
      is_in_room = room.id, 
      
      study_starts_from = getCurrentTS()
    
      room.current_users = JSON.stringify(current_users)
      room.daily_liveness = JSON.stringify(daily_liveness)
      await room.save()

      const duration = await model.StudyDuration.create({
        user_id,
        room_id: room.id,
        start_time: study_starts_from,
      })

      await model.DailyDuration.findOrCreate({
        where: {
          user_id,
          date: this._currentDate,
        }, 
        defaults: {
          duration: 0
        }
      })

      await model.User.update({
        status,
        study_starts_from,
        is_in_room,
        recent_duration_id: duration.id
      }, {
        where: {
          id: user_id
        }
      })

      const users = await model.User.findAll({
        where: {
          id: current_users
        }
      })

      room.current_users = current_users
      room.daily_liveness = daily_liveness
      // user.status = status
      // user.is_in_room = is_in_room
      // user.study_starts_from = study_starts_from
      return { room, users}
    } catch (error) {
      return false
    }
  }

  /**
   * # 点击离开房间
1. 房间current_user减去对应user_id
2. 结算StudyDuration, end_time设置为服务器当前时刻时间戳
3. 用户daily_duration结算
  a. 首先确定服务器当前时刻时间戳所在日期零点时刻的时间戳，记为date_ts
  b. 如果学习开始时刻study_starts_from > date_ts，那么该段时间是处于当天内的，则直接给daily_duration[date_ts]加上 end_time - start_time 
  c. 如果如果学习开始时刻study_starts_from < date_ts，那么给daily_duration[date_ts]加上 end_time - date_ts
4. 用户status, is_in_room, study_starts_from, recent_duration_id等字段置空
   * 
   * 
   */
  async leaveRoom ( room, user ) {
    try {
      // 房间数据库操作
      let { current_users } = room
      if ( !current_users ) current_users = JSON.stringify([])

      current_users = JSON.parse(current_users)
      current_users = current_users.filter( id => id != user.id)
      // const index = current_users.indexOf(user.id)
      // console.log(index);
      // if (index < 0) return false

      // current_users.splice(index, 1)
      room.current_users = JSON.stringify(current_users)
      await room.save()

      // StudyDuration.end_time
      const end_time = getCurrentTS()

      await model.StudyDuration.update({
        end_time
      }, {
        where: {
          id: user.recent_duration_id
        }
      })

      // 今日录入的学习时长
      const { study_starts_from } = user
      const duration = end_time - Math.max(study_starts_from, this._currentDate)
      // console.log('total duration', duration)

      // 判断是否存在用户的今日时长记录, 如果没有则新建一个
      // dailyDuration: [实例, 是否新建]
      const dailyDuration = await model.DailyDuration.findOrCreate({
        where: {
          user_id: user.id,
          date: this._currentDate,
        }, 
        defaults: {
          duration: 0
        }
      })
      dailyDuration[0].duration += duration
      await dailyDuration[0].save()
      
      // 用户数据库操作
      user.study_starts_from = null
      user.status = 0
      user.is_in_room = null
      user.recent_duration_id = null
      await user.save()

      return true
    } catch (error) {
      return false
    }
  }
}

module.exports = new Room()