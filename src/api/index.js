import axios from 'axios'
import * as auth from '@/common/auth'

const service = axios.create({
  baseURL: 'http://122.14.208.91:8090', // 请求地址
  timeout: 20000, // request timeout
  withCredentials: true
})

// request interceptor
service.interceptors.request.use(config => {
  // add token
  if (auth.getToken()) {
    config.headers['token'] = auth.getToken()
  }
  // todo 因为同源策略
  // config.headers['Accept'] = 'application/vnd.sd.v2+json'
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    // eslint-disable-next-line no-console
    console.log(response)
    if (response.data.code === 500000) {
      return Promise.reject(response.data)
    }
    return response.data
  }
)
export default service
