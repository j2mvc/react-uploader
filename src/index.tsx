import React from 'react';
import FullUpload  from './Upload';
import Dialog from './Dialog';

import { createStore, StoreContext } from './store';
import * as types from './types/app'
import * as commonTypes from './types/common'

// 上传组件弹框接受参数
export type UploadDialogProps = {
  // element:Element,// 引用组件
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
export type UploadProps = {
  // element:Element,// 引用组件
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

export const Upload =  (props: UploadProps)=>{
  const { headers, ...rest } = props
  const store = createStore(headers)
  return <StoreContext.Provider value={store}>
    <FullUpload {...rest} />
  </StoreContext.Provider>
}
// export const UploadDialog =  (props: UploadDialogProps)=>{
//   const { headers, ...rest } = props
//   const store = createStore(headers)
//   return ReactDOM.createPortal(
//     <StoreContext.Provider value={store}>
//       <Dialog {...rest} />
//     </StoreContext.Provider>,
//     element
//   )
// }
export default Upload