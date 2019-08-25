
import axios from 'axios'

export const createClients = (headers: any) => {

  // 创建一个 axios 实例
  const apiClient = axios.create({
    baseURL: '',
    responseType: 'json',
    timeout: 5000,
  })
  // 请求拦截器
  apiClient.interceptors.request.use(
    function (config:any) {
      if(headers){
        Object.keys(headers).map((key: any) => {
          config[key] = headers[key]
        })
      }
      return config
    },
    function (error:any) {
      // 对请求错误做些什么
      return Promise.reject(error)
    }
  )
  /**
   * 网络请求
   */
  const clients = {
    default: {
      client: apiClient
    }
  }
  return clients
}