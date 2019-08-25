
import React from 'react'


const Thumb = (props: any) => {
  const { src,width,height,padding,borderRadius,borderColor } = props

  const thumb: React.CSSProperties = {
    display: 'inline-flex',
    borderRadius: borderRadius||2,
    border: `1px solid ${borderColor || '#eaeaea'}`,
    marginBottom: 8,
    marginRight: 8,
    width: width || 100,
    height: height || 100,
    padding: padding||4,
    boxSizing: 'border-box'
  };

  const thumbInner: React.CSSProperties = {
    display: 'flex',
    minWidth: 0,
    alignItems:'center',
    justifyContent:'center',
    overflow: 'hidden'
  };

  const img: React.CSSProperties = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };

  return (
    <div style={thumb}>
      <div style={thumbInner}>
        {src && <img
          src={src}
          style={img}
        />}
      </div>
    </div>
  )
}
export default Thumb