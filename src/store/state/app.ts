import * as appTypes from '../../types/app'

// 应用配置及运行
export interface State {
    apiUrls:appTypes.ApiUrls;// 接口地址列表
    localeConfig: appTypes.LocaleConfig;// 当前语种
    attachPrefix:string;// 附件前缀
};