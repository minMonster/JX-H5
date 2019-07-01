import axios from 'axios';

const service = axios.create({
  baseURL: 'http://111.230.139.130:8090', // 请求地址
  timeout: 20000 // request timeout
});

export default service;
