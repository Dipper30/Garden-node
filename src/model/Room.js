const model = require('../../db/models')
const RoomService = require('../service/Room')

class Room {
  constructor () {

  }

  async createRoom (params) {
    let { name, owner_id, password, volume } = params
    // 房间默认最多容纳8人
    if (!volume) volume = 8
    try {
      const room = await model.Room.create({
        name,
        owner_id,
        password,
        volume
      })
      return room
    } catch (error) {
      return null
    }  
  }

  async getAllRooms (params) {
    try {
      const rooms = await model.Room.findAll()
      if ( !rooms || rooms.length == 0 ) return[] 

      // 查询每个房间的创建者信息
      for ( let i = 0 ; i < rooms.length ; i++) {
        const user = await model.User.findOne({
          where: {
            id: rooms[i].owner_id
          }
        })
        rooms[i].owner = user
      } 
      return rooms
    } catch (error) {
      return []
    }  
  }

  async getRoomByID (params) {
    try {
      const { id } = params
      const room = await model.Room.findOne({
        where: {
          id,
        }
      })
      return room
    } catch (error) {
      return []
    }  
  }

  async getCurrentUsers (usersStr) {
    try {
      const current_users = JSON.parse(usersStr)
      const users = await model.User.findAll({
        where: {
          id: current_users
        }
      })
      return users
    } catch (error) {
      return []
    }
  }

  async enterRoom (params) {
    try {
      const { room_id, user_id, password } = params

      const room = await model.Room.findOne({
        where: {
          id: room_id
        }
      })

      // 校验密码
      if (room && room.password && ( !password || password != room.password ) ) {
          return 50005
      }

      if ( !room || !user_id ) return false

      const res = await RoomService.enterRoom(room, user_id)
      if ( !res ) return false

      return  res // { room, user }
      // await model.Room.update({
      //   current_users: 
      // })
    } catch (error) {
      return false
    }
  }

  async leaveRoom (params) {
    try {
      let { room_id, user_id } = params
      const user = await model.User.findOne({
        where: {
          id: user_id
        }
      })

      if ( !room_id ) room_id = user.is_in_room
      const room = await model.Room.findOne({
        where: {
          id: room_id
        }
      })

      if ( !room || !user ) return false

      const res = await RoomService.leaveRoom(room, user)
      if ( !res ) return false

      return  res // { room, user }
    } catch (error) {
      return false
    }
  }
}

module.exports = new Room()