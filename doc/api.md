# 接口文档

## clock

* 创建新的倒计时

``` js
{
  url: 'http://www.pitteeful.com/api/v1/createClock',
  method: 'post',
  param: {
    user_id, // int required
    set_time, // int required
    title, // string required
    desc // string
  },
  returns: {
    code: 201,
    msg: 'success'
  }
}
```

* 获取倒计时

``` js
{
  url: 'http://www.pitteeful.com/api/v1/clock',
  method: 'get',
  param: {
    user_id, // int required
    locale // int required #10-digit local timestamp
  },
  returns: {
    code: 200,
    data: {
      total, // int clock总数
      future: { // 还未到当前时间戳的倒计时
        {
          set_time, // int 10位时间戳
          title, // string
          desc // string
        },
      },
      past: { // 已经超过当前时间戳的倒计时
        {
          set_time, // int 10位时间戳
          title, // string
          desc // string
        },
      }
    }
  }
}
```

* 删除倒计时

``` js
{
  url: 'http://www.pitteeful.com/api/v1/deleteClock',
  method: 'post',
  param: {
    clock_id, // int required
  },
  returns: {
    code: 201,
    msg: 'deleted'
  }
}
```
