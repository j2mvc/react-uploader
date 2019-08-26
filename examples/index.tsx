import React, { useState } from 'react'
import { render } from 'react-dom'

const API = "/api/"
const appId = "1234"
const token = "abcd"
const attachPrefix = "http://localhost:8080/sip-api/attaches/"

// 上传组件
import UploaderComponent from '../src'

const Uploader = () => {

  const Upload = (props: any) => {

    UploaderComponent.Upload({
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
}

render(<Uploader />, document.querySelector('#example'))
