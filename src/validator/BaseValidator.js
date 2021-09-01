const validator = require('validator')
class BaseValidator {

  constructor (params) {
    this.params = params
  }

  checkParams (params, rules) {
    // 遍历每一个属性名的规则
    for ( let single_rule of rules ) {
      // 将rule字符串转成数组
      let single_rule_arr = single_rule.split('|')
      const key =  single_rule_arr[0]
      const type = single_rule_arr[1]
      // 当指定参数名不存在时，优先校验required属性
      if ( !params.hasOwnProperty(key) ) {
        if ( single_rule_arr.includes('required') ) return false
        else continue
      } else {
        // 此时请求参数中存在规则内的属性名
        // 判断是否可以为空值
        if ( single_rule_arr.includes('allowNull') && params[key] == null ) {
          continue
        }
        switch (type) {
          case 'number': 
            if ( typeof params[key] != 'number' ) return false
            break
          case 'string': 
            if ( typeof params[key] != 'string' ) return false
            break;
          case 'boolean': 
            if ( !validator.isBoolean(params[key]) ) return false
            break
          case 'date':
            if ( !validator.isDate(params[key]) ) return false
            break
          default:
            break
        }
      }
    }
    return true
  }

  isPositiveInteger () {
    return true
  }

  // unix timestamp must be 10 digits
  isUnixTimeStamp (ts) {
    return !!ts && typeof ts == 'number' && ts.toString().length === 10
  }
}

module.exports = BaseValidator