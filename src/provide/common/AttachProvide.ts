import * as actions from '../../store/actions/common/attach'
/**
 * 组织逻辑
 */
export const makeAttachProvide = (dispatch: Function) => {

  // 获取附件列表
  const getAttachList = (props: any) => {
    const { params, success, failure,url } = props

    dispatch(actions.fetchList(url,params)).then((res: any) => {
      const data = res.payload && res.payload.data;
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
    const { url,urls, success, failure } = props

    dispatch(actions.fetchListByUrls(url,urls)).then((res: any) => {
      const data = res.payload && res.payload.data;
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
  const getAttachGroupList = (props: any) => {
    const { url,success, failure } = props

    dispatch(actions.fetchGroupList(url)).then((res: any) => {
      const data = res.payload && res.payload.data;
      const message = data && data.message
      if (data && data.code === 1) {
        const list = data.result.list
        // 通知Redux
        dispatch(actions.fetchGroupListSucess(list))
        // 成功返回
        if (success) {
          success(message || '请求成功')
        }
      } else {
        // 失败
        const error = {
          code: data && data && data.code || 0,
          message: message || '请求失败'
        }
        dispatch(actions.fetchGroupListFailure(error))
        // 失败返回
        failure(message || '请求失败')
      }
    })
  }

  // 移动附件
  const moveAttach = (props: any) => {
    const { url,success, failure, id, groupId } = props
    // 提交redux
    dispatch(actions.move(url,id, groupId)).then((res: any) => {
      const data = res.payload && res.payload.data;
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
    const { url,success, failure, group } = props
    // 提交redux 
    dispatch(actions.saveGroup(url,group)).then((res: any) => {
      const data = res.payload && res.payload.data;
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
    const { url,success, failure, id } = props
    // 提交redux
    dispatch(actions.removeGroup(url,id)).then((res: any) => {
      const data = res.payload && res.payload.data;
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
    const { url,success, failure, id } = props
    // 提交redux
    dispatch(actions.remove(url,id)).then((res: any) => {
      const data = res.payload && res.payload.data;
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
    getAttachGroupList,
    moveAttach,
    saveGroup,
    removeGroup,
    removeAttach
  }
}
