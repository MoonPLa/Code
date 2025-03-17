const db = require('../mysql/db')

exports.getUserInfo = (req, res) => {

    const sql = 'select * from users'

    db.query(sql, (error, result) => {
        if (error) return res.send({ status: 201, message: error.message })

        if (result.length < 0) {
            return res.send({
                status: 201,
                messae: '获取用户列表数据失败！'
            })
        } else {
            res.send({
                status: 200,
                message: '获取用户列表数据失败！',
                data: result
            })
        }
    })
}