// 封装和用户相关的接口
import request from '@/utils/http'
export const loginAPI = ({account, password}) => {
  return request({
    url: '/login',
    method: 'POST',
    data: {
      account,
      password
    }
  })
}