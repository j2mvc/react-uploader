
export type LoadingDiloadProps = {
    text?:string,
    open:boolean
  }
export type MessageDialogTitleProps ={
    onClose: Function,
    children: any
  }
export type MessageDialogPropsMessage={
    open: boolean,
    type?: string,
    title?: string,
    text?: string
}
export type MessageDialogProps = {
    onClose: any,
    message: MessageDialogPropsMessage,
    children?: any
  }

export const LoadingDialog = require('./LoadingDialog').default
export const MessageDialog = require('./MessageDialog').default
export const AlertDialog = require('./AlertDialog').default