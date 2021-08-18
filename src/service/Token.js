const jwt = require('jsonwebtoken')
const { PRIVATE_KEY, PUBLIC_KEY, EXPIRE_IN } = require('../lib/TokenConfig')

class Token {
  constructor(data) {
    this.data = data.toString()

  }

  //生成token
  generateToken() {
    const data = this.data
    const created = Math.floor(Date.now() / 1000)
    let token = jwt.sign({data}, PRIVATE_KEY, {expiresIn: created + EXPIRE_IN})
    return token
  }

  // 校验token
  verifyToken() {
    const token = this.data
    try {
      const res = jwt.verify(token, PRIVATE_KEY) || {}
      const { exp = 0 } = res, current = Math.floor(Date.now() / 1000)
      // 不知道为什么这里的exp时间戳是实际值的两倍，因此要➗2
      if (current > exp/2) return false
    } catch (error) {
      return false
    }
    return true
  }
}

module.exports = Token