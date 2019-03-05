/*
* localstorage.js
*/
/* eslint-disable */
export function getItem(key) {
  return decodeURIComponent(localStorage.getItem(key))
}
export function setItem(key, value) {
  // 这点要判断是字符串还是对象
  localStorage.setItem(key, encodeURIComponent(value))
}
export function removeItem(key) {
  localStorage.removeItem(key)
}
export function clear() {
  localStorage.clear()
}
// 获取使用了的localstorage的空间
export function getUsedSpace() {
  if (!window.localStorage) {
    console.log('浏览器不支持localStorage')
  }
  var size = 0
  for (item in window.localStorage) {
    if (window.localStorage.hasOwnProperty(item)) {
      size += window.localStorage.getItem(item).length
    }
  }
  console.log('used localStorage使用容量为' + (size / 1024).toFixed(2) + 'KB')
}
