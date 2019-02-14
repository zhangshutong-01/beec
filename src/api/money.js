import request from '@/utils/ajax'

// 购买课程查询
export function queryAllCourseByPayStatus(params) {
  return request({
    url: '/beec/wx/queryAllCourseByPayStatus',
    method: 'post',
    data: params
  });
}

// 查询账户金额信息
export function queryAccountAmount(params) {
  return request({
    url: '/beec/wx/queryAccountAmount',
    method: 'post',
    data: params
  });
}

// 个人奖励金级联查询接口
export function queryAmountList(params) {
  return request({
    url: '/beec/wx/queryAmountList',
    method: 'post',
    data: params
  });
}

// 获取海报信息
export function queryPostInfo(params) {
  return request({
    url: '/beec/wx/queryPostInfo',
    method: 'post',
    data: params
  });
}

// 微信提款
export function withdrawCash(params) {
  return request({
    url: '/beec/wx/withdrawCash',
    method: 'post',
    data: params
  })
}

// 提现流水

export function queryWithdrawCashLog(params) {
  return request({
    url: '/beec/wx/queryWithdrawCashLog',
    method: 'post',
    data: params
  })
}
