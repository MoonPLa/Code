const db = require('../mysql/db')

// 发布评论的处理函数
exports.postComments = (req,res) => {

    const publishInfo = {
        content: req.body.content,
        created_at: new Date(),
        user_id: req.body.user_id,
    }

    const sql = 'insert into comment set ?'

    db.query(sql, publishInfo, (error, result) => {
        
        if (error) return res.send({ status: 201, message: error.message })

        if (result.affectedRows !== 1) {
            return res.send({
                status: 201,
                messae: '发布评论失败！'
            })
        } else {
            res.send({
                status: 200,
                message: '发布评论成功！',
            })
        }
    })
}

// 回复评论的处理函数
exports.postReply = (req,res) => {

    const replyInfo = {
        content: req.body.content,
        created_at: new Date(),
        user_id: req.body.user_id,
        parent_id: req.body.parent_id,
    }

    const sql = 'insert into comment set ?'

    db.query(sql, replyInfo, (error, result) => {

        if (error) return res.send({ status: 201, message: error.message })

        if (result.affectedRows !== 1) {
            return res.send({
                status: 201,
                messae: '回复评论失败！'
            })
        } else {
            res.send({
                status: 200,
                message: '回复评论成功！',
            })
        }
    })
}

// 获取评论列表的处理函数
exports.getCommentList = (req,res) => {

    const sql = 'select * from users a inner join comment b on(a.id = b.user_id)'
    
    db.query(sql, (error, result) => {

        if (error) return res.send({ status: 201, message: error.message })

        if (result.length < 1) return res.send({ status: 201, messae: '获取评论列表失败！' })

        // 定义一个新数组，用于存储转换后的数据
        const newResult = []

        // 遍历原始数据数组，构建具有层级关系的新数组
        result.forEach(item => {
            // 如果当前项没有父级，则直接添加到新数组中
            if (!item.parent_id) newResult.push(item)
            
            // 查找当前项的所有子项
            const parent = result.filter(i => i.parent_id === item.id)
            
            // 如果当前项有子项，则将子项添加到当前项的children属性中
            if (parent.length) item.children = parent
        })

        res.send({
            status: 200,
            message: '获取评论列表成功！',
            data: newResult
        })
        
    })
}