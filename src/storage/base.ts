export const keyPrefix = 'j2mvc-react-uploader';

export const setObject = (key:string, value:Object)=>{
    if(value)
    localStorage.setItem(key,JSON.stringify(value))
}
export const getObject = (key:string)=>{
    const str = localStorage.getItem(key)
    if(str && str !== 'null'){
        return JSON.parse(str)
    }
}