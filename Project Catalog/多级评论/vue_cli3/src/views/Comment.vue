<template>
    <div class="container">
        <!-- 发布评论输入框 -->
        <div class="publish">
            <a-textarea placeholder="发一条友善的评论吧~" v-model:value="publishInfo.content" show-count :maxlength="100" />
            <br><a-button type="primary" @click="publish">发布</a-button>
        </div>

        <!-- 一级评论 -->
        <a-comment v-for="item in list" :key="item.id">
            <template #actions>
                <span>{{item.created_at}}</span>
                <span key="comment-nested-reply-to" @click="replyActive(item.id, item.name)">回复</span>
            </template>
            <template #author>
                <a>{{item.name}}</a>&nbsp;&nbsp;
            </template>
            <template #avatar>
                <a-avatar :src="item.avatar" />
            </template>
            <template #content>
                <p>{{item.content}}</p>
            </template>
            <!-- 一级查看回复 -->
            <span v-show="!isLook" v-if="item.children" class="isLook"> 共{{item.children.length}}条回复, <a @click="isLook = !isLook">点击查看</a></span>
            
            <!-- 二级评论 -->
            <div v-show="isLook">
                <a-comment v-show="item.children.length > 0" v-for="i in item.children" :key="i.id">
                    <template #actions>
                        <span>{{i.created_at}}</span>
                        <span key="comment-nested-reply-to" @click="replyActive(i.id, i.name)">回复</span>
                    </template>
                    <template #author>
                        <a>{{i.name}}</a>&nbsp;&nbsp;
                    </template>
                    <template #avatar>
                        <a-avatar :src="i.avatar" />
                    </template>
                    <template #content>
                        <p>{{i.content}}</p>
                    </template> 
                    <!-- 二级查看回复 -->
                    <span v-show="!isSecond" v-if="i.children" class="isLook"> 共{{i.children.length}}条回复, <a @click="isSecond = !isSecond">点击查看</a></span>
                    
                    <!-- 三级评论 -->
                    <div v-show="isSecond">
                        <a-comment v-show="i.children.length > 0" v-for="j in i.children" :key="j.id">
                            <template #actions>
                                <span>{{j.created_at}}</span>
                            </template>
                            <template #author>
                                <a>{{j.name}}</a>&nbsp;&nbsp;
                            </template>
                            <template #avatar>
                                <a-avatar :src="j.avatar" />
                            </template>
                            <template #content>
                                <p>{{j.content}}</p>
                            </template>
                        </a-comment>
                    </div>
                </a-comment>
            </div><hr />
        </a-comment>

        <!-- 回复评论输入框 -->
        <div v-show="isActive">
            <a-textarea :placeholder="`回复 @${publishInfo.name} ：`" v-model:value="replyInfo.content" show-count :maxlength="100" />
            <br><a-button type="primary" @click="reply">回复</a-button>
        </div>
    </div>
</template>

<script setup> 
    import { LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined} from '@ant-design/icons-vue'
    import { selectCommentsAPI, publishCommentAPI, replyCommentAPI } from '../api/comment.js'
    import { ref, reactive, onMounted } from 'vue'
    
    // * 一级评论查看控制器
    const isLook = ref(false)

    // * 二级评论查看控制器
    const isSecond = ref(false)

    // * 回复评论输入框控制器
    const isActive = ref(false)
    
    // * 评论列表
    const list = ref([])

    // 获取评论列表
    const getList = async () => {
        const {data:res} = await selectCommentsAPI()
        list.value = res.data
    } 

    // 发布评论时所需要携带的参数
    const publishInfo = reactive({
        name: '', 
        content: '',
        user_id: 5,
        parent_id: null
    })

    // 发布评论
    const publish = async () => {
        const {data:res} = await publishCommentAPI(publishInfo)

        if (res.status == 201) {
            alert(res.message)
        } else {
            publishInfo.content = ''
            alert(res.message)
            getList()
        }
    }
    
    // 回复评论时所需要携带的参数
    const replyInfo = reactive({
        content: '',
        user_id: 5,
        parent_id: null
    })

    // 获取评论编号
    const replyActive = (id, name) => { 
        isSecond.value = false
        isActive.value = !isActive.value
        sessionStorage.setItem('replyId', id)
        sessionStorage.setItem('replyName', name)
        publishInfo.name = sessionStorage.getItem('replyName')
    }

    // 回复评论
    const reply = async () => {

        replyInfo.parent_id = sessionStorage.getItem('replyId')

        if(replyInfo.user_id == replyInfo.parent_id) {
            replyInfo.content = ''
            isActive.value = false
            return alert('不能回复自己的评论！')
        } else {
            const {data:res} = await replyCommentAPI(replyInfo)
            if (res.status == 201) {
                alert(res.message)
            } else {
                replyInfo.content = ''
                alert(res.message)
                getList()
            }
        }
    }

    // * 初始化获取数据
    onMounted(() => getList())
</script>

<style scoped>
    .container {
        padding: 20px;
    }

    .isLook {
        font-size: 12px;
        color: #9B99A6;
        cursor: pointer;
    }

    .isLook a {
        color:#9B99A6;
        text-decoration: none;
    } 

    .isLook a:hover {
        color:#008AD2;
    }
</style>