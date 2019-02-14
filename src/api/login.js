export function login(params) {
  return request({
    url: '/beec/wx/withdrawCash',
    method: 'post',
    data: params
  })
}
