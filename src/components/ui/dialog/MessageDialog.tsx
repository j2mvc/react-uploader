import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import { CloseButton } from '../button';
import ErrorIcon from '../../icons/Error';
import SuccessIcon from '../../icons/Success';

import {MessageDialogProps,MessageDialogTitleProps} from '.'

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

const DialogTitle = (props: MessageDialogTitleProps) => {
  const classes = useStylesTitle()
  const { children, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <span>{children}</span>
      {onClose ? (
        <span className={classes.closeButton} onClick={(e)=>{onClose(e)}}>
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
      padding: theme.spacing(2),
      minWidth: theme.spacing(25),
      alignItems:'center',
      justifyContent:'center'
    },
    success: {
      color: 'green',
    },
    error: {
      color: 'red',
    },
    icon: {
    },
    text: {
      marginLeft: '10px',
    }
  }));

export default (props: MessageDialogProps) => {
  const classes = useStyles();
  const { onClose, message } = props;
  
  if (message && message.open && message.type) {
    return (
      <Dialog onClose={onClose} open={true}>
        <DialogTitle onClose={onClose}>
          {message.title}
        </DialogTitle>
        <Typography className={classes.content}>
          <span>
            {message.type === 'success' ? (
              <SuccessIcon className={classes.icon} width={32} height={32} color="green" />
            ) : (
                <ErrorIcon className={classes.icon} width={32} height={32} color="gray" />
              )}</span>
          <span className={classes.text}>{message.text}</span>
        </Typography>
      </Dialog>
    );
  }
  return (<></>);
}