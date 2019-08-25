import React, { useEffect } from 'react';

import { useDispatch } from './store'

import { makeConfigProvide } from './provide/app/ConfigProvide'
// import Upload from './components/ui/upload'

export default (props: any) => {
  const {attachPrefix,apiUrls,locale,...rest} = props
  const dispatch = useDispatch()
  const { initConfig } = makeConfigProvide(dispatch)
  useEffect(() => {
    initConfig({
      attachPrefix,apiUrls,locale
    })
    return () => {
    };
  }, []);

  return <div>我是上传组件</div>
  // return <Upload {...rest}/>
}
