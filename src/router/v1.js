
const express = require('express')
const router = express.Router()

const User = require('../controller/v1/User')
const Account = require('../controller/Account')
const Clock = require('../controller/v1/Clock')
const Setting = require('../controller/v1/Setting')

const UserController = new User()
const AccountController = new Account()
const ClockController = new Clock()
const SettingController = new Setting()




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
router.get('/clock', ClockController.getClocksByUID)
router.post('/clock', ClockController.createClock)
router.post('/deleteClock', ClockController.deleteClock)


// 设置操作
router.post('/report', SettingController.report)

module.exports = router