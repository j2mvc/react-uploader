import React, { useEffect,useState } from 'react';

import UploadDialogComponent from './components/ui/upload/UploadDialog';

import { makeConfigProvide } from './provide/ConfigProvide'
import * as types from './types'

export const UploadDialog = (props: types.UploadDialogProps) => {
  // 初始化配置
  const {
    headers,
    apiUrls,
    locale,
    attachPrefix,
    themeName,
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
  return <UploadDialogComponent  {...rest} />
}
export default UploadDialog