import {
    keyPrefix,
    setObject,
    getObject
} from './base'

import {Config} from '../types/app'

export const setConfig = (config:Config) =>{
    setObject(`${keyPrefix}-config`,config)
}
export const getConfig = (): Config=>{
    const config = getObject(`${keyPrefix}-config`)
    return config
}