
import React, { useState, useCallback, useEffect, useMemo } from 'react'

import { css } from 'emotion';
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';

import { TabPanel, StyleTab, StyleTabs } from '../tabs/StyleTabs';

import { getConfig } from '../../../storage/ConfigStorage'
import { makeAttachProvide } from '../../../provide/AttachProvide'

import AttachListPage from './AttachList'

import EditGroup from './EditGroup'
import * as util from '../../../lib/util'

import Icon from '../../Icon';
import Loading from '../Loading'
import { LoadingDialog, MessageDialog, AlertDialog } from '../dialog'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: 0,
      fontSize: '1rem',
      display: 'flex',
      flexDirection: 'row'
    },
    side: {
      display: 'flex',
      flexDirection: 'column',
      background: `#f5f5f5`
    },
    main: {
      flex: 1,
      // display: 'flex',
      // flexDirection: 'row',
      overflow: 'hidden'
    },
    swipeable: {
      flex: 1
    },
    tabPanel: {
      background: '#333'
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
      margin: theme.spacing(1)
    },
    margin: {
      margin: 2
    },
    rightIcon: {
      marginLeft: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    tabIcons: {
      position: 'absolute',
      display: 'inline-flex',
      top: 2,
      right: -60
    },
    loading: {
      padding: theme.spacing(5, 0, 2),
      display: 'flex',
      textAlign: 'center',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
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

const Remote = (props: any) => {
  const { getGroupList, removeGroup } = makeAttachProvide()
  const { success, attaches, type } = props
  // 样式 
  const classes = useStyles()
  const theme = useTheme();

  const { localeConfig } = getConfig();
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
  const initialLoading = { loading: false, text: '' }
  const [loading, setLoading] = useState(initialLoading)

  // 查询分组
  const [groupList,setGroupList] = useState([] as any)
  const loadGroupList = () => {
    // 获取列表
    setLoading({
      loading: true,
      text: '正在加载分组数据...'
    })
    getGroupList({
      success: (list: any) => {
        // 关闭加载条
        setLoading(initialLoading)
        setGroupList(list)
      },
      failure: (message: string) => {
      }
    })
  }
  useEffect(()=>{
    loadGroupList()
  },[])
  // 编辑分组
  const [editGroupOpen, setEditGroupOpen] = useState(false)
  const [group, setGroup] = useState()
  const handleEditGroupClose = () => {
    setEditGroupOpen(false)
  }
  // 警示框
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertProps, setAlertProps] = useState({
    description: <></>,
    title: '',
    ok: () => { },
    cancel: () => { }
  })
  // 删除分组
  const handleRemoveGroup = (id: string) => {
    const description = (<Box className={classes.alert}>
      <Box className={classes.alertIcon}><Icon name="Alert" width={32} height={32} /></Box>
      <Box>
        <Box>您正在删除附件分组，当前文件将移动到未分组!</Box>
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
          text: '正在删除分组...'
        })
        removeGroup({
          id: [id],
          success: (message: string) => {
            setValue(0)
            // 关闭加载条
            setDialogLoading(initialDialogLoading)
            // 删除完成，重新查询数据
            loadGroupList()
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
  // 新增或修改分组
  const handleEditGroup = (group?: any) => {
    setGroup(group || {
      id: util.createId(),
      name: '',
      sorter: 999
    })
    setEditGroupOpen(true)
  }
  // 保存完成，重新查询分组
  const onGroupChange = () => {
    loadGroupList()
  }

  // 标签栏
  const [value, setValue] = React.useState(0);
  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  const styles = {
    tabPanel: css`
        display:'flex';
      `
  }
  return (
    <Box className={classes.root}>
      <Box className={classes.side}>
        <StyleTabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}>
          {/* 未分组 */}
          <StyleTab
            ariaprefix="upload-remote"
            index={0}
            label={localeConfig.words.ungrouped} />
          {// 分组列表
            groupList && groupList.length >0 && groupList.map((group: any, index: number) => (
              <StyleTab
                ariaprefix="upload-remote"
                key={group.id}
                index={index + 1}
                label={group.name} />))
          }
          {/* 添加分组 */}

        </StyleTabs>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            handleEditGroup()
          }}>
          {localeConfig.words.addGroup}
          <AddIcon className={classes.rightIcon} />
        </Button>
      </Box>
      <Box className={classes.main}>
        {/* 加载分组提示 */}
        {loading.loading && (<Box className={classes.loading}>
          <Loading text={loading.text} />
        </Box>)}
        {/* 上传组件 */}
        {/* 远程文件分组列表 */}
        <TabPanel
          ariaprefix="upload-remote"
          value={value} className={styles.tabPanel} index={0} dir={theme.direction}>
          <AttachListPage {...{
            type,
            attaches,
            success: (attaches: any) => {
              success(attaches)
            },
          }} />
        </TabPanel>
        {// 分组列表
           groupList && groupList.length >0 && groupList.map((group: any, index: number) => {
            return (
              <TabPanel
                ariaprefix="upload-remote"
                key={group.id}
                value={value}
                index={index + 1}
                className={styles.tabPanel}
                dir={theme.direction}>
                <AttachListPage {...{
                  type,
                  group,
                  attaches,
                  success: (attaches: any) => {
                    success(attaches)
                  },
                  onEditGroup: (group: any) => {
                    handleEditGroup(group)
                  },
                  onRemoveGroup: (groupId: string) => {
                    handleRemoveGroup(groupId)
                  }
                }} />
              </TabPanel>)
          })
        }
      </Box>
      {/** 分组编辑对话框 */}
      <EditGroup
        {...{
          open: editGroupOpen,
          onClose: handleEditGroupClose,
          onChange: onGroupChange,
          localeConfig,
          group
        }} />
      <LoadingDialog open={dialogLoading.open} text={dialogLoading.text} />
      <MessageDialog
        onClose={() => {
          setMessage(initialMessage)
        }}
        message={message} />
      {/* 警告框 */}
      <AlertDialog open={alertOpen} {...alertProps} />
    </Box>

  )
}
export default Remote