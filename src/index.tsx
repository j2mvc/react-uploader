import React, { useEffect,useState } from 'react';
import UploadComponent from './components/ui/upload';

import { ThemeProvider } from '@material-ui/styles';
import * as Themes from './config/Themes';
import UploadDialogComponent from './components/ui/upload';

import { makeConfigProvide } from './provide/ConfigProvide'
import * as types from './types/app'
import * as commonTypes from './types/common'


// 上传组件弹框接受参数
export type UploadDialogProps = {
  themeName?:string,// 主题名称
  locale?: string,// 语种：en|zh默认为zh
  headers?: any,// 请求头
  apiUrls?: types.ApiUrls,// 上传组件所用接口地址
  attachPrefix?: string,// 附件前缀
  // 以下为上传组件使用参数
  open: boolean, // 打开弹框true|false
  success: Function, // 成功返回attach|attaches|url
  onClose: Function,// 关闭弹框事件
  type: string, // 文件类型：image|images|file|files,video|videos|audio|audios|flash|flashes
  attaches?: commonTypes.Attach[], // 预设附件列表
  url?: string, // 传入预设url
  fromEditor?: boolean// 从编辑器调用上传器 
}
// 上传组件接受参数
export type UploaderProps = {
  themeName?:string,// 主题名称
  locale?: string,// 语种：en|zh默认为zh
  headers?: any,// 请求头
  apiUrls?: types.ApiUrls,// 上传组件所用接口地址
  attachPrefix?: string,// 附件前缀
  // 以下为上传组件使用参数
  type: string,// 文件类型：image|images|file|files,video|videos|audio|audios|flash|flashes
  onChange: Function, // 改变值，返回{attach|attaches|url}
  cancel?: Function, // 取消动作
  defaultUrl?: string,// 传入预设url
  defaultUrls?: string[], // 传入预设urls
  defaultAttach?: commonTypes.Attach,// 预设附件
  defaultAttaches?: commonTypes.Attach[]// 预设附件列表
}

export const Upload = (props: UploaderProps) => {
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
      loaded:(config:types.Config)=>{
        setTheme(config.theme)
      }
    })
  },[])
  return <ThemeProvider theme={theme}>
     <UploadComponent {...rest} />
  </ThemeProvider>
}
export const UploadDialog = (props: UploadDialogProps) => {
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
  initConfig({
    headers,
    apiUrls,
    locale,
    attachPrefix,
    themeName,
    loaded:(config:types.Config)=>{
      setTheme(config.theme)
    }
  })
  return <ThemeProvider theme={theme}>
    <UploadDialogComponent  {...rest} />
</ThemeProvider>
}
export default Upload