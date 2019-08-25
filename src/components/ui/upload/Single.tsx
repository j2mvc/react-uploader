
import React, { useState, useEffect, useMemo } from 'react';

import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import LoadingBox from '../LoadingBox';
import {  MessageDialog } from '../dialog';

import { getConfig } from '../../../storage/ConfigStorage'
import { makeFileProvide } from '../../../provide/common/FileProvide'
import { makeAttachProvide } from '../../../provide/common/attachProvide'

import { useDropzone } from 'react-dropzone';
import SplitButton from '../button/SplitButton';

import * as Accepts from './Accepts'

const baseStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  padding: '20px 40px',
  minWidth: '300px',
  transition: 'border .24s ease-in-out'
};

const activeStyle: React.CSSProperties = {
  borderColor: '#2196f3'
};

const acceptStyle: React.CSSProperties = {
  borderColor: '#00e676'
};

const rejectStyle: React.CSSProperties = {
  borderColor: '#ff1744'
};


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: 0,
      fontSize: '1rem',
      display: 'flex',
      flexDirection: 'row'
    },
    main: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    uploadContainer: {
      margin: theme.spacing(2)
    },
    icon: {
      marginLeft: 5
    },
    progressMessage: {
    },
    footer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    footerText: {
    },
    button: {
      margin: theme.spacing(3, 2, 2, 0),
    },
  }))
const Single = (props: any) => {
  
  const { success, type, defaultGroup, noShowGroup } = props
  // 样式 
  const classes = useStyles()

  const { localeConfig } = getConfig()
  const { getGroupList} = makeAttachProvide()
  const { upload } = makeFileProvide()

  const [groupList,setGroupList] = useState([] as any)
  // 加载分组列表
  useEffect(()=>{
    getGroupList({
      success:(list:any)=>{
        setGroupList(list)
      }, 
      failure:()=>{

      }
    })
  },[])

  // 事件反馈
  const initialMessage = {
    open: false,
    type: '',
    title: '',
    text: ''
  }
  const [message, setMessage] = useState(initialMessage)
  const initialLoading = { open: false, text: 'Loading...' }
  const [loading, setLoading] = useState(initialLoading)

  const [group, setGroup] = useState(defaultGroup);// 选中的分组
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: Accepts.getAccept(type),
    onDrop: acceptedFiles => {
      if (acceptedFiles.length > 1) {
        setMessage({
          open: true,
          type: 'error',
          title: '提示',
          text: '只能选择一个文件'
        })
      } else {
        // 直接上传
        setLoading({
          open: true,
          text: `正在上传${type === 'image' ? '图片' : '文件'}...`
        })
        let data = new FormData()
        data.append('file', acceptedFiles[0])
        if (group) {
          data.append('groupId', group.id)
        }
        upload({
          type,
          data,
          onProgress: (event: any) => {
          },
          success: (attaches: any) => {
            setLoading(initialLoading)
            success(attaches[0])
          },
          failure: (message: string) => {
            setLoading(initialLoading)
            setMessage({
              open: true,
              type: 'error',
              title: '提示',
              text: message
            })
          }
        })
      }
    }
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
      isDragActive,
      isDragReject
    ]);


  return (
    <div className={classes.uploadContainer}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>{localeConfig.words.uploadDrag}</p>
      </div>
      <LoadingBox {...loading} />

      <Box className={classes.footer}>
        {/* 上传到指定分组 */}
        { // 没有特定指定不显示，则显示指定分组按钮
          !noShowGroup && (<>
            <SplitButton
              label={localeConfig.words.uploadToGroup}
              variant="default"
              className={classes.button}
              options={groupList}
              onSelect={(group: any) => {
                setGroup(group)
              }} />
            <Box component="span" className={classes.footerText}>
              {group && group.name}
            </Box>
          </>)
        }
      </Box>
      <MessageDialog
        onClose={() => {
          setMessage(initialMessage)
        }}
        message={message} />
    </div>
  )
}
export default Single