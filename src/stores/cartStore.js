// 封装购物车模块
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {

  // state: 购物车
  const cartList = ref([])
  // action: 加入购物车
  const addCart = (goods) => {
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

  // action: 删除购物车
  const delCart = (skuId) => {
    // 1. 找到要删除的索引
    const index = cartList.value.findIndex(item => item.skuId === skuId)
    // 2. 删除
    if (index !== -1) {
      cartList.value.splice(index, 1)
    }
  }

  return {
    cartList,
    addCart,
    delCart
  }
},
  {
    persist: true
  }
)
