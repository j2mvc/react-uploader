import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// 上传组件 
import {Upload,UploadDialog} from './Uploader'

const Example = () => {

  const [url, setUrl] = useState('')
  const [open, setOpen] = useState(false)
  const buttonStyle:React.CSSProperties = {
    padding:'10px 20px'
  }
  return <div>
    <h1>React Upload Demo</h1>
    <h2>Full Upload ui,may be used in Form.</h2>
    <div>
    {Upload({
      type: 'image',
      defaultUrl: '',
      onChange: (props: any) => {
        const { attach, url } = props
        setUrl(attach && attach.url || url)
      }
    })}
    </div>
    <div><img src={url} height={120}/></div>
    <h1>React Upload Dialog</h1>
    <button style={buttonStyle} onClick={()=>{setOpen(true)}}>Upload Images</button>
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
  </div>
}

ReactDOM.render(<Example />,
  document.getElementById('app')
);
