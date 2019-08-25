
import React, { useState, useCallback} from 'react'

import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';

import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { CloseButton } from '../button';

import { useMappedState } from '../../../store'
import * as State from '../../../store/state'
import DialogActions from '@material-ui/core/DialogActions';

import { TabPanel, StyleTab, StyleTabs } from '../tabs/StyleTabs';
import Single from './Single'
import Remote from './Remote'
import Url from './url'
import Multi from './Multi'
import * as UploadType from './UploadType'
import TextInput from '../form/TextInput'

const useStylesTitle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      background: '#f5f5f5',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      borderBottom: '1px solid #dedede',
      fontSize: '1rem'
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: 5
    },
  }))

const DialogTitle = (props: any) => {
  const classes = useStylesTitle()
  const { children, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <span>{children}</span>
      {onClose ? (
        <span className={classes.closeButton} onClick={(e) => { onClose(e) }}>
          <CloseButton open={true} close={onClose} />
        </span>
      ) : null}
    </MuiDialogTitle>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      fontSize: '1rem'
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: 5
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
    },
    contentHeader: {
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 0,
      background: `-webkit-linear-gradient(#f9f9f9, #f0f0f0);
      -o-linear-gradient(#f9f9f9, #f0f0f0);
      -moz-linear-gradient(#f9f9f9, #f0f0f0);
      linear-gradient(#f9f9f9, #f0f0f0)`,
      height: 38
    },
    contentContainer: {
      flex: 1,
      padding: 0,
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
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    footerInputs: {
      display: 'inline-flex',
    },
    footerInput: {
      margin: theme.spacing(0, 1, 0, 0)
    }
  }))


const UploadDialog = (props: any) => {
  const { open, success, onClose, type, attaches, url, fromEditor } = props;

  const { localeConfig } = useMappedState(
    useCallback(
      (state: State.Root) => ({
        localeConfig: state.app.localeConfig,
        groupList: state.common.attach.groupList
      }),
      [],
    ),
  );

  const classes = useStyles()
  const theme = useTheme();

  const [fullWidth, setFullWidth] = useState(false);
  const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('md');
  const [value, setValue] = useState(0);
  // 图片尺寸，编辑器使用 
  const [imgOptions, setImgOptions] = useState({
    width:'',
    height:'',
    alt:''
  })

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    if (newValue === 1) {
      setFullWidth(true)
    } else {
      setFullWidth(false)
    }
    setValue(newValue);
  }

  function handleChangeIndex(index: number) {
    if (index === 1) {
      setFullWidth(true)
    } else {
      setFullWidth(false)
    }
    setValue(index);
  }
  // 上传模式
  const mode = UploadType.getUploadMode(type)

  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      onClose={onClose}
      open={open}>
      <DialogTitle onClose={onClose}>
        {type === 'image' || type === 'images' ? localeConfig.words.chooseImage : localeConfig.words.chooseFile}
      </DialogTitle>
      <DialogContent className={classes.content} dividers={true}>
        <Box className={classes.contentHeader}>
          <StyleTabs
            value={value}
            onChange={handleChange}>
            {/* 本地上传 */}
            <StyleTab
              ariaprefix="upload-dialog"
              index={0}
              label={localeConfig.words.localUpload} />
            {/* 远程文件 */}
            <StyleTab
              ariaprefix="upload-dialog"
              index={1}
              label={type === 'image' || type === 'images' ? localeConfig.words.removePictures : localeConfig.words.remoteFiles} />
            {/* 文件链接 */}
            <StyleTab
              ariaprefix="upload-dialog"
              index={2}
              label={type === 'image' || type === 'images' ? localeConfig.words.picturesLinking : localeConfig.words.fileLinks} />
          </StyleTabs>
        </Box>
        <Box className={classes.contentContainer}>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel
              ariaprefix="upload-dialog"
              value={value} index={0} dir={theme.direction}>
              {// 单图/单文件上传
                (mode === UploadType.UploadModes.SINGLE) && (
                  <Single
                    {...{
                      type,
                      success: (attach: any) => {
                        // 返回附件对象,返回编辑页面
                        success({ attach,imgOptions })
                      }
                    }} />)}
              {// 多图/多文件上传
                (mode === UploadType.UploadModes.MULTI) && (
                  <Multi {...{
                    type,
                    success: (attaches: any) => {
                      // 上传成功，返回编辑页面
                      success({
                        attaches,
                        imgOptions
                      })
                    }
                  }} />)
              }
            </TabPanel>
            <TabPanel
              ariaprefix="upload-dialog"
              value={value} index={1} dir={theme.direction}>
              {/* 远程 */}
              <Remote {...{
                type,
                attaches,
                success: (attaches: any) => {
                  // 已选择，返回编辑页面
                  success({
                    attaches,
                    imgOptions
                  })
                }
              }} />
            </TabPanel>
            <TabPanel
              ariaprefix="upload-dialog"
              value={value} index={2} dir={theme.direction}>
              {/* 链接地址 */}
              {<Url {...{
                localeConfig,
                url,
                success: (url: any) => {
                  success({ url ,imgOptions})
                }
              }} />}
            </TabPanel>
          </SwipeableViews>
        </Box>
      </DialogContent>
      {fromEditor && (
        <DialogActions>
          <Box className={classes.footerInputs}>
            <Box component="span" className={classes.footerInput}>
              <TextInput
                labelWidth={60}
                defaultValue={imgOptions.alt}
                label={`ALT：`}
                onChange={(event: any) => {
                  imgOptions.alt = event.target.value
                  setImgOptions(Object.assign({},imgOptions))
                }} />
            </Box>
            <Box component="span" className={classes.footerInput}>
              <TextInput
                labelWidth={60}
                defaultValue={imgOptions.width}
                inputWidth={60}
                label={`${localeConfig.words.width}：`}
                onChange={(event: any) => {
                  imgOptions.width = event.target.value
                  setImgOptions(Object.assign({},imgOptions))
                }} />
            </Box>
            <Box component="span" className={classes.footerInput}>
              <TextInput
                labelWidth={80}
                defaultValue={imgOptions.height}
                inputWidth={60}
                label={`${localeConfig.words.height}：`}
                onChange={(event: any) => {
                  imgOptions.height = event.target.value
                  setImgOptions(Object.assign({},imgOptions))
                }} />
            </Box>
          </Box>
        </DialogActions>
      )}
    </Dialog>
  );
}
export default UploadDialog