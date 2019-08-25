
import { words as defaultWords } from '../../config/locale/zh'
import {setConfig} from '../../storage/ConfigStorage'
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
export const defaultLocaleConfig = {
  localeNames,
  words: { ...defaultWords },
  name: '简体中文',
  locale: 'zh'
}
/**
 * 生成语种数据
 */
export const makeConfigProvide = (): Result => {

  // 切换语种
  const initConfig = async (props: any) => {
    const {
      headers,
      apiUrls,
      locale,
      attachPrefix
    } = props

    // 无值，则获取本地结果
    const { words } = await import(`../../config/locale/${locale || 'zh'}`)
    const value = words || defaultWords
    // 获取语种名称
    const name = () => getName(locale)
    const localeConfig = {
      localeNames,
      words: { ...value },
      locale,
      name
    }
    const config = {
      headers,
      apiUrls,
      localeConfig,
      attachPrefix
    }
    setConfig(config)
  }
  return {
    initConfig
  }
}