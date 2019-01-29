import request from '@/utils/ajax'
// 查询首屏配置信息
export function querySystemResources() {
  return request({
    url: '/beec/wx/querySystemResources',
    method: 'post'
  });
}


//课程查询
export function queryCourse(params) {
  return request({
    url: '/beec/wx/queryCourse',
    method: 'post',
    data: params
  });
}

//课程查询
export function querySectionForC(params) {
  return request({
    url: '/beec/wx/querySectionForC',
    method: 'post',
    data: params
  });
}

//通过课程id查询课程信息
export function queryCourseById(params) {
  return request({
    url: '/beec/wx/queryCourseById',
    method: 'post',
    data: params
  });
}
//提交成绩；
export function submitGrade(params) {
  return request({
    url: '/beec/wx/addStudyCompleteInfo',
    method: 'post',
    data: params
  });
}
//检验是否购买了某课程
export function checkTradingstate(params) {
  return request({
    url: '/beec/wx/checkTradingstate',
    method: 'post',
    data: params
  });
}
