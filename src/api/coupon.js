import request from '@/utils/ajax'

//现金券查询接口
export function queryCouponInfo(params) {
  return request({
    url: '/beec/wx/queryCouponInfo',
    method: 'post',
    data: params
  });
}

//选择代金券接口
export function selectDJJ(params) {
  return request({
    url: '/beec/wx/selectDJJ',
    method: 'post',
    data: params
  });
}







