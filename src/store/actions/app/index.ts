import * as types from '../../../types/app'

// Action Types
export type Action = {
    // 配置
    type: 'CONFIG',
    payload: { apiUrls: types.ApiUrls, localeConfig: types.LocaleConfig, attachPrefix: string }
}

export const CONFIG = 'CONFIG';
export const initConfig = (apiUrls: types.ApiUrls, localeConfig: types.LocaleConfig, attachPrefix: string): Action => ({
    type: CONFIG,
    payload: {
        apiUrls,
        localeConfig,
        attachPrefix
    }
});
