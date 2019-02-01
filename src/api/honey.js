import request from '@/utils/ajax'

//兑换蜂蜜
export function toExchangeHoney(params) {
  return request({
    url: '/beec/wx/toExchangeHoney',
    method: 'post',
    data: params
  });
}
// 获取人员信息
export function queryUserInfo(params) {
  return request({
    url: '/beec/wx/queryUserInfo',
    method: 'post',
    data: params
  });
}




