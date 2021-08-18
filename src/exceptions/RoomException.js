const BaseException = require('./BaseException')

class RoomException extends BaseException {
  msg = 'unknown error with room'
  error_code = 5002
  /**
   * 50000 房间类型错误
50001 房间已存在
50002 房间不存在
50003 加入房间错误
50004 离开房间错误
   */
  constructor (msg, code) {
    super()
    this.code = 500
    if (code) this.error_code = code
    if (msg) this.msg = msg
  }
}

module.exports = RoomException