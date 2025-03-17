import request from '../util/request'

// 查询评论列表
export function selectCommentsAPI() {
    return request({
        url: '/api/comments/list',
        method: 'get'
    })
}

// 发布评论
export function publishCommentAPI(publishInfo) {
    return request({
        url: '/api/comments',
        method: 'post',
        data: {
            content: publishInfo.content,
            user_id: publishInfo.user_id,
            parent_id: publishInfo.parent_id,
        }
    })
}

// 回复评论
export function replyCommentAPI(replyInfo) {
    return request({
        url: '/api/comments/reply',
        method: 'post',
        data: {
            content: replyInfo.content,
            user_id: replyInfo.user_id,
            parent_id: replyInfo.parent_id,
        }
    })
}