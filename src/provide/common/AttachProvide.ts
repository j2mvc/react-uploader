import {httpGet,httpPost} from '../../api'
import {getConfig} from '../../storage/ConfigStorage'
/**
 * 组织逻辑
 */
export const makeAttachProvide = () => {

  const {headers,apiUrls} = getConfig()

  // 获取附件列表
  const getAttachList = (props: any) => {
    const { params, success, failure,url } = props
    httpGet({
      headers,
      url:apiUrls.getAttachList,
      params
    }).then((res: any) => {
      const data = res.data;
      const message = data && data.message
      if (data && data.code === 1) {
        const list = data.result.list
        const pagination = data.result.pagination
        // 成功返回
        if (success) {
          success({
            list,
            pagination,
            message: message || '请求成功'
          })
        }
      } else {
        // 失败返回
        failure(message || '请求失败')
      }
    })
  }
  // 获取附件列表
  const getAttachListByUrls = (props: any) => {
    const { urls, success, failure } = props
    httpPost({
      headers,
      url:apiUrls.getAttachListByUrls,
      data:{
        urls
      }
    }).then((res: any) => {
      const data = res.data;
      const message = data && data.message
      if (data && data.code === 1) {
        const list = data.result.list
        // 成功返回
        if (success) {
          success(list)
        }
      } else {
        // 失败返回
        failure(message || '请求失败')
      }
    })
  }

  // 获取附件分组列表
  const getGroupList = (props: any) => {
    const { success, failure } = props

    httpGet({
      headers,
      url:apiUrls.getGroupList,
    }).then((res: any) => {
      const data = res.data;
      const message = data && data.message
      if (data && data.code === 1) {
        const list = data.result.list
        // 成功返回
        if (success) {
          success(list)
        }
      } else {
        // 失败返回
        failure(message || '请求失败')
      }
    })
  }

  // 移动附件
  const moveAttach = (props: any) => {
    const { success, failure, id, groupId } = props
    httpPost({
      headers,
      url:apiUrls.moveAttach,
      data:{id, groupId}
    }).then((res: any) => {
      const data = res.data;
      if (data && data.code === 1) {
        // 成功返回
        if (success) {
          success(data.message || '移动图片完成')
        }
      } else {
        // 失败返回
        const message = data && data.message
        failure(message || '移动图片失败')
      }
    })
  }

  // 保存分组
  const saveGroup = (props: any) => {
    const { success, failure, group } = props
    // 提交redux 
    httpPost({
      headers,
      url:apiUrls.saveGroup,
      data:{
        group
      }
    }).then((res: any) => {
      const data = res.data;
      if (data && data.code === 1) {
        // 成功返回
        if (success) {
          success(data.message || '保存成功')
        }
      } else {
        // 失败返回
        const message = data && data.message
        failure(message || '添加失败')
      }
    })
  }

  // 删除分组
  const removeGroup = (props: any) => {
    const {success, failure, id } = props
    httpPost({
      headers,
      url:apiUrls.removeGroup,
      data:{
        id
      }
    }).then((res: any) => {
      const data = res.data;
      if (data && data.code === 1) {
        // 成功返回
        if (success) {
          success(data.message || '删除成功')
        }
      } else {
        // 失败返回
        const message = data && data.message
        failure(message || '删除失败')
      }
    })
  }

  // 删除分组
  const removeAttach = (props: any) => {
    const {success, failure, id } = props
    httpPost({
      headers,
      url:apiUrls.removeAttach,
      data:{id}
    }).then((res: any) => {
      const data = res.data;
      if (data && data.code === 1) {
        // 成功返回
        if (success) {
          success(data.message || '删除成功')
        }
      } else {
        // 失败返回
        const message = data && data.message
        failure(message || '删除失败')
      }
    })
  }
  // 返回实时信息提交页面处理
  return {
    getAttachList,
    getAttachListByUrls,
    getGroupList,
    moveAttach,
    saveGroup,
    removeGroup,
    removeAttach
  }
}
