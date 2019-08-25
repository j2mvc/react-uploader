import { Action } from '../../actions';
import * as Actions from '../../actions/app';
import { State } from '../../state/app';

import { words } from '../../../config/locale/zh'
import { localeNames } from '../../../provide/app/ConfigProvide'

export const initialState: State = {
    apiUrls: {
        getAttachList: '/api/attach/getList',
        getAttachListByUrls: '/api/attach/getListByUrls',
        getGroupList: '/api/attach/group/getList',
        saveGroup: '/api/attach/group/save',
        removeGroup: '/api/attach/group/del',
        removeAttach: '/api/file/delAttaches',
        moveAttach: '/api/attach/move',
        uploadImage: '/api/file/uploadImage',
        uploadMedia: '/api/file/uploadMedia',
        uploadVideo: '/api/file/uploadVideo',
        uploadAudio: '/api/file/uploadAudio',
        uploadFlash: '/api/file/uploadFlash',
        uploadFile: '/api/file/uploadFile',
    },
    attachPrefix: 'http://localhost:8080/sip-api/',
    localeConfig: {
        localeNames,
        name: '简体中文',
        locale: 'zh',
        words: {
            ...words
        }
    }
};

export const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case Actions.CONFIG:
            return {
                ...state,
                localeConfig: action.payload.localeConfig,
                apiUrls: action.payload.apiUrls,
                attachPrefix: action.payload.attachPrefix
            };
        default: return state;
    }
};