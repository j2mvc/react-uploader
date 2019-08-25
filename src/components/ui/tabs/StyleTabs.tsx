import React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
  className?: any;
  ariaprefix?: string;
}
export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, className, ariaprefix, ...other } = props;

  return (
    <Box
      component="div"
      role="tabpanel"
      className={className}
      hidden={value !== index}
      id={`${ariaprefix}-tabpanel-${index}`}
      aria-labelledby={`${ariaprefix}-tab-${index}`}
      {...other}
    >
      {children}
    </Box>
  );
}
/**
 * 标签栏
 */
const useTabsStyles = makeStyles((theme: Theme) =>
  createStyles({
    indicator: {
      backgroundColor: 'transparent',
      '& > div': {
        maxWidth: 40,
        width: '100%'
      },
    },
    scrollButtons: {
      height: '38px',
      color: '#eee',
    }
  }))
interface StyledTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
  children: any;
  orientation?: any;
  variant?: any;
}
export const StyleTabs = (props: StyledTabsProps) => {
  const classes = useTabsStyles()
  return <Tabs
    classes={classes}
    {...props}
    TabIndicatorProps={{ children: <div /> }} />
}

/**
 * 标签条目
 */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      textTransform: 'none',
      minWidth: 180,
      maxWidth: 'auto',
      fontWeight: theme.typography.fontWeightRegular,
      padding: '0 10px 0 10px',
      minHeight: '38px',
      fontSize: '.9em',
      display: 'flex',
      color: '#333',
      background: 'transparent',
      '&:hover': {
        opacity: 1,
        color: '#333',
        backgroundColor: '#efefef'
      },
      // '&$selected': {
      // }
    },
    selected: {
      opacity: 1,
      color: '#333',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: '#fff',
      '&:hover': {
        opacity: 1,
        backgroundColor: '#fff'
      },
    },
  }))

export const StyleTab = (props: any) => {
  const classes = useStyles()
  const { selected, index, ariaprefix, defaultClassName, selectedClassName,...other } = props
  return (
    <Tab
      className={clsx(defaultClassName || classes.root, {
        [selectedClassName || classes.selected]: selected
      })}
      disableRipple
      id={`${ariaprefix}-tab-${index}`}
      aria-controls={`${ariaprefix}-tabpanel-${index}`}
      selected={selected}
      index={index}
      {...other} />)
}
