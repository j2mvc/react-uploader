
import axios from 'axios'

// 创建一个 axios 实例
const createService = (headers:any)=>{
  return axios.create({
    baseURL: '',
    responseType: 'json',
    timeout: 5000,
    headers
  })
} 
/**
 * get数据
 * @param url
 * @param params
 * @param cache
 * @returns {Promise<*>}
 */
export const httpGet = (props:any) => {
  const {  headers,url, params } = props
  const service = createService(headers)
  return service({
    url,
    method: 'get',
    params
  })
}
/**
 * 提交数据
 * @param url
 * @param data
 * @param cache
 * @returns {*}
 */
export const httpPost = (props:any) => {
  const { headers,url, data } = props
  const service = createService(headers)
  return service({
    url,
    method: 'post',
    data
  })
}