/* eslint-disable */
window.imgHead = "http://xiaoyu1-1253813687.costj.myqcloud.com/";

export function setTitle(item) {
    document.title = item;
}
/**
 * 更新信息
 * 
 * @param item
 */
export function isEmail(str) {
    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    if (re.test(str))
        return true;
    return false;

}
export function checkPwd(str) {
    if (str.length >= 6)
        return true;
    return false;
}
export function isMobile(str) {
    var re = /^1\d{10}$/
    if (re.test(str))
        return true;
    return false;
}
export function getAgent() {
    var agent = navigator.userAgent.toLowerCase();
    return agent;
}
export function getDevice() {
    var agent = navigator.userAgent.toLowerCase();
    var osName = function () {
        if (/windows/.test(agent)) {
            return 'windows';
        } else if (/iphone|ipod|ipad|ios/.test(agent)) {
            return 'ios';
        } else if (/android/.test(agent)) {
            return 'android';
        } else if (/linux/.test(agent)) {
            return 'linux';
        }
    };
    return osName();

}
//
export function unbindScroll() {
    // $(window).unbind('scroll')
    window.onscroll = () => { }
}
// tool function

/**
 * 时间转化
 * 
 * @param time
 * @returns {String}
 */
export function D2Str(time) {
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}

export function isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
export function checkNull(item) {
    if (item == null || item == undefined || item == 'undefined' || item == "" || item == "null") {
        return true;
    }
    return false;
}
