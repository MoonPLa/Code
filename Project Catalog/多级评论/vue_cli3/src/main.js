// 创建 Vue
import { createApp } from 'vue'

// 引入 App 组件
import App from './App.vue'

// 引入路由器
import router from './router';   
  
// UI: 蚂蚁设计
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

createApp(App)
    .use(Antd)
    .use(router)
    .mount('#app')