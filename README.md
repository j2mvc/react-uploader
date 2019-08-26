# react-uploader

### quick start 
```
npm install --save j2mvc-react-uploader
```
### import
```
import { Upload as UploadComponent ,UploadDialog as UploadDialogComponent } from '../../src'

```
### create whole component as Uploader.tsx or Uploader.js 
```
export  const Upload = (props: any) => {

    return UploadComponent({
      headers: {
        'App-Id': appId,
        'User-Token': token
      },
      attachPrefix,
      apiUrls: {
        getAttachList: `${API}attach/getList`,
        getAttachListByUrls: `${API}attach/getListByUrls`,
        getGroupList: `${API}attach/group/getList`,
        saveGroup: `${API}attach/group/save`,
        removeGroup: `${API}attach/group/del`,
        removeAttach: `${API}file/delAttaches`,
        moveAttach: `${API}attach/move`,
        uploadImage: `${API}file/uploadImage`,
        uploadMedia: `${API}file/uploadMedia`,
        uploadVideo: `${API}file/uploadVideo`,
        uploadAudio: `${API}file/uploadAudio`,
        uploadFlash: `${API}file/uploadFlash`,
        uploadFile: `${API}file/uploadFile`,
      },
      ...props
    })
  }
  
export  const UploadDialog = (props: any) => {

    return UploadDialogComponent({
      headers: {
        'App-Id': appId,
        'User-Token': token
      },
      attachPrefix,
      apiUrls: {
        getAttachList: `${API}attach/getList`,
        getAttachListByUrls: `${API}attach/getListByUrls`,
        getGroupList: `${API}attach/group/getList`,
        saveGroup: `${API}attach/group/save`,
        removeGroup: `${API}attach/group/del`,
        removeAttach: `${API}file/delAttaches`,
        moveAttach: `${API}attach/move`,
        uploadImage: `${API}file/uploadImage`,
        uploadMedia: `${API}file/uploadMedia`,
        uploadVideo: `${API}file/uploadVideo`,
        uploadAudio: `${API}file/uploadAudio`,
        uploadFlash: `${API}file/uploadFlash`,
        uploadFile: `${API}file/uploadFile`,
      },
      ...props
    })
  }
}
```
### used in some form page,example now we create file ImageInput.tsx

```
  import {Upload} from './Uploader'
  ...
  const [url, setUrl] = useState('')
  return <div>
    <h1>React Upload Demo</h1>
    <h2>Full Upload ui,may be used in Form.</h2>
    {Upload({
      type: 'image',
      defaultUrl: '',
      onChange: (props: any) => {
        const { attach, url } = props
        setUrl(attach && attach.url || url)
      }
    })}
    Result:{url}
  </div>
```

### aslo , now we open dialog by button.
```
  import {UploadDialog} from './Uploader'
  
  ...
  const [open, setOpen] = useState(false)
  return <div>
    <h1>React Upload Demo</h1>
    <h2>Full Upload ui,may be used in Form.</h2>
    {Upload({
        open,
        type: 'images',
        defaultAttaches: [],
        success: (props: any) => {
            console.log(props)
            setOpen(false)
        },
        onClose:()=>{
            setOpen(false)
        }
    })}
    Result:{url}
  </div>
```
### the Upload component receive two Props,below
```

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
```

