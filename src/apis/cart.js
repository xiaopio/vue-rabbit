// 购物车相关接口
import request from '@/utils/http'
// 加入购物车
export const insertCartAPI = ({ skuId, count }) => {
  return request({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count
    }
  })
}

// 获取购物车列表
export const findCartListAPI = () => {
  return request({
    url: '/member/cart'
  })
}
