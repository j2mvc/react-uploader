export const image = "image/*"
export const flash = ".swf,.flv"
export const media = ".swf,.flv,.mp4,.3gp,.mp3,.wav,.wma,.wmv,.mid,.avi,.mpg,.asf,.rm,.rmvb"
export const video = ".mp4,.3gp,.wav,.wma,.wmv,.mid,.avi,.mpg,.asf,.rm,.rmvb"
export const audio = ".mp3,.wav,.wma,.wmv"
export const file   = ".sql,.js,.css,.jsp,.html,.doc,.docx,.xls,.xlsx,.ppt,.htm,.html,.txt,.zip,.rar,.gz,.bz2"

export const getAccept = (type:string)=>{
    if(type === 'images' || type === 'image'){
        return image
    }else if(type === 'medias' || type === 'media'){
        return media
    }else if(type === 'videos' || type === 'video'){
        return video
    }else if(type === 'audios' || type === 'audio'){
        return audio
    }else if(type === 'flashes' || type === 'flash'){
        return audio
    }else {
        return file
    }
}
export default getAccept