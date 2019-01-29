import request from '@/utils/ajax'

//查询当前团购信息
export function queryGroupDetails(params) {
  return request({
    url: '/beec/wx/queryGroupDetails',
    method: 'post',
    data: params
  });
}






