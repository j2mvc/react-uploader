
/**
 * 上传模式，单个或多个
 */
export const UploadModes = {
    SINGLE:'single',
    MULTI:'multi'
}
/**
 * 上传组件类型
 */
export const UploadTypes = {
    IMAGE:'image',
    MEDIA:'media',
    VIDEO:'video',
    AUDIO:'audio',
    FILE:'file',
    FLASH:'flash',
    IMAGES:'images',
    MEDIAS:'medias',
    VIDEOS:'videos',
    AUDIOS:'audios',
    FILES:'files',
    FLASHES:'flashes'
}
/**
 * 附件类型，请求服务器判断
 */
export const AttTypes = {
    IMAGE:'image',
    MEDIA:'media',
    VIDEO:'video',
    AUDIO:'audio',
    FILE:'file',
    FLASH:'flash'
}
/**
 * 获取附件类型
 */
export const getAttType = (type:string)=>{
    if(type === 'images' || type ==='image'){
        return AttTypes.IMAGE
    }else if(type === 'medias' || type ==='media'){
        return AttTypes.MEDIA
    }else if(type === 'videos' || type ==='video'){
        return AttTypes.VIDEO
    }else if(type === 'audios' || type ==='audio'){
        return AttTypes.AUDIO
    }else if(type === 'flashes' || type ==='flash'){
        return AttTypes.FLASH
    }else {
        return AttTypes.FILE
    }
}
/**
 * 返回单个或多个上传模式
 * @param type 上传组件类型
 */
export const getUploadMode = (type:string)=>{
    if(type ==='image' 
    || type ==='media'
    || type ==='video'
    || type ==='audio'
    || type ==='flash'){
        return UploadModes.SINGLE
    }else {
        return UploadModes.MULTI
    }
}