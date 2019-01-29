import request from '@/utils/ajax'

//创建订单
export function createOrderInfo(params) {
  return request({
    url: '/beec/wx/createOrderInfo',
    method: 'post',
    data: params
  });
}

//确认支付
export function payOrderInfo(params) {
  return request({
    url: '/beec/wx/payOrderInfo',
    method: 'post',
    data: params
  });
}
//判断用户是否关注公众号
export function checkConcerned(params) {
  return request({
    url: '/beec/wx/checkConcerned',
    method: 'post',
    data: params
  })
}
