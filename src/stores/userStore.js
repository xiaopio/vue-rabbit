import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user'
import { useCartStore } from '@/stores/cartStore'

export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()

  const userInfo = ref({})

  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({
      account,
      password
    })
    userInfo.value = res.result
  }
  // 退出登录
  const clearUserInfo = () => {
    userInfo.value = {}
    cartStore.clearCart()
  }

  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
},
  {
    // 持久化保存
    persist: true
  })
