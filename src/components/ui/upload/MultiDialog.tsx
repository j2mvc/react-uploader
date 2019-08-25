
import React, { useState, useCallback } from 'react'

import { makeStyles, createStyles, Theme} from '@material-ui/core/styles';

import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { CloseButton } from '../button';

import { useMappedState } from '../../../store'
import * as State from '../../../store/state'

import Multi from './Multi'

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
    content: {
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
    },
  }))


const MultiDialog = (props: any) => {
  const { 
    open, 
    onClose,
    success,
    type,
    defaultGroup,
    noShowGroup 
  } = props;

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

  const [fullWidth, setFullWidth] = useState(false);
  const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('md');

  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      onClose={onClose} 
      open={open}>
      <DialogTitle onClose={onClose}>
        {type === 'image' || type === 'images' ?
          localeConfig.words.uploadImage :
          localeConfig.words.uploadFile
        }
      </DialogTitle>
      <DialogContent className={classes.content} dividers={true}>

        <Multi {...{
          type,
          defaultGroup,
          noShowGroup,
          success: (attaches: any) => {
            // 上传成功，返回编辑页面
            success({
              attaches
            })
          }
        }} />
      </DialogContent>
    </Dialog>
  );
}
export default MultiDialog