// createRouter：创建路由实例
// createWebHistory：创建 history 模式的路由
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 配置path和component的映射关系的位置
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          // 默认二级路由，path配置项置空
          path: '',
          name: 'home',
          component: Home,
        },
        {
          path: 'category/:id',
          name: 'category',
          component: Category,
        },
        {
          path: 'category/sub/:id',
          name: 'subCategory',
          component: SubCategory,
        },
        {
          path: 'detail/:id',
          name: 'detail',
          component: Detail,
        },
        {
          path: 'cartlist',
          name: 'cartlist',
          component: CartList,
        }
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
  // 路由滚动行为定制
  scrollBehavior(to) {
    if (to.name === 'category') {
      return {
        top: 700,
        behavior: 'smooth',
      }
    }
    return {
      top: 0,
      behavior: 'smooth',
    }
  },
})

export default router
