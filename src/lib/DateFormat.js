const moment = require('moment')
// moment().format()
const {TZ} = require('./TimeZone')

const formatDate = () => {
  return null
}

// 获取当前日期零点时的时间戳
/**
 * node 中的date时间戳是UTC时间
 * 因此所有通过 new Date() 得到的时间都需要 +8 小时
 * 时区可以改变，时区配置放在lib中
 */
// 把当前日期变成unix秒级时间戳
const getDateTS = ( ts = 0 ) => ts === 0 
? moment.unix(moment().format('X')).startOf('day').format('X') 
: moment.unix(ts).startOf('day').format('X')

// 返回当前时间秒级时间戳
const getCurrentTS = () => moment().format('X')

module.exports = {
  getDateTS,
  getCurrentTS
}