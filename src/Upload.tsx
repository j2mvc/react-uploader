import React, { useEffect,useState } from 'react';
import UploadComponent from './components/ui/upload';

import { ThemeProvider } from '@material-ui/styles';
import * as Themes from './config/Themes';

import { makeConfigProvide } from './provide/ConfigProvide'
import * as types from './types'
import * as appTypes from './types/app'

export const Upload = (props: types.UploadProps) => {
  // 初始化配置
  const {
    headers,
    apiUrls,
    locale,
    attachPrefix,
    themeName,
    ...rest
  } = props
  const [theme,setTheme] = useState(Themes.defaultTheme)
  const { initConfig } = makeConfigProvide()
  useEffect(()=>{
    initConfig({
      headers,
      apiUrls,
      locale,
      attachPrefix,
      themeName,
      loaded:(config:appTypes.Config)=>{
        setTheme(config.theme)
      }
    })
  })
  
  return <ThemeProvider theme={theme}>
     <UploadComponent {...rest} />
  </ThemeProvider>
}
export default Upload