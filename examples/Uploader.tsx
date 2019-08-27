const API = "/api/"
const appId = "1234"
const token = "abcd"
const attachPrefix = "http://localhost:8080/sip-api/attaches/"

// 上传组件 
import Uploader from '../src'

export const Upload = (props: any) => {

    return Uploader.Upload({
        headers: {
            'App-Id': appId,
            'User-Token': token
        },
        attachPrefix,
        apiUrls: {
            getAttachList: `${API}attach/getList`,
            getAttachListByUrls: `${API}attach/getListByUrls`,
            getGroupList: `${API}attach/group/getList`,
            saveGroup: `${API}attach/group/save`,
            removeGroup: `${API}attach/group/del`,
            removeAttach: `${API}file/delAttaches`,
            moveAttach: `${API}attach/move`,
            uploadImage: `${API}file/uploadImage`,
            uploadMedia: `${API}file/uploadMedia`,
            uploadVideo: `${API}file/uploadVideo`,
            uploadAudio: `${API}file/uploadAudio`,
            uploadFlash: `${API}file/uploadFlash`,
            uploadFile: `${API}file/uploadFile`,
        },
        ...props
    })
}

export const UploadDialog = (props: any) => {

    return Uploader.UploadDialog({
        headers: {
             'App-Id': appId,
            'User-Token': token
        },
        attachPrefix,
        apiUrls: {
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
        },
        locale:'zh',
        ...props
    })
}