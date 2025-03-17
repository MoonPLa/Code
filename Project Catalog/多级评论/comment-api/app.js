// express
const express = require('express')
const app = express()

// 解决跨域问题
const cors = require('cors')
app.use(cors())

// 解析表单数据
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// 路由
const userRouter = require('./router/user')
app.use('/user', userRouter)
const commentRouter = require('./router/comment')
app.use('/api', commentRouter)

// 监听
app.listen(8080, () => {
    console.log('express server at running http://localhost:8080/')
})