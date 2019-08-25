// 公共系统
export interface State{
    attach :Attach;
}
    
// 附件
export interface Attach { 
    groupList?:any;// 附件分组列表
    error?: {code:number,message:string};// 错误代码
    success?: {code:number,message:string}// 错误消息
};