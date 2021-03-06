import axios from 'axios'
import store from '@/vuex/store.js'
import router from '../router'

const service = axios.create();
// service.defaults.baseURL = (process.env.NODE_ENV == 'development' ? '/api' : 'http://test-yunying.coolmath.cn');
service.defaults.baseURL = (process.env.NODE_ENV == 'development' ? '/api' : 'http://test-yunying.coolmath.cn');
service.defaults.headers.post['Content-Type'] = 'application/json';
service.defaults.timeout = 5000;

// 请求拦截
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //store.commit('SET_LOADING',true);
  // 如果有token,添加到请求报文 后台会根据该报文返回status
  if (store.state.login.token) {
    config.headers.Authorization = `token ${store.state.login.token}`;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  console.log('网络错误,请稍后再试');
  // store.commit('SET_LOADING',false);
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 加到时器主要是为了 展示Loading效果 项目中应去除
  setTimeout(() => {
    // store.commit('SET_LOADING',false);
  }, 300)
  return response;
}, function (error) {
  // 对响应错误做点什么
  // store.commit('SET_LOADING',false);
  // console.log(error)
  if (error.response) {
    if (error.response.status == 401) {
      // 如果返回401 即没有权限，跳到登录页重新登录
      store.commit('CHANGE_TOKEN', 0);
      console.log('请重新登录');
      router.replace({
        path: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
  }
  return Promise.reject(error);
});

export default service
