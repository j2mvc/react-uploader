import { AxiosRequestConfig } from 'axios';


// Action Types
export type Action = {
  // 上传
  type: 'COMMON_UPLOAD',
  payload: {
    client: 'default',
    request: AxiosRequestConfig
  }
};


/** 获取appToken  */
export const UPLOAD = 'COMMON_UPLOAD';
export const upload = (url: string,  data: any, onProgress: Function): Action => ({
  type: UPLOAD,
  payload: {
    client: 'default',
    request: {
      url: `${url}`,
      method: 'POST',
      // `onUploadProgress` 允许为上传处理进度事件
      onUploadProgress: function (event:any) {
        // 对原生进度事件的处理
        if (onProgress) {
          onProgress(event)
        }
      },
      // `onDownloadProgress` 允许为下载处理进度事件
      // onDownloadProgress: function (progressEvent) {
      //   // 对原生进度事件的处理
      // },
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data
    }
  }
})