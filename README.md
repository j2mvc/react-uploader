# react-uploader
This is an upload component based on @material-ui react-dropzone.
The operation results are as follows:
![Image text](https://raw.githubusercontent.com/j2mvc/react-uploader/master/docs/images/1.png)
![Image text](https://github.com/j2mvc/react-uploader/blob/master/docs/images/3.png?raw=true)
![Image text](https://github.com/j2mvc/react-uploader/blob/master/docs/images/4.png?raw=true)
### Quick start 
you can see example(https://github.com/j2mvc/react-uploader/tree/master/examples).
```
npm install --save j2mvc-react-uploader
```
 
### Declare module
if your project as typescript
add declare code to some file as *.d.ts  
```
 declare module 'j2mvc-react-uploader';
```
### import
```
import Uploader from 'j2mvc-react-uploader'
or
import Uploader from 'j2mvc-react-uploader/src'

```
### Create whole component as Uploader.tsx or Uploader.js 
```
export  const Upload = (props: any) => {

    return Uploader.upload({
      headers: {
        'App-Id': appId,
        'User-Token': token
      },
      attachPrefix,
      apiUrls: {
        getAttachList: `/api/attach/getList`,
        getAttachListByUrls: `/api/attach/getListByUrls`,
        getGroupList: `/api/attach/group/getList`,
        saveGroup: `/api/attach/group/save`,
        removeGroup: `/api/attach/group/del`,
        removeAttach: `/api/file/delAttaches`,
        moveAttach: `/api/attach/move`,
        uploadImage: `/api/file/uploadImage`,
        uploadMedia: `/api/file/uploadMedia`,
        uploadVideo: `/api/file/uploadVideo`,
        uploadAudio: `/api/file/uploadAudio`,
        uploadFlash: `/api/file/uploadFlash`,
        uploadFile: `/api/file/uploadFile`,
      },
      ...props
    })
  }
  
export  const UploadDialog = (props: any) => {

    return Uploader.uploadDialog({
      headers: {
        'App-Id': appId,
        'User-Token': token
      },
      attachPrefix,
      apiUrls: {
        getAttachList: `/api/attach/getList`,
        getAttachListByUrls: `/api/attach/getListByUrls`,
        getGroupList: `/api/attach/group/getList`,
        saveGroup: `/api/attach/group/save`,
        removeGroup: `/api/attach/group/del`,
        removeAttach: `/api/file/delAttaches`,
        moveAttach: `/api/attach/move`,
        uploadImage: `/api/file/uploadImage`,
        uploadMedia: `/api/file/uploadMedia`,
        uploadVideo: `/api/file/uploadVideo`,
        uploadAudio: `/api/file/uploadAudio`,
        uploadFlash: `/api/file/uploadFlash`,
        uploadFile: `/api/file/uploadFile`,
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
    <div><img src={url}/></div>
  </div>
```

### aslo , now we open dialog by button.
```
  import {UploadDialog} from './Uploader'
  ...
  const [open, setOpen] = useState(false)
  return <div>
    ...
    <h1>React Upload Dialog</h1>
    <button onClick={()=>setOpen(true)}>Upload Images</button>
    {UploadDialog({
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
    ...
  </div>
```
### The Upload Component receive two Props,below
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

### Dependencies

###### @material-ui/core
###### @material-ui/icons
###### emotion
###### clsx
###### axios
###### react-dropzone

### Entities
```
Attach {
    id:string;
    url: string;
}
AttachGroup {
    id:string;
    name: string;
}
```
#### Server interface rules 服务器接口规则
##### Api error:
```
{
  data:{
    code:0,               
    message:"wrong message"
  }
}
```
##### Upload Success:
```
{
  data:{
    code:1,
    attaches:Attach[]
  }
}
```
##### AttachList Success:
```
{
  data:{
    code:1,
    list:Attach[]
  }
}
```
##### AttachGroup Success:
```
{
  data:{
    code:1,
    group:AttachGroup
  }
}
```