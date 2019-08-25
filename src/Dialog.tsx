import React, { useEffect } from 'react';

import { useDispatch } from './store'

import { makeConfigProvide } from './provide/app/ConfigProvide'
import UploadDialog from './components/ui/upload/UploadDialog'

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

  return <UploadDialog {...rest}/>
}
