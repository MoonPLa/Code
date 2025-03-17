const express = require('express')

const router = express.Router()

const user_handler = require('../router_handler/user.js')

// 获取用户列表
router.get('/info', user_handler.getUserInfo)

module.exports = router