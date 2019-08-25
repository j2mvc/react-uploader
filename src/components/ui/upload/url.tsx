
import React, { useState } from 'react'

import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 10,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }))


const TypeDialog = (props: any) => {
  const classes = useStyles()
  const {localeConfig,success,defaultUrl} = props

  const [url, setUrl] = useState(defaultUrl);


  return (
    <Box className={classes.root}>

      <TextField
        name="url"
        value={url}
        required
        fullWidth
        margin="dense"
        label="链接地址"
        placeholder="链接地址以http://或https://开头"
        onChange={(event: any) => {
          setUrl(event.target.value)
        }}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={()=>{
          success(url)
        }}
      >
        {localeConfig.words.sure.toUpperCase()}
      </Button>
    </Box>
  );
}
export default TypeDialog