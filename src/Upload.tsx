import React, { useEffect} from 'react';
import UploadComponent from './components/ui/upload';
import { makeConfigProvide } from './provide/ConfigProvide'
import * as types from './types'

export const Upload = (props: types.UploadProps) => {
  // 初始化配置
  const {
    headers,
    apiUrls,
    locale,
    attachPrefix,
    ...rest
  } = props
  const { initConfig } = makeConfigProvide()
  useEffect(()=>{
    initConfig({
      headers,
      apiUrls,
      locale,
      attachPrefix
    })
  })
  
  return <UploadComponent {...rest} />
}
export default Upload