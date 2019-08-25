import { saveLocale, getLocale } from '../../storage/ConfigStorage'
import * as actions from '../../store/actions/app'

import { words as defaultWords } from '../../config/locale/zh'
export const localeNames = [{
  name: '简体中文',
  locale: 'zh'
}, {
  name: 'English',
  locale: 'en'
}];
// 获取语种名称
export const getName = (locale: string) => {
  let name
  localeNames.map(l => {
    if (l.locale === locale) {
      name = l.name
      return;
    }
  })
  return name
}
interface Result {
  initConfig: Function
}
/**
 * 生成语种数据
 */
export const makeConfigProvide = (dispatch: Function): Result => {

  // 切换语种
  const initConfig = async (props: any) => {
    const {
      apiUrls,
      locale,
      attachPrefix
    } = props

    // 无值，则获取本地结果
    const { words } = await import(`../../config/locale/${locale}`)
    const value = words || defaultWords
    // 获取语种名称
    const name = () => getName(locale)
    const localeConfig = {
      localeNames,
      words: { ...value },
      locale,
      name
    }
    // 保存语种标识到本地
    saveLocale(locale)
    // 执行redux
    dispatch(actions.initConfig(apiUrls,localeConfig,attachPrefix))
  }
  return {
    initConfig
  }
}