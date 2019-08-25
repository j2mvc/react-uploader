
import React, { useCallback, useState, useEffect } from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import Thumb from './Thumb'
import Thumbs from './Thumbs'
import LoadingBox from '../LoadingBox'
import UploadDialog from './UploadDialog'

import { getConfig } from '../../../storage/ConfigStorage'

import { makeAttachProvide } from '../../../provide/AttachProvide'
import * as commonTypes from '../../../types/common'
import * as UploadType from './UploadType'

import Icon from '../../Icon'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },
    thumbs: {
      display: 'flex',
      flexDirection: 'column'
    },
    thumbImage: {
      position: 'relative',
      width: 100,
      height: 100,
    },
    thumbButton: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'block',
      textAlign: 'center',
      verticalAlign: 'middile'
    },
    button: {
      float: 'left',
      margin: theme.spacing(1, 1, 1, 0),
      alignItems: 'center',
      display: 'flex'
    },
    buttonIcon: {
      margin: '7px 5px 0 0',
    }
  }))
/**
 * 上传组件接收参数
 */
export type IUploaderResult = {
  attaches?: commonTypes.Attach[],
  attach?: commonTypes.Attach,
  url?: string,
  urls?: string[],
}
export type UploaderProps = {
  type: string,// 上传类型，image:单图，images:多图，file:单文件，files多文件
  onChange: (IUploaderResult: any) => void,// 返回附件数组或附件对象,如果是直接输入地址，直接返回url
  cancel?: () => void,//直接关闭，会触发取消方法
  defaultUrl?: string,//已存地址
  defaultUrls?: string[],//已存地址列表
  defaultAttach?: commonTypes.Attach,//已存附件
  defaultAttaches?: commonTypes.Attach[],//已存附件列表
}
/**
 * 支持上传单个文件，单张图片，多个文件，多张图片
 * 上传组件根节点
 * 主要功能在对话框实现
 * @param props 接收编辑页面参数，返回单个附件对象或附件列表
 */
const Uploader = (props: any) => {
  const { getAttachListByUrls } = makeAttachProvide()

  const { localeConfig, attachPrefix } = getConfig()

  const { type, onChange, cancel, defaultUrl, defaultUrls, defaultAttach, defaultAttaches } = props
  const classes = useStyles()
  // 上传类型
  const mode = UploadType.getUploadMode(type)

  const [open, setOpen] = useState(false)
  // 显示已上传的附件
  const [attach, setAttach] = useState(defaultAttach as any)
  const [url, setUrl] = useState(defaultUrl as any)
  const [attaches, setAttaches] = useState(defaultAttaches as any)
  const [urls, setUrls] = useState(defaultUrls as any)

  // 加载初始化附件列表
  useEffect(() => {
    loadDefaults()
  }, [])
  const loadDefaults = () => {
    let urls: string[] = []
    if (UploadType.UploadModes.SINGLE === mode) {
      // 单个上传
      if (defaultUrl) {
        urls.push(defaultUrl)
      }
    } else if (defaultUrls) {
      urls = defaultUrls
    }
    // 查询出附件列表
    if (urls.length > 0) {
      getAttachListByUrls({
        urls,
        success: (list: any) => {
          setAttaches(list)
        },
        failure: (message: any) => {
        }
      })
    }

  }
  const initialLoading = { open: false, text: '' }
  const [loading, setLoading] = useState(initialLoading)
  const remove = (index: number, finished: Function) => {
    const newAttaches = attaches;
    newAttaches.splice(index, 1)
    setAttaches(attaches)
    onChange({
      attaches// 返回当前state的列表
    })
    finished()
  }

  const filesRender = (<Box className={classes.thumbs}>
    {/* 上传多文件或多图片 */}
    <Box>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => {
          // 上传文件
          setOpen(true)
        }}>
        {type === 'images' ?
          <Icon name="UploadImage" width={32} heigh={32} color="#fff" /> : <>
            <AddIcon />
            {localeConfig.words.uploadFile}
          </>}
      </Button>
    </Box>
    <Thumbs {...{
      type,
      attaches,
      onRemove: (props: any) => {
        setLoading({
          open: true,
          text: '正在移除条目...'
        })
        const { index } = props
        remove(index, () => {
          // 关闭加载条
          setLoading(initialLoading)
        })
      }
    }} />
  </Box>)


  const fileRender = (<Box className={classes.thumbs}>
    <Box>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => {
          // 上传文件
          setOpen(true)
        }}
      >
        <Icon className={classes.buttonIcon} name="Upload" width={16} height={16} color="#fff" />
        {localeConfig.words.uploadFile}
      </Button>
    </Box>
    <Box>
      {attach ? attachPrefix + attach.url : url}
    </Box>
  </Box>)

  const imageRender = (<Box className={classes.thumbImage}>
    <Thumb src={attach ? attachPrefix + attach.url : url} />
    <IconButton
      className={classes.thumbButton}
      aria-haspopup="true"
      color="primary"
      onClick={() => {
        setOpen(true)
      }}
    >
      <AddIcon />
    </IconButton>
  </Box>)

  const render = () => {
    if (type === 'image') {
      return imageRender
    } else if (mode === UploadType.UploadModes.SINGLE) {
      // 单个上传
      return fileRender
    }
    return filesRender
  }

  return (<Box className={classes.root}>
    {render()}
    <UploadDialog
      {...{
        type,
        open,
        attaches,
        url: defaultUrl,
        success: (props: IUploaderResult) => {
          if (mode === UploadType.UploadModes.SINGLE) {
            // 单文件/图片上传
            let att = props.attach
            if (props.attach) {
              att = props.attach
            } else if (props.attaches) {
              att = props.attaches[0]
            }
            // 预览
            setAttach(att)
            setUrl(props.url);
            // 触发调用页面事件
            onChange({
              attach: att,
              url: props.url
            })
          } else {
            // 追加附件列表
            if (props.attaches) {
              const newAttaches = attaches || []
              setAttaches(newAttaches.concat(props.attaches));
            }
            if (props.urls) {
              const newUrls = urls || []
              setUrls(newUrls.concat(props.urls));
            }
            onChange({
              attaches,// 返回当前state的列表
              urls
            })
          }
          setOpen(false)
        },
        onClose: () => {
          setOpen(false)
          if (cancel) {
            cancel()
          }
        }
      }} />
    <LoadingBox {...loading} />
  </Box>
  )
}
export default Uploader