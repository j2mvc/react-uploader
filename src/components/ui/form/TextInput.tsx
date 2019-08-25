
import React from 'react';
import { makeStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexWrap: 'nowrap'
    },
    label: {
      textAlign: 'right',
      flexWrap: 'nowrap'
    },
    input: {
      flex: 1,
      margin: theme.spacing(1),
    },
    inputInput: {

    },
    tips: {
      color: '#999'
    }
  }),
);

const TextInput = (props: any) => {
  const classes = useStyles()
  const { label, labelWidth,inputWidth, defaultValue, tips,...other} = props
  const labelStyle: React.CSSProperties = labelWidth?{
    width: labelWidth
  }:{};
  const inputStyle: React.CSSProperties = inputWidth? {
    width: inputWidth
  }:{};
  return (
    <FormControl className={classes.root}>
      <Box component="span"
        style={labelStyle}
        className={classes.label}>
        {label}
      </Box>
      <Box component="span" className={classes.input}>
        <Input
          defaultValue={defaultValue}
          className={classes.inputInput}
          style={inputStyle}
          inputProps={{
            'aria-label': 'description',
          }}
          {...other} />
        <Box className={classes.tips}>
          {tips}
        </Box>
      </Box>
    </FormControl>
  )
}
export default TextInput