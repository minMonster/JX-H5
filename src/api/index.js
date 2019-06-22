import axios from 'axios';
import * as auth from '@/common/auth';

const service = axios.create({
  baseURL: '', // 请求地址
  timeout: 20000 // request timeout
});

// request interceptor
service.interceptors.request.use(config => {
  // add token
  if (auth.getToken()) {
    config.headers['Authorization'] = 'Bearer' + auth.getToken();
  }
  // todo 因为同源策略
  // config.headers['Accept'] = 'application/vnd.sd.v2+json'
  return config;
}, error => {
  Promise.reject(error);
});

export default service;
