import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Inspired by the  spinners.
const useStyles = makeStyles((theme: Theme) =>
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
function Progress(props: any) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        value={100}
        className={classes.top}
        size={18}
        thickness={4}
        {...props}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.bottom}
        size={18}
        thickness={4}
        {...props}
      />
    </div>
  );
}
export default (props:any) => {
  const {show,className,...other} = props
  if(show){
    return (<span className={className}><Progress  {...other}/></span>)
  }
  return <></>
}