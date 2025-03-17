const express = require('express')

const router = express.Router()

const comment_handler = require('../router_handler/comment.js')

// 发布评论
router.post('/comments', comment_handler.postComments)

// 回复评论
router.post('/comments/reply', comment_handler.postReply)

// 获取评论列表
router.get('/comments/list', comment_handler.getCommentList)

module.exports = router