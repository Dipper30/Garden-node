const moment = require('moment')
// moment().format()
const {TZ} = require('./TimeZone')

const formatDate = () => {
  return null
}

// 获取当前日期零点时的时间戳
/**
 * @param {ts: number} 输入当前日期时间戳
 * @returns {ts: number} 返回当前日期的unix秒级时间戳
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