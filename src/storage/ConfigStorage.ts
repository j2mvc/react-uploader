import {
    keyPrefix,
    setObject,
    getObject
} from './base'

import {Config} from '../types/app'

// 保存语种标识
export const saveLocale = (locale:string)=>{
    setObject(`${keyPrefix}-locale`,{locale})
}
// 获取语种标识
export const getLocale = (): string=>{
    const object = getObject(`${keyPrefix}-locale`)
    return object && object.locale || 'zh'
}
export const setConfig = (config:Config) =>{
    setObject(`${keyPrefix}-config`,config)
}
export const getConfig = (): Config=>{
    const config = getObject(`${keyPrefix}-config`)
    return config
}
export const saveTheme = (theme:any) =>{
    setObject(`${keyPrefix}-theme`,theme)
}
export const getTheme = (): any=>{
    return getObject(`${keyPrefix}-theme`)
}