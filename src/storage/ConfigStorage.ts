import {
    keyPrefix,
    setObject,
    getObject
} from './base'

import { defaultLocaleConfig } from '../provide/ConfigProvide'
import * as Themes from '../config/Themes';

import {Config} from '../types/app'

const apiUrls = {
  getAttachList: `/api/attach/getList`,
  getAttachListByUrls: `/api/attach/getListByUrls`,
  getGroupList: `/api/attach/group/getList`,
  saveGroup: `/api/attach/group/save`,
  removeGroup: `/api/attach/group/del`,
  removeAttach: `/api/file/delAttaches`,
  moveAttach: `/api/attach/move`,
  uploadImage: `/api/file/uploadImage`,
  uploadMedia: `/api/file/uploadMedia`,
  uploadVideo: `/api/file/uploadVideo`,
  uploadAudio: `/api/file/uploadAudio`,
  uploadFlash: `/api/file/uploadFlash`,
  uploadFile: `/api/file/uploadFile`,
}
const defaultConfig = {
    theme:Themes.defaultTheme,
    apiUrls,
    localeConfig:defaultLocaleConfig
}

export const setConfig = (config:Config) =>{
    setObject(`${keyPrefix}-config`,config)
}
export const getConfig = (): Config=>{
    let config = getObject(`${keyPrefix}-config`)
    if(!config){
        config = defaultConfig
    }else if(!config.apiUrls){
        config.apiUrls = apiUrls
    }else if(!config.localeConfig){
        config.localeConfig = defaultLocaleConfig
    }else if(!config.theme){
        config.theme = Themes.defaultTheme
    }
    return config
}