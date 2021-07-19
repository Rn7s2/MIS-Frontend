// rn7s2 WTFPL
// 我就没想明白JS连locale date都有了，为啥不提供ISO格式字符串的本地时间

export const today = new Date()
export const monthBefore = new Date()
export const monthAfter = new Date()
monthBefore.setMonth(today.getMonth() - 1)
monthAfter.setMonth(today.getMonth() + 1)

export function getLocaleISODateString () {
  const date = new Date()
  const year = date.getFullYear().toString()
  let month = date.getMonth() + 1
  if (month < 10) {
    month = '0' + month.toString()
  } else {
    month = month.toString()
  }
  let day = date.getDate()
  if (day < 10) {
    day = '0' + day.toString()
  } else {
    day = day.toString()
  }
  return year + '-' + month + '-' + day
}

export function getLocaleISODateStringFromDate (date) {
  const year = date.getFullYear().toString()
  let month = date.getMonth() + 1
  if (month < 10) {
    month = '0' + month.toString()
  } else {
    month = month.toString()
  }
  let day = date.getDate()
  if (day < 10) {
    day = '0' + day.toString()
  } else {
    day = day.toString()
  }
  return year + '-' + month + '-' + day
}
