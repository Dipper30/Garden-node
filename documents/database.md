# 数据库表设计
npx sequelize-cli model:generate --name Duration --attributes user_id:integer,room_id:integer,start_from:integer,end_at:integer,interruptions:integer

# 配置
"development": {
    "username": "admin",
    "password": "aws-demo-123456",
    "database": "aws-e-study-db",
    "host": "aws-demo-database.cuhlitui3bjy.ap-southeast-1.rds.amazonaws.comnp",
    "dialect": "mysql"
  },

# 关于名词定义
用户  user
房间  room
好友  friend
学习  study
学习时长 studying_duration
单/每日学习时长 daily_duration

daily_duration

# User 
# 用户

1. id 
  Integer 
  # 主键
2. name 
  String 
  用户昵称
3. gender
  Integer
  性别 0女 1男
4. avatar
  String
  头像url
5. time_zone
  String
  'UTC+8'等
  用于区分不同时区的用户，暂不设计
6. daily_duration 
  Array
  对象数组，key值为秒级时间戳 (对应唯一的日期)，value值为秒级时间戳 (对应学习时长)
  [
    {
      1623450000: 3600
    }
  ]
  用户每日学习时长
7. friend_list
  Array
  储存好友id
8. room_list
  Array
  储存自己创建的自习室id
9. recent_room_list
  储存最近常去的自习室id（不限于自己创建的）
10. customization
  Array
  用于用户自定义设置相关
  [
    {
    room_background_url: String, 用于储藏用户自定义的房间背景
    ...
    }
  ]
11. 



# Room
# 房间

1. id
  Integer
  # 主键
2. name
  String
  房间名称
3. owner
  Integer
  # 外键
  房间创建者id
4. white_list
  Array
  用于储藏用户id
  房间白名单，名单内用户可随时加入房间
5. black_list
  Array
  用于储藏用户id
  房间黑名单，名单内用户不可以加入房间
6. room_number
  Integer
  生成唯一的房间号，用于前台展示和用户搜索
7. passward
  String
  加入房间所用的密码
8. daily_liveness
  Array
  用于储藏用户id，每日清零
  用于记录房间单日用户活跃数
9. volume
  Integer
  房间可容纳最大人数
10. current_users
  Array
  用于储藏用户id
  用于表示房间内实时人数



# studying_duration
# 学习时段

1. id
  # 主键
2. user_id
  # 外键
  Integer
  用于绑定一个用户id
3. start_time
  Date
  秒级时间戳
  用于表示一个学习时段的开始时刻
4. end_time
  Date
  秒级时间戳
  用于表示一个学习时段的结束时刻
5. room_id
  Integer
  用于绑定一个房间id
6. interruption
  Array
  用于储藏学习过程中切出程序的操作

# 




