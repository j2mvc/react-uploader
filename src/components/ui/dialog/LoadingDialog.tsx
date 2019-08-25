import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {LoadingDiloadProps} from './index'
// Inspired by the Facebook spinners.
const useStylesFacebook = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
    top: {
      color: '#eef3fd',
    },
    bottom: {
      color: '#6798e5',
      animationDuration: '550ms',
      position: 'absolute',
      left: 0,
    },
  }));
function FacebookProgress(props: any) {
  const classes = useStylesFacebook();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        value={100}
        className={classes.top}
        size={24}
        thickness={4}
        {...props}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.bottom}
        size={24}
        thickness={4}
        {...props}
      />
    </div>
  );
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      display: 'flex',
      flexDirection: 'row',
      padding: '15px 20px 10px 20px'
    },
    text: {
      color: '#666',
      margin: '2px 10px'
    },
  }))
export default (props: LoadingDiloadProps) => {
  const classes = useStyles();
  const { text, open } = props;
  if(open){
    return (
      <Dialog aria-labelledby="simple-dialog-title" open={open}>
        <div className={classes.box}>
          <FacebookProgress />
          <span className={classes.text}>{text || 'Loading...'}</span>
        </div>
      </Dialog>
    );
  }
  return <></>
}