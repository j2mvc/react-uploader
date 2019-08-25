import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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
    root: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      background: 'rgba(225, 225, 225,0.1)',
      display: 'flex',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
      top: 0,
      left: 0
    },
    loading: {
      background: '#fafafa',
      borderRadius: '5px',
      border: '1px solid #efefef',
      boxShadow: '0px 0 2vh 2vh #f3f3f3',
      margin: '0 auto',
      padding: '5px 10px',
    },
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
export default (props: any) => {
  const classes = useStyles();
  const { open, text } = props;
  if (open) {
    return (<div className={classes.root}>
      <div className={classes.loading}>
        <div className={classes.box}>
          <FacebookProgress />
          <span className={classes.text}>{text || 'Loading...'}</span>
        </div>
      </div>
    </div>)
  }else{
    return <></>
  }
}