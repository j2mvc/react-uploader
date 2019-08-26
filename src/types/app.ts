
// 配置
export interface Config  {
    apiUrls: ApiUrls;//接口配置
    localeConfig:LocaleConfig;//语种
    attachPrefix:string;// 附件前缀
    headers:any;// 请求头
    theme:any;// 主题
}
// 接口
export interface ApiUrls {
    getAttachList:string;
    getAttachListByUrls:string;
    getGroupList:string;
    saveGroup:string;
    removeGroup:string;
    removeAttach:string;
    moveAttach:string;
    uploadImage:string;
    uploadMedia:string;
    uploadVideo:string;
    uploadAudio:string;
    uploadFlash:string;
    uploadFile:string;
}

// 语种名称值
export interface LocaleName {
    locale:string;// 值
    name:string// 名称
}
// 语种配置
export interface LocaleConfig{
    localeNames:LocaleName[];
    locale:string;// 当前语种值
    name:any;// 当前语种名称
    words:any
}