import React from 'react'

export type ExtIconProps = {
    filename: string,
    width?: number,
    height?: number,
    className?: any
}
/**
 * 文件图标显示
 */
export const ExtIcon = (props: ExtIconProps) => {
    const { filename, width, height, className } = props
    const fileExtIcon = require('../../../assets/exticons/file.png')
    const ext = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
    let extIcon:any
    try{
        extIcon = require(`../../../assets/exticons/${ext}.png`)
    }catch(e){
        extIcon = fileExtIcon
    }
    const imgStyle: React.CSSProperties = {
        width: width || 26,
        height: height || 26,
        border:0,
        margin:'0 5px 0 0'
    } ;

    return (<span className={className}>
        <img src={extIcon} style={imgStyle} />
    </span>
    )
}
export default ExtIcon