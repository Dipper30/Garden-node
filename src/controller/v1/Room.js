const BaseController = require('../BaseController')
const ParameterException = require('../../exceptions/ParameterException')
const RoomValidator = require('../../validator/RoomValidator')
const RoomModel = require('../../model/Room')
const TokenService = require('../../service/Token')
const TokenException = require('../../exceptions/TokenException')
const EnterRoomValidator = require('../../validator/EnterRoomValidator')
const RoomException = require('../../exceptions/RoomException')
const LeaveRoomValidator = require('../../validator/LeaveRoomValidator')
const IDMustBePositiveInteger = require('../../validator/IDMustBePositiveInteger')


class Room extends BaseController {
  constructor () {
    super()
  }

  async createRoom (req, res, next) {
    try {
      const Token  = new TokenService(req.headers.token)
      if (!Token.verifyToken()) throw new TokenException()

      let valid = new RoomValidator(req.body)
      if (!valid.goCheck()) throw new ParameterException()

      const room = await RoomModel.createRoom(req.body)
      if(!room) throw new Error('未知错误')

      res.json({
        code: 201,
        data: room,
        msg: 'success'
      })
    } catch (error) {
      next(error)
    }
  }

  async getAllRooms (req, res, next) {
    try {
      const Token  = new TokenService(req.headers.token)
      if (!Token.verifyToken()) throw new TokenException()

      const room = await RoomModel.getAllRooms()
      if(!room) throw new RoomException('未知错误')
      
      res.json({
        code: 200,
        data: room,
        msg: 'success'
      })
    } catch (error) {
      next(error)
    }
  }

  async getRoomByID (req, res, next) {
    try {
      const Token  = new TokenService(req.headers.token)
      if (!Token.verifyToken()) throw new TokenException()

      let valid = new IDMustBePositiveInteger(req.params)
      if (!valid.goCheck()) throw new ParameterException()      

      const room = await RoomModel.getRoomByID(req.params)
      if(!room) throw new RoomException('未知错误')
      
      res.json({
        code: 200,
        data: room,
        msg: 'success'
      })
    } catch (error) {
      next(error)
    }
  }

  async getCurrentUsersByRoomID (req, res, next) {
    try {
      const Token  = new TokenService(req.headers.token)
      if (!Token.verifyToken()) throw new TokenException()

      let valid = new IDMustBePositiveInteger(req.params)
      if (!valid.goCheck()) throw new ParameterException()      

      const room = await RoomModel.getRoomByID(req.params)
      if(!room) throw new RoomException('未知错误')

      const users = await RoomModel.getCurrentUsers(room.current_users)
      if (!users) throw new RoomException('error in finding users')
      
      res.json({
        code: 200,
        data: users,
        msg: 'success'
      })
    } catch (error) {
      next(error)
    }
  }

  async enterRoom (req, res, next) {
    try {
      const Token  = new TokenService(req.headers.token)
      if (!Token.verifyToken()) throw new TokenException()

      let valid = new EnterRoomValidator(req.body)
      if (!valid.goCheck()) throw new ParameterException() 

      const entered = await RoomModel.enterRoom(req.body)
      if ( entered === 50005 ) throw new RoomException('密码错误', 50005)
      
      const { room, users } = entered
      if( !room || !users ) throw new RoomException('加入失败', 50003)
      
      res.json({
        code: 200,
        data: {room, users},
        msg: 'success'
      })
    } catch (error) {
      next(error)
    }
  }

  async leaveRoom (req, res, next) {
    try {
      const Token  = new TokenService(req.headers.token)
      if (!Token.verifyToken()) throw new TokenException()

      let valid = new LeaveRoomValidator(req.body)
      if (!valid.goCheck()) throw new ParameterException() 

      const result = await RoomModel.leaveRoom(req.body)
      if( !result ) throw new RoomException('离开失败', 50004)

      res.json({
        code: 200,
        msg: 'success'
      })
    } catch (error) {
      next(error)
    }
  }

}

module.exports = new Room()