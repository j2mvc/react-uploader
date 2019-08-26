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