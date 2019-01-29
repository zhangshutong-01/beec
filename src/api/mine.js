import request from '@/utils/ajax'

//获取用户信息
export function honeyAndMoneyInfo(params) {
  return request({
    url: '/beec/wx/queryHoneyAndMoneyInfo',
    method: 'post',
    data: params
  })
}
//用户订单信息分页查询
export function orderInfor(params) {
  return request({
    url: '/beec/wx/queryOrderInfo',
    method: 'post',
    data: params
  })
}
//获取最新十条邀新记录；
export function inviteRecord(params) {
  return request({
    url: '/beec/wx/queryNumOfInvitations',
    method: 'post',
    data: params
  })
}
//获取最新海报所需信息
export function newPoster(params) {
  return request({
    url: '/beec/wx/toGeneratingPoster',
    method: 'post',
    data: params
  })
}
//分享海报得蜂蜜；是否成功分享海报
export function toShare(params) {
  return request({
    url: '/beec/wx/toShare',
    method: 'post',
    data: params
  })
}
//获取蜂蜜变更记录信息；
export function honeyRecord(params) {
  return request({
    url: '/beec/wx/queryHoneyRecord',
    method: 'post',
    data: params
  })
}
//记录页面是否刷新信息；
export function isused(params) { //usable
  return request({
    url: '/beec/wx/isused?' + params,
    method: 'get',
    data: params
  })
}

// 更新宝宝信息

export function addBabyInfo(params) { //usable
  return request({
    url: '/beec/wx/addBabyInfo',
    method: 'post',
    data: params
  })
}
