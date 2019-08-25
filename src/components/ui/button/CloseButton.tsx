
import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Icon from '../../Icon'
/**
 * 关闭图标
 */
const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    position: 'absolute',
    width: '20px',
    height: '20px',
    top: '2px',
    right: '3px',
    cursor: 'pointer',
    borderRadius: '50%',
    '&:hover': {
      backgroundColor: '#666'
    },
  },
  icon: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    margin: 0,
    padding: 0
  }
}))
export default (props:any) => {
  const {open,close} = props
  const classes = useStyles()
  const [hover, setHover] = useState(false)
  return (
    <Box
      className={classes.root}
      onClick={(e) => { close(e) }}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}>
        {open?
        <Icon name="Wrong" className={classes.icon}
        width={12} height={12} color={hover ? '#fff' : '#222'} />
        :<></>
        }
      
    </Box>)
}
