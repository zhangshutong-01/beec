import request from '@/utils/ajax'

// 发送验证码
export function getSMSCode(params) {
  return request({
    url: '/beec/wx/getSMSCode',
    method: 'post',
    data: params
  });
}

// 验证验证码
export function checkSMSCode(params) {
  return request({
    url: '/beec/wx/checkSMSCode',
    method: 'post',
    data: params
  });
}
