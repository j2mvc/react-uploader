
import React, { useState, useCallback, useEffect, useMemo } from 'react'

import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import Icon from '../../Icon';

import { getConfig } from '../../../storage/ConfigStorage'

// 弹框
import LoadingBox from '../LoadingBox'
import { LoadingDialog, MessageDialog, AlertDialog } from '../dialog'

import { makeAttachProvide } from '../../../provide/common/AttachProvide'
import ListPagination from '../pagination'
import SplitButton from '../button/SplitButton'

// 上组组件弹框
import MultiDialog from './MultiDialog'
import * as UploadType from './UploadType'

import Thumbs from './Thumbs'

interface IRequestParams {
  groupId?: string;
  attType?: string;
  endTime?: string;
  startTime?: string;
  page?: number;
  pageSize?: number;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:1,
      display:'flex',
      flexDirection:'column',
      position: 'relative',
      margin: 0,
      padding: 0,
      fontSize: '1rem'
    },
    side: {
      display: 'flex',
      flexDirection: 'column',
      background: `#eee`
    },
    main: {
      flex:1,
      padding: theme.spacing(1, 2, 0, 2),
    },
    progress: {
    },
    pagination: {
      padding: theme.spacing(1, 1, 0, 1),
    },
    toolbar: {
      display: 'flex',
      flexWrap: 'wrap',
      userSelect: 'none',
      marginTop:theme.spacing(2),
      padding: theme.spacing(0, 1),
    },
    button: {
      display: 'flex',
      nowrap: 'true',
      padding:'0 10px',
      margin:'0 5px 5px 0'
    },
    iconButton: {
      display: 'flex',
      nowrap: 'true',
      margin:'0 5px 5px 0'
    },
    error: {
      padding: theme.spacing(5, 0, 2),
      display: 'flex',
      textAlign: 'center',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    icon: {
      marginTop: theme.spacing(1)
    },
    errorIcon: {
      margin: theme.spacing(1)
    },
    alert: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    alertIcon: {
      margin: theme.spacing(2)
    }
  }))

