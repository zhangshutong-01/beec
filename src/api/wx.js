import request from '@/utils/ajax'

//微信分享
export function share(params) {
  return request({
    url: '/beec/wx/getShareInfo',
    method: 'post',
    data: params
  });
}

//微信授权
export function authorize(params) {
  return request({
    url: '/beec/wx/authorize?'+params,
    method: 'get',
   // data: params
  });
}

//微信支付成功后页面重新加载
export function reload(params) {
  return request({
    url: '/beec/wx/reload',
    method: 'post',
    data: params
  });
}




