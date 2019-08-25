import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { useDispatch} from '../../../store'
import { makeAttachProvide } from '../../../provide/common/AttachProvide'
import { LoadingDialog, MessageDialog } from '../../../components/ui/dialog'

const dialogActions: React.CSSProperties = {
  paddingRight: 20
};


export default function EditGroup(props:any) {
  const dispatch = useDispatch()
  const { saveGroup} = makeAttachProvide(dispatch)

  const {group,open, onClose ,onChange,localeConfig,apiUrls} = props
  
  // 事件反馈
  const initialMessage = {
    open: false,
    type: '',
    title: '',
    text: ''
  }
  const [message, setMessage] = React.useState(initialMessage)
  const initialLoading = { open: false, text: '' }
  const [loading, setLoading] = React.useState(initialLoading)
  // 提交
  const [form,setForm] = React.useState(group)
  React.useEffect(() => {
    setForm(group)
  });
  const onSubmit = ()=>{
    // 获取列表
    setLoading({
      open: true,
      text: '正在保存分组...'
    })
    saveGroup({
      url:apiUrls.saveGroup,
      group:form,
      success: (message: string) => {
        // 关闭加载条
        setLoading(initialLoading)
        onChange()
        onClose()
      },
      failure: (message: string) => {
        // 关闭加载条
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

  return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText>
            {localeConfig.words.editGroupTip}
          </DialogContentText>
          <TextField
            autoFocus
            defaultValue={form && form.name}
            margin="dense"
            id="name"
            label="分组名称"
            type="text"
            onChange={(event:any)=>{
              const newForm = form
              newForm.name = event.target.value
              setForm(form)
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions style={dialogActions}>
          <Button onClick={onClose} color="primary">
            {localeConfig.words.cancel}
          </Button>
          <Button variant="contained" onClick={onSubmit} color="primary">
            {localeConfig.words.submit}
          </Button>
        </DialogActions>
        <LoadingDialog open={loading.open} text={loading.text} />
        <MessageDialog
          onClose={() => {
            setMessage(initialMessage)
          }}
          message={message} />
      </Dialog>
    
  );
}