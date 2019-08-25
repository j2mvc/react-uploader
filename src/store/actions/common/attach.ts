import { AxiosRequestConfig } from 'axios';
import * as types from '../../../types'
import * as commonTypes from '../../../types/common'


// Action Types
export type Action = {
    // 附件列表
    type: 'COMMON_ATTACH_FETCH_LIST',
    payload: { client: 'default', request: AxiosRequestConfig }
}
    | {
        // 按URL列表获取附件列表
        type: 'COMMON_ATTACH_FETCH_LIST_BY_URLS',
        payload: { client: 'default', request: AxiosRequestConfig }
    }
        | {
        // 分组列表
        type: 'COMMON_ATTACH_GROUP_FETCH_LIST',
        payload: { client: 'default', request: AxiosRequestConfig }
    }
    | { type: 'COMMON_ATTACH_GROUP_FETCH_LIST_SUCCESS', payload: any }
    | { type: 'COMMON_ATTACH_GROUP_FETCH_LIST_FAILURE', payload: { error: types.Error } }
    | {
        // 保存分组
        type: 'COMMON_ATTACH_GROUP_SAVE',
        payload: { client: 'default', request: AxiosRequestConfig }
    }| {
        // 删除分组
        type: 'COMMON_ATTACH_GROUP_REMOVE',
        payload: { client: 'default', request: AxiosRequestConfig }
    }| {
        // 删除附件
        type: 'COMMON_ATTACH_REMOVE',
        payload: { client: 'default', request: AxiosRequestConfig }
    }| {
        // 移动附件到其他分组
        type: 'COMMON_ATTACH_MOVE',
        payload: { client: 'default', request: AxiosRequestConfig }
    };


// 附件列表
export const FETCH_LIST = 'COMMON_ATTACH_FETCH_LIST'
export const fetchList = (url:string,params: any): Action => ({
    type: FETCH_LIST,
    payload: {
        client: 'default',
        request: {
            url,
            method: 'GET',
            params: {
                ...params
            }
        }
    }
})






// 按URL获取附件列表
export const FETCH_LIST_BY_URLS = 'COMMON_ATTACH_FETCH_LIST_BY_URLS'
export const fetchListByUrls = (url:string,urls: string[]): Action => ({
    type: FETCH_LIST,
    payload: {
        client: 'default',
        request: {
            url,
            method: 'POST',
            params: {
                urls
            }
        }
    }
})


// 分组列表
export const GROUP_FETCH_LIST = 'COMMON_ATTACH_GROUP_FETCH_LIST'
export const GROUP_FETCH_LIST_SUCCESS = 'COMMON_ATTACH_GROUP_FETCH_LIST_SUCCESS';
export const GROUP_FETCH_LIST_FAILURE = 'COMMON_ATTACH_GROUP_FETCH_LIST_FAILURE';
export const fetchGroupList = (url:string): Action => ({
    type: GROUP_FETCH_LIST,
    payload: {
        client: 'default',
        request: {
            url,
            method: 'GET'
        }
    }
})
export const fetchGroupListSucess = (list: commonTypes.AttachGroup[]): Action => ({
    type: GROUP_FETCH_LIST_SUCCESS,
    payload: {
        list
    }
});
export const fetchGroupListFailure = (error: types.Error): Action => ({
    type: GROUP_FETCH_LIST_FAILURE,
    payload: {
        error
    }
});



// 保存分组
export const SAVE_GROUP = 'COMMON_ATTACH_GROUP_SAVE'
export const saveGroup = (url:string,data: commonTypes.AttachGroup): Action => ({
    type: SAVE_GROUP,
    payload: {
        client: 'default',
        request: {
            url,
            method: 'POST',
            data: {
                group:data
            }
        }
    }
})



// 删除分组
export const REMOVE_GROUP = 'COMMON_ATTACH_GROUP_REMOVE'
export const removeGroup = (url:string,id: string[]): Action => ({
    type: REMOVE_GROUP,
    payload: {
        client: 'default',
        request: {
            url,
            method: 'POST',
            data: {
                id
            }
        }
    }
})




// 删除附件
export const REMOVE = 'COMMON_ATTACH_REMOVE'
export const remove = (url:string,id: string[]): Action => ({
    type: REMOVE,
    payload: {
        client: 'default',
        request: {
            url,
            method: 'POST',
            data: {
                id
            }
        }
    }
})


// 设置状态
export const MOVE = 'COMMON_ATTACH_MOVE'
export const move = (url:string,id:string[],groupId:string): Action => ({
    type: MOVE,
    payload: {
        client: 'default',
        request: {
            url,
            method: 'POST',
            data: {
                id,groupId
            }
        }
    }
})
