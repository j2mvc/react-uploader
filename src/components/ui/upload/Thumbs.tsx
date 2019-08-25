
import React, { useState,useCallback } from 'react'

import clsx from 'clsx'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '../../Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';

import { useMappedState } from '../../../store'
import * as State from '../../../store/state'

import ExtIcon from './ExtIcon'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      margin: 0,
      fontSize: '1rem'
    },
    thumbsContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    thumb: {
      position: 'relative',
      display: 'inline-flex',
      borderRadius: 3,
      border: '1px solid #eaeaea',
      marginBottom: 5,
      marginRight: 5,
      width: 100,
      height: 100,
      padding: 2,
      boxSizing: 'border-box',
      background: '#fcfcfc',
      cursor: 'pointer'
    },
    disabled:{
      opacity: 0.2,
      background: 'rgba(0, 0, 0, 0.2)',
    },
    active: {
      opacity: 0.5,
      background: 'rgba(225, 225, 225, 0.5)',
    },
    thumbInner: {
      display: 'flex',
      minWidth: 0,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    },
    img: {
      display: 'block',
      width: 'auto',
      height: '100%'
    },
    thumbTool: {
      display: 'flex',
      position: 'absolute',
      right: 2,
      top: 2
    },
    thumbIcons: {
      position: 'absolute',
      right: 2,
      top: 2
    },
    fileThumbsContainer: {
      display: 'block',
      marginTop: 10
    },
    fileThumb: {
      position: 'relative',
      display: 'flex',
      borderBottom: '1px solid #eaeaea',
      padding: 4,
      cursor: 'pointer'
    },
    fileThumbInner: {
      flex: '1',
      display:'flex',
      flexWrap:'nowrap',
      alignItems:'center'
    },
    fileThumbTool: {
      width: 60,
      display: 'flex',
      right: 2,
      top: 2
    },
    successIcon: {
      marginLeft: 5,
      background: '#fff',
      borderRadius: '50%'
    },
  }))
export type ThumbsProps = {
  type:string,
  attaches:any,
  selected?:any,
  onSelect?:Function,
  onRemove?:Function,
  disabled?:any
}

const ThumbsPage = (props: ThumbsProps) => {
  const { localeConfig,attachPrefix} = useMappedState(
    useCallback(
      (state: State.Root) => ({
        attachPrefix:state.app.attachPrefix,
        localeConfig: state.app.localeConfig
      }),
      [],
    ),
  );
  const { onRemove, attaches, type, onSelect, selected,disabled } = props
  // 样式 
  const classes = useStyles()

  const [hoverd, setHoverd] = useState()// 鼠标经过状态

  return (
    <div className={classes.root}>
      <Box className={type === 'images' || type === 'image' ?
      classes.thumbsContainer :
      classes.fileThumbsContainer}>
      {
        attaches && attaches.length > 0 &&
        attaches.map((attach: any, index: number) => {
          return (
            <div
              className={type === 'images' || type === 'image' ?
                clsx(classes.thumb, {
                  [classes.active]: selected && selected[attach.id],
                  [classes.disabled]:disabled && disabled[attach.id]
                }) :
                clsx(classes.fileThumb, {
                  [classes.active]: selected && selected[attach.id],
                  [classes.disabled]:disabled && disabled[attach.id]
                })
              }
              key={attach.id}
              onClick={() => {
                if (onSelect && (!(disabled && disabled[attach.id]))) {
                  // 有设置选中方法，且不为禁止选择
                  onSelect(attach)
                }
              }}
              onMouseEnter={() => {
                const newHoverd = hoverd || {}
                newHoverd[attach.id] = true
                setHoverd(Object.assign({}, newHoverd))
              }}
              onMouseLeave={() => {
                const newHoverd = hoverd || {}
                newHoverd[attach.id] = false
                setHoverd(Object.assign({}, newHoverd))
              }}>
              {type === 'images' || type === 'image' ?(
                <div className={classes.thumbInner}>
                  <img
                    src={attachPrefix + attach.url}
                    className={classes.img}
                  />
                </div> ):(
                <div className={classes.fileThumbInner}>
                  {/* 文件 */}
                  <ExtIcon filename={attach.url}/>
                  {attach.url.substring(attach.url.lastIndexOf('/') + 1, attach.url.length)}
                </div>)
              }
              {
                onRemove && hoverd && hoverd[attach.id] && (
                  <div className={classes.thumbTool} >
                    {/* 删除 */}
                    <Tooltip
                      aria-label="add"
                      title={localeConfig.words.remove}>
                      <Fab
                        size="small"
                        color="default"
                        onClick={() => {
                          onRemove({
                            index,
                            attach
                          })
                        }}>
                        <DeleteIcon fontSize="small" />
                      </Fab>
                    </Tooltip>
                  </div>
                )
              }
              {
                selected && selected[attach.id] && (
                  <div className={classes.thumbIcons}>
                    <Icon name="Success" className={classes.successIcon} color={'green'} width={20} height={20} />
                  </div>
                )
              }
            </div>
          )
        })
      }
    </Box>
    </div>)

}
export default ThumbsPage