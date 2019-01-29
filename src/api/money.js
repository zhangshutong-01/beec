import request from '@/utils/ajax'

// 购买课程查询
export function queryAllCourseByPayStatus(params) {
  return request({
    url: '/beec/wx/queryAllCourseByPayStatus',
    method: 'post',
    data: params
  });
}