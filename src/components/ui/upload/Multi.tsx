
import React, { useState, useCallback, useEffect, useMemo } from 'react'

import { lighten, withStyles, makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';

import { useDispatch, useMappedState } from '../../../store'
import * as State from '../../../store/state'

import Icon from '../../Icon';
import * as Accepts from './Accepts'

import { useDropzone } from 'react-dropzone'
import { makeFileProvide } from '../../../provide/common/FileProvide'
import SplitButton from '../button/SplitButton'

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten('#eee', 0.5),
  },
  bar: {
    borderRadius: 0,
    backgroundColor: '#0066cc',
  },
})(LinearProgress);


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
      flexDirection: 'row',
      minHeight: 360,
      maxHeight: 560
    },
    side: {
      display: 'flex',
      flexDirection: 'column',
      background: `#eee`
    },
    main: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    uploadContainer: {
      margin: theme.spacing(2)
    },
    progress: {
    },
    thumbsContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 16
    },
    thumb: {
      position: 'relative',
      display: 'inline-flex',
      borderRadius: 3,
      border: '1px solid #eaeaea',
      marginBottom: 8,
      marginRight: 8,
      width: 100,
      height: 100,
      padding: 4,
      boxSizing: 'border-box',
      background: '#fcfcfc',
      cursor: 'pointer'
    },
    thumbInner: {
      display: 'flex',
      minWidth: 0,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    },
    img: {
      display: 'block',
      width: 'auto',
      height: '100%'
    },
    thumbTool: {
      display: 'flex',
      position: 'absolute',
      right: 2,
      top: 2
    },
    fileThumbsContainer: {
      display: 'block',
      marginTop: 16
    },
    fileThumb: {
      position: 'relative',
      display: 'flex',
      borderBottom: '1px solid #eaeaea',
      paddingBottom: 5,
      marginBottom: 5,
      padding: 4,
      cursor: 'pointer'
    },
    fileThumbInner: {
      flex: '1'
    },
    fileThumbTool: {
      width: 60,
      display: 'flex',
      right: 2,
      top: 2
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
const Multi = (props: any) => {
  const dispatch = useDispatch()
  const { success, type, defaultGroup, noShowGroup } = props
  // 样式 
  const classes = useStyles()

  const { localeConfig, groupList,apiUrls } = useMappedState(
    useCallback(
      (state: State.Root) => ({
        localeConfig: state.app.localeConfig,
        apiUrls: state.app.apiUrls,
        groupList: state.common.attach.groupList,
      }),
      [],
    ),
  );

  const { upload } = makeFileProvide(dispatch)
  const [files, setFiles] = useState([] as any);
  const [precent, setPrecent] = useState(0)
  const [disabled, setDisabled] = useState(false)

  const [showProgress, setShowProgress] = useState(false)
  const [hoverd, setHoverd] = useState({} as any)// 鼠标经过状态
  const [group, setGroup] = useState(defaultGroup);// 选中的分组

  // 事件反馈
  const initialMessage = {
    open: false,
    type: '',
    title: '',
    text: ''
  }
  const [message, setMessage] = useState(initialMessage)

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: Accepts.getAccept(type),
    noClick: showProgress,// 正在上传时禁止点击
    noDrag: showProgress,// 正在上传时禁止拖入文件
    onDrop: acceptedFiles => {
      const newFiles = files || []
      if (type === 'images' || type === 'image') {
        setFiles(newFiles.concat(acceptedFiles.map((file: any) => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }))))
      } else {
        setFiles(acceptedFiles)
      }
    }
  });

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files && files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
      isDragActive,
      isDragReject
    ]);

  // 开始上传状态
  const onUploading = () => {
    // 禁用按钮
    setDisabled(true)
    // 重置进度
    setPrecent(0)
    // 显示进度条
    setShowProgress(true)
  }
  // 恢复
  const resume = () => {
    // 启用上传按钮
    setDisabled(false)
    // 隐藏进度条
    setShowProgress(false)
    // 清空文件列表
    setFiles([])
  }
  // 批量上传
  const submitUpload = () => {
    // 重置错误消息
    setMessage(initialMessage)
    // 重置上传状态
    onUploading()
    let data = new FormData()
    files.forEach((file: any) => {
      data.append('file', file)
    })
    if (group) {
      data.append('groupId', group.id)
    }
    upload({
      apiUrls,
      type,
      data,
      onProgress: (event: any) => {
        if (event.lengthComputable) {
          //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
          //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
          // callback(progressEvent);
          //{{Math.ceil(precent)}}%
          // precent.toFixed(2)
          const loaded = event.loaded;
          const total = event.total;
          const precent = (loaded / total) * 100;
          setPrecent(precent)
        }
      },
      success: (attaches: any) => {
        // 重置上传状态
        resume()
        success(attaches)
      },
      failure: (message: string) => {
        // 启用上传按钮
        setDisabled(false)
        // 隐藏进度条
        setShowProgress(false)
        // 设置错误消息
        setMessage({
          open: true,
          type: 'error',
          title: '提示',
          text: message
        })
      }
    })
  }

  /**
   * 显示缩略图
   */
  const thumbs = files.map((file: any, index: number) => (
    <div
      className={type === 'images' || type === 'image' ? classes.thumb : classes.fileThumb}
      key={index}
      onMouseEnter={() => {
        const newHoverd = hoverd || {}
        newHoverd[file.path] = true
        setHoverd(Object.assign({}, newHoverd))
      }}
      onMouseLeave={() => {
        const newHoverd = hoverd || {}
        newHoverd[file.path] = false
        setHoverd(Object.assign({}, newHoverd))
      }}>
      {
        type === 'images' || type === 'image' ?

          <div className={classes.thumbInner}>
            <img
              src={file.preview}
              className={classes.img}
            />
          </div> :

          <div className={classes.fileThumbInner}>
            {file.path}
          </div>
      }
      {hoverd[file.path] && (
        <div className={classes.thumbTool}>
          <Tooltip
            aria-label="add"
            title={localeConfig.words.remove}>
            <Fab
              size="small"
              color="default"
              onClick={() => {
                const newFiles = files;
                newFiles.splice(index, 1)
                setFiles(Object.assign([], newFiles))
              }}>
              <DeleteIcon fontSize="small" />
            </Fab>
          </Tooltip>
        </div>
      )
      }
    </div>
  ));
  return (
    <div className={classes.uploadContainer}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>{localeConfig.words.uploadDrag}</p>
      </div>
      <aside className={type === 'images' || type === 'image' ?
        classes.thumbsContainer : classes.fileThumbsContainer}>
        {thumbs}
      </aside>
      {/* 错误提示 */}
      {message.open && message.type === 'error' && (<Box className="error">
        <Icon className="error-icon" name="Error" width={32} height={32} color="gray" />
        {message ? message.text : '上传错误！'}
      </Box>)}

      {showProgress &&
        <div>
          <div>
            <BorderLinearProgress
              className={classes.progress}
              variant="determinate"
              color="primary"
              value={precent}
            />
          </div>
          <div className={classes.progressMessage}>
            {precent > 0 ? precent === 100 ? '上传完毕' : '正在上传...' : '等待上传.'}
            {precent > 0 && `${Math.ceil(precent)}%`}
          </div>
        </div>
      }
      <Box className={classes.footer}>
        {/* 提交上传 */}
        <Button
          variant="contained"
          fullWidth={noShowGroup}
          color="primary"
          className={classes.button}
          onClick={submitUpload}
          disabled={files.length === 0 || disabled}
        >
          {localeConfig.words.uploadSubmit}
        </Button>
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
    </div>
  )
}
export default Multi