// 封装购物车模块
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { insertCartAPI, findCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
  // 获取最新购物车数据
  const getNewCartList = async () => {
    const res = await findCartListAPI()
    cartList.value = res.result
  }
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  // state: 购物车
  const cartList = ref([])
  // action: 加入购物车
  const addCart = async (goods) => {
    if (isLogin.value) {
      // 登录了，添加购物车接口
      await insertCartAPI({ skuId: goods.skuId, count: goods.count })
      // 获取最新购物车数据
      getNewCartList()
    } else {
      // 1. 判断购物车中是否有该商品
      const item = cartList.value.find(item => goods.skuId === item.skuId)
      if (item) {
        // 2. 如果有，数量加1
        item.count++
      } else {
        // 3. 如果没有，添加新的商品
        cartList.value.push(goods)
      }
    }
  }

  // action: 删除购物车
  const delCart = async (skuId) => {
    if (isLogin.value) {
      // 登录状态 调用删除接口
      await delCartAPI([skuId])
      // 获取最新购物车数据
      getNewCartList()
    } else {
      // 1. 找到要删除的索引
      const index = cartList.value.findIndex(item => item.skuId === skuId)
      // 2. 删除
      if (index !== -1) {
        cartList.value.splice(index, 1)
      }
    }
  }
  // 计算属性
  // 1. 购物车中商品数量
  const allCount = computed(() => cartList.value.reduce((pre, item) => pre + item.count, 0))
  // 2. 购物车中商品总价
  const allPrice = computed(() => cartList.value.reduce((pre, item) => pre + item.count * item.price, 0))

  // 单选功能
  const singleSelect = (skuId, selected) => {
    // 1. 找到要修改的项
    const item = cartList.value.find(item => item.skuId === skuId)
    // 2. 修改选中状态
    if (item) {
      item.selected = selected
    }
  }

  // 选中的商品数量
  const checkedCount = computed(() => cartList.value.filter(item => item.selected).reduce((pre, item) => pre + item.count, 0))
  // 选中的商品总价
  const checkedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((pre, item) => pre + item.count * item.price, 0))

  // 是否全选
  const isAllSelect = computed(() => cartList.value.every(item => item.selected))

  // 全选功能
  const selectAll = (selected) => {
    cartList.value.forEach(item => item.selected = selected)
  }

  // 清除购物车
  const clearCart = () => {
    // 删除所有商品
    cartList.value = []
  }



  return {
    cartList,
    allCount,
    allPrice,
    checkedCount,
    checkedPrice,
    isAllSelect,
    addCart,
    delCart,
    singleSelect,
    selectAll,
    clearCart,
    getNewCartList
  }
},
  {
    persist: true
  }
)
