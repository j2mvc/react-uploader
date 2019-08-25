
export const formatDateTime = (value:string) => {

  if (value && /\d+/.test(value)) {
    value = value.length === 10 ? value + '000' : value;
    let date = new Date(Number(value));
    let now = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    // let hour = date.getHours();
    // let minute = date.getMinutes();
    // let second = date.getSeconds();
    let time = now.getTime(); 

    if (now.getFullYear() == year
      && now.getMonth() == month
    ) {
      // 本月
      if (now.getDate() == day) {
        // 今天
        let s = 1000;
        let m = Number(time) - Number(value);
        //console.log('time:'+hour+":"+minute+':'+second);
        if (m < (s * 60)) {
          return Number(m / s) + "秒前";
        } else if (m < (s * 60 * 60)) {
          return Number(m / (s * 60)) + "分钟前";
        } else {
          return Number(m / (s * 60 * 60)) + "小时前";
        }
      } else {
        return (now.getDate() - day) + "天前";
      }
    } else {
      return year + '-' + (month + 1) + '-' + day
    }
  } else {
    return 'wrong date';
  }
}

/**
 * @description 生成UUID
 */
export const createId = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0; var v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
} 