const AttachListPage = (props: any) => {
  const { getGroupList, getAttachList, removeAttach, moveAttach } = makeAttachProvide()
  const { group, onEditGroup, onRemoveGroup, success, attaches, type } = props
  // 样式 
  const classes = useStyles()
  // 附件类型
  const attType = UploadType.getAttType(type)

  const {localeConfig} = getConfig()
  const [groupList,setGroupList] = useState([]as any)
  const [list, setList] = useState([] as any)
  const [pagination, setPagination] = useState()
  const [selected, setSelected] = useState({} as any)
  const [disabled, setDisabled] = useState({} as any)
  // 加载分组列表
  const loadGoupList = ()=>{
    getGroupList({
      success:(list:any)=>{
        setGroupList(list)
      }, 
      failure:()=>{

      }
    })
  }
  // 已提交编辑页面的附件列表解析为不可选择
  // 且从已选择对象中移除
  const loadDisabled = ()=>{
    if(attaches && attaches.length){
      const newDisabled = disabled
      const newSelected = selected
      attaches.forEach((attach:any)=>{
        delete newSelected[attach.id]
        newDisabled[attach.id] = attach
      })
      setSelected(newSelected)
      setDisabled(newDisabled)
    }
  }

  // 警示框
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertProps, setAlertProps] = useState({
    description: <></>,
    title: '',
    ok: () => { },
    cancel: () => { }
  })

  // 启用上传功能
  const [open, setOpen] = useState(false)

  // 事件反馈
  const initialMessage = {
    open: false,
    type: '',
    title: '',
    text: ''
  }
  const [message, setMessage] = useState(initialMessage)
  const initialDialogLoading = { open: false, text: '' }
  const [dialogLoading, setDialogLoading] = useState(initialDialogLoading)
  const initialLoading = { open: false, text: '' }
  const [loading, setLoading] = useState({
    open: true, 
    text: '正在加载列表数据...'
  })

  // 初始化编辑页面传来的attaches为selected
  const initialSelected = () => {
    if (attaches && attaches.length > 0) {
      let newSelected = selected
      attaches.forEach((attach: any) => {
        newSelected[attach.id] = attach
      })
      if (newSelected) {
        setSelected(newSelected)
      }
    }
  }
  useEffect(()=>{
    loadGoupList()
    loadDisabled()
    initialSelected()
  })
  // 分页
  const total = (pagination && pagination.total) || 0
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(21);
  const onPageChange = (newPage: number) => {
    setPage(newPage);
    loadList({ newPage })
  }
  const onPageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
    loadList({ newPageSize })
  }
  // 请求参数
  const [params, setParams] = useState<IRequestParams>({
    groupId: group ? group.id : '',
    attType,
    pageSize,
    page: 1
  })
  // 获取列表
  const loadList = (props?: any) => {
    const newPage = props && props.newPage
    const newPageSize = props && props.newPageSize
    const newParams = params;
    newParams.page = newPage || page
    newParams.pageSize = newPageSize || pageSize
    setParams(newParams)
    fetchList()
  }
  const fetchList = () => {
    // 获取列表
    setLoading({
      open: true,
      text: '正在加载列表数据...'
    })
    getAttachList({
      params,
      success: (props: any) => {
        const { list, pagination, message } = props
        // 关闭加载条
        setLoading(initialLoading)
        setList(list)
        setPagination(pagination)
      },
      failure: (message: string) => {
        // 关闭加载条
        setLoading(initialLoading)
        setMessage({
          open: false,
          type: 'error',
          title: '提示',
          text: message
        })
      }
    })
  }
  useEffect(() => {
    fetchList();
    return () => {
      // 返回空方法，否则会陷入无限循环
    };
  }, []);

  // 删除附件
  const remove = (id: any) => {
    const description = (<Box className={classes.alert}>
      <Box className={classes.alertIcon}><Icon name="Alert" width={32} height={32} /></Box>
      <Box>
        <Box>您正在删除文件，这会影响文件关联的内容!</Box>
        <Box>此操作不可恢复，确定要继续么？</Box>
      </Box>
    </Box>)
    setAlertOpen(true)
    setAlertProps({
      description,
      title: '',
      ok: () => {
        setAlertOpen(false)
        setDialogLoading({
          open: true,
          text: '正在删除附件...'
        })
        removeAttach({
          id,
          success: (message: string) => {
            setDialogLoading(initialDialogLoading)
            // 重置选中
            setSelected({})
            // 重新加载
            fetchList()
          },
          failure: (message: string) => {
            // 关闭加载条
            setDialogLoading(initialDialogLoading)
            setMessage({
              open: true,
              type: 'error',
              title: '提示',
              text: message
            })
          }
        })
      },
      cancel: () => {
        setAlertOpen(false)
      }
    })
  }
  // 删除选中条
  const removeSelected = () => {
    const id = Object.keys(selected);
    remove(id)
  }
  // 移动选中条
  const moveSelected = (newGroupId: string) => {
    setDialogLoading({
      open: true,
      text: '正在移动附件...'
    })
    const id = Object.keys(selected);
    moveAttach({
      id,
      groupId: newGroupId,
      success: (message: string) => {
        // 重新加载
        setDialogLoading(initialDialogLoading)
        loadList();
        // 重置选中
        setSelected({})
      },
      failure: (message: string) => {
        // 关闭加载条
        setDialogLoading(initialDialogLoading)
        setMessage({
          open: true,
          type: 'error',
          title: '提示',
          text: message
        })
      }
    })
  }
  // 确定选中条，返回调用页面
  const onInsert = () => {
    // 将对象转换为数组
    const attaches: any = []
    Object.keys(selected).forEach((key: string) => {
      const attach = selected[key]
      attaches.push(attach)
    })
    success(attaches)
    // 重置选中
    setSelected({})
  }

  return (
    <div className={classes.root}>
      <LoadingBox {...loading}/>
      {list.length === 0 && !loading.open && (<Box className={classes.error}>
        <Icon className={classes.errorIcon} name="Error" width={32} height={32} color="gray" />
        {message && message.type === 'error' ? message.text : '查询结果为空！'}
      </Box>)}
      <Box className={classes.pagination}>
        <ListPagination
          {...{
            total,
            page,
            pageSize,
            onPageChange,
            onPageSizeChange,
            maxShow: 5
          }}
        />
      </Box>
      <Box className={classes.main}>
      {/* 列表 */}
      <Thumbs {...{
        type,
        attaches:list,
        selected,
        onSelect:(attach:any)=>{
          let newSelected = selected || {}
          if (type === 'image'
            || type === 'media'
            || type === 'video'
            || type === 'audio'
            || type === 'file') {
              // 单文件，则初始化
            if (newSelected[attach.id]) {
              newSelected = {}
            } else {
              newSelected = {}
              newSelected[attach.id] = attach
            }
          }else{
            if (newSelected[attach.id]) {
              delete newSelected[attach.id]
            } else {
              newSelected[attach.id] = attach
            }
          }
          setSelected(Object.assign({}, newSelected))
        },
        disabled
      }}/>
        
      </Box>
      <Box className={classes.toolbar}>
        {/* 刷新 */}
        <Tooltip
          aria-label="add"
          title={localeConfig.words.refresh}>
          <IconButton
            size="small"
            disableFocusRipple
            className={classes.button}
            onClick={() => {
              loadList()
            }}>
            <Icon name="Refresh" className={classes.icon} color="#666" size={18} height={18} />
          </IconButton>
        </Tooltip>
        {/* 上传文件 */}
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            // 上传文件
            setOpen(true)
          }}
        >
          {type === 'image' || type === 'images' ?
            localeConfig.words.uploadImage :
            localeConfig.words.uploadFile
          }
        </Button>
        {/* 删除选中的条目 */}
        <Button
          variant="outlined"
          color="default"
          className={classes.button}
          onClick={removeSelected}
          disabled={!selected || (selected && Object.keys(selected).length === 0)}
        >
          {localeConfig.words.removeSelected}
        </Button>
        {/* 返回选中条目到编辑页面 */}
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={onInsert}
          disabled={!selected || (selected && Object.keys(selected).length === 0)}
        >
          {localeConfig.words.insertSelected}
        </Button>
        {// 移动到分组
          Object.keys(selected).length > 0 &&
          <Box className={classes.button}>
            <SplitButton
              label={localeConfig.words.moveToGroup}
              options={groupList}
              onSelect={(group: any) => {
                moveSelected(group.id)
              }} />
          </Box>
        }
        {group && (<>
          {/* 编辑分组 */}
          <Tooltip
            aria-label="add"
            title={localeConfig.words.editGroup}>
            <Fab
              size="small"
              color="secondary"
              className={classes.iconButton}
              onClick={() => {
                onEditGroup(group)
              }}>
              <EditIcon fontSize="small" />
            </Fab>
          </Tooltip>
          {/* 删除分组 */}
          <Tooltip
            aria-label="add"
            title={localeConfig.words.removeGroup}>
            <Fab
              size="small"
              color="default"
              className={classes.iconButton}
              onClick={() => {
                onRemoveGroup(group.id)
              }}>
              <DeleteIcon fontSize="small" />
            </Fab>
          </Tooltip>
        </>)}
      </Box>
      <LoadingDialog {...dialogLoading} />
      <MessageDialog
        onClose={() => {
          setMessage(initialMessage)
        }}
        message={message} />
      <MultiDialog
        {...{
          type,
          open,
          defaultGroup: group,
          noShowGroup: true,
          success: (attaches: any) => {
            // 上传成功，关闭弹框，重载数据
            setPage(0)
            loadList()
            setOpen(false)
          },
          onClose: () => {
            setOpen(false)
          }
        }} />
      {/* 警告框 */}
      <AlertDialog open={alertOpen} {...alertProps} />
    </div>

  )
}
export default AttachListPage