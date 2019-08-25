import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Icon from '../Icon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    error: {
      padding: theme.spacing(5, 0, 2),
      display: 'flex',
      textAlign: 'center',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    icon: {
      marginTop: theme.spacing(1)
    },
    errorIcon: {
      margin: theme.spacing(1)
    },
  }))
export default (props: any) => {
  const classes = useStyles();
  const { open, text } = props;
  if (open) {
    return (<Box className={classes.error}>
      <Icon className={classes.errorIcon} name="Error" width={32} height={32} color="gray" />
      {text || '查询结果为空！'}
    </Box>)
  } else {
    return <></>
  }
}