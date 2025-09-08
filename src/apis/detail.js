import request from '@/utils/http'

/**
 * 获取商品详情
 * @param {Number} id 商品ID
 * @returns Promise
 */
export const getDetail = (id) => {
  return request({
    url: '/goods',
    params: {
      id
    }
  })
}