# vue-router（路由）
    1. 创建router目录，index文件

        // 引入路由
        import { createRouter,createWebHashHistory } from 'vue-router'

        // 引入组件
        import Test from '../views/Test/index.vue'

        // 创建路由实例对象并导出
        const router = createRouter({
            history: createWebHashHistory(),
            routes: [
                {
                    path: '/',
                    component: Test,
                }
            ]
        })

        export default router

    2. main.js： 引入路由并使用

    import router from './router/index'
    app.use(router)

# pinia (vuex)
    1. 创建store目录，文件名自拟

    // 引入pinia
    import { defineStore } from 'pinia' 

    // 创建并导出一个store
    export const useTestStore = defineStore('test', () => {
        // 代码逻辑
    })

    2. main.js：引入pinia并使用
    import { createPinia } from 'pinia'
    app.use(createPinia())

    3. 使用：
    
    import { useTestStore } from '../../store/test.js
    const testStore = useTestStore()

# axios的基础封装

    1. 创建util工具类，文件名自拟

        // 引入axios
        import axios from 'axios'

        const $http = axios.create({
            // 请求地址
            baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
            // 响应时间
            timeout: 5000
            ...
        })

        // 拦截器...

        export default $http

# api接口封装

    1. 创建apis目录，文件名自拟

    // 引入axios工具类
    import $http from '../utils/http'

    // 获取轮播图
    export function getBannerAPI() {
        return $http({
            url: '/home/banner'
        })
    } 

    2. 使用：

    import { getBannerAPI } from '../../apis/home.js'
    const bannerList = ref([])
 
    // 获取轮播图数据
    const getBanner = async() => {
        const res = await getBannerAPI()
        bannerList.value = res.data.result
    }

    // 初始化调用
    onMounted(() => {
      getBanner()
    })

# 懒加载指令插件

    1. 创建directives目录，index文件

    // 定义懒加载插件
    import { useIntersectionObserver } from '@vueuse/core'

    export const lazyPlugin = {
        install(app) {
            // 全局指令注册
            app.directive('lazy', {
                mounted(el,binding) { 
                    // 图片懒加载的核心逻辑
                    const { stop } = useIntersectionObserver( el, ([{isIntersecting}]) => {
                            if (isIntersecting) {
                                // 进入视口区域发起网络请求
                                el.src = binding.value
                                stop()
                            }
                        }
                    )
                }
            })
        }
    }

    2. main.js:

    // 引入懒加载指令插件
    import { lazyPlugin } from '../src/directives/index'
    app.use(lazyPlugin)

    3. 使用：v-lazy="xxx"