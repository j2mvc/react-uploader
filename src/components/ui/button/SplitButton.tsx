import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

// const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

export default function SplitButton(props:any) {
  const {options,onSelect,label,onClick,className} = props
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null as any);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [minWidth,setMinWidth] = React.useState(0)
  const paperStyle:React.CSSProperties = {
    minWidth
  }
  React.useEffect(()=>{
    const groupWidth = anchorRef.current.clientWidth
    setMinWidth(groupWidth)
  })

  function handleMenuItemClick(event: any, index: number) {
    setSelectedIndex(index);
    setOpen(false);
    if(onSelect){
      onSelect(options[index])
    }
  }

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  }

  function handleClose(event: any) {
    setOpen(false);
  }


  return (
    <Box className={className}>
      <ButtonGroup 
        variant="outlined" 
        color="primary" 
        ref={anchorRef as any} 
        aria-label="split button">
        <Button onClick={(event:any)=>{
          if(onClick){
            onClick(event,options && options[selectedIndex])
          }
        }}>{label || options && options[selectedIndex].name}</Button>
        <Button
          color="primary"
          size="small"
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup> 
      <Popper open={open} anchorEl={anchorRef && anchorRef.current} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper id="menu-list-grow" style={paperStyle}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {options && options.map((option:any, index:number) => (
                    <MenuItem
                      key={option.id}
                      selected={index === selectedIndex}
                      onClick={event => handleMenuItemClick(event, index)}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
