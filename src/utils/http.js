// axios基础封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'

import { useUserStore } from '@/stores/userStore'
import router from '@/router'

const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 50000
})

// 拦截器

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 从pinia中获取token数据
  const userStore = useUserStore()
  // 按照后端要求拼接token数据
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  const userStore = useUserStore()
  // 统一错误提示
  ElMessage.error(e.response.data.message)
  // 401token失效处理
  if (e.response && e.response.status === 401) {
    // 1、清除本地用户数据
    userStore.clearUserInfo()
    // 2、跳转到登录页面，同时记录当前路径用于登录后跳转回来
    router.push('/login')
  }

  return Promise.reject(e)
})

export default httpInstance
