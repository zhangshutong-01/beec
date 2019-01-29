import request from '@/utils/ajax'


//注册
export function register(params) {
  return request({
    url: '/beec/wx/saveBabyInfo',
    method: 'post',
    data:params
  })
}


