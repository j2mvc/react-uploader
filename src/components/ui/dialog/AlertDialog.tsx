import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getConfig } from '../../../storage/ConfigStorage'

export type AlertDialogProps = {
  description: any,
  title?: string,
  open: boolean,
  ok: () => void,
  cancel: () => void
}
export default function AlertDialog(props: AlertDialogProps) {
  const { description, title, open, ok, cancel } = props
  const {localeConfig} = getConfig()

  if(open){
    return (
      <div>
        <Dialog
          open={open}
          onClose={cancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {/* 提示标题 */}
            {title || localeConfig.words.alert.tips}
          </DialogTitle>
          <DialogContent>
            <Box id="alert-dialog-description">
              {/* 提示内容 */}
              {description}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={ok} color="primary" autoFocus>
              {/* 确定 */}
              {localeConfig.words.alert.sure}
            </Button>
            <Button onClick={cancel} color="primary">
              {/* 取消 */}
              {localeConfig.words.alert.cancel}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  return <></>
}

