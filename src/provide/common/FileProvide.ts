import * as actions from '../../store/actions/common/file'
import * as types from '../../types/app'

export type FileUploadProps = {
  apiUrls:types.ApiUrls,
  type:string,
  success:(props?:any)=>void,
  failure?:(message?:any)=>void,
  data:any,
  onProgress?:any
}
/**
 * 组织逻辑
 */
export const makeFileProvide = (dispatch: Function) => {

  // 上传
  const upload = (props: FileUploadProps) => {
    const { apiUrls,type,success, failure, data,onProgress } = props
    
  const getUploadUrl = (type: string) => {
    if (type === 'images' || type === 'image') {
      return apiUrls.uploadImage
    } else if (type === 'medias' || type === 'media') {
      return apiUrls.uploadMedia
    } else if (type === 'videos' || type === 'video') {
      return apiUrls.uploadVideo
    } else if (type === 'audios' || type === 'audio') {
      return apiUrls.uploadAudio
    } else if (type === 'flashes' || type === 'flash') {
      return apiUrls.uploadFlash
    } else {
      return apiUrls.uploadFile
    }
  }

    // 提交redux
    dispatch(actions.upload(getUploadUrl(type),data,onProgress)).then((res: any) => {
      const data = res.payload && res.payload.data;
      if (data && data.code === 1) {
        // 成功返回
        if (success)
          success(data.result.attaches)
      } else {
        // 失败返回
        if(failure){
          const message = data && data.message || '上传失败'
          failure(message)
        }
      }
    })
  }
  // 返回实时信息提交页面处理
  return {
    upload
  }
}
