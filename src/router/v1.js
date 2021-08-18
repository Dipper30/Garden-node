
const express = require('express')
const router = express.Router()
const RoomController = require('../controller/v1/Room')
const UserController = require('../controller/v1/User')
const AccountController = require('../controller/Account')
const ClockController = require('../controller/v1/Clock')
const SettingController = require('../controller/v1/Setting')
const StudyDurationService = require('../service/StudyDuration')



// const user = new UserController()

// account
router.post('/checkAccount', AccountController.checkAccount)
router.post('/register', AccountController.register)
router.post('/login', AccountController.login)

// user
router.get('/user/:id', UserController.getUserByID)
router.post('/updateUser', UserController.updateUser)
// router.post('/user', UserController.createUser)

// clock
router.get('/clock', AccountController.checkAccount)
router.post('/clock', ClockController.createClock)

// 房间类型
router.get('/rooms', RoomController.getAllRooms)
router.get('/room/:id', RoomController.getRoomByID)
router.get('/usersInRoom/:id', RoomController.getCurrentUsersByRoomID)
router.post('/room', RoomController.createRoom)

// 操作类型
router.post('/enterRoom', RoomController.enterRoom)
router.post('/leaveRoom', RoomController.leaveRoom)

// 设置操作
router.post('/report', SettingController.report)


// 零点操作（非常规操作，平时不调用）
router.post('/calculateStudyDuration', StudyDurationService.calculateStudyDuration)
module.exports = router