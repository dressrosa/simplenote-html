/* eslint-disable */
var confirmjBox;
$(function () {
    getDevice();
})

export function setTitle(item) {
    document.title = item;
}
/**
 * 更新信息
 * 
 * @param item
 */
export function update(item) {// 传入action
    $.ajax({
        cache: true,
        type: "POST",
        url: item,
        data: $('#xyForm').serialize(),
        async: false,
        error: function (data) {
            new jBox('Notice', {
                color: 'red',
                animation: 'tada',
                content: '服务器错误!'
            });
            return false;
        },
        success: function (data) {
            if (data == 'success') {
                new jBox('Notice', {
                    color: 'red',
                    animation: 'tada',
                    content: '更新成功!'
                });
                confirmjBox.close();
            } else {
                new jBox('Notice', {
                    color: 'red',
                    animation: 'tada',
                    content: '更新失败!'
                });
            }
            return true;
        }
    });
};
/**
 * 提交表单
 * 
 * @param item
 */
export function postForm(item) {
    $.ajax({
        cache: true,
        type: "POST",
        url: item,
        data: $('#xyForm').serialize(),
        async: false,
        error: function (data) {
            new jBox('Notice', {
                color: 'red',
                animation: 'tada',
                content: '服务器错误!'
            });
            return false;
        },
        success: function (data) {
            if (data == 'success') {
                new jBox('Notice', {
                    color: 'red',
                    animation: 'tada',
                    content: '添加成功!'
                });
            } else {
                new jBox('Notice', {
                    color: 'red',
                    animation: 'tada',
                    content: '添加失败!'
                });
            }
            return true;
        }
    });
}

/**
 * 根据id查看详情
 * 
 * @param item
 */
export function getDetail(action, item) {
    new jBox('Modal', {
        width: 700,
        height: 600,
        title: "详细信息",
        closeButton: 'title',
        closeOnClick: false,
        draggable: "title",
        ajax: {
            url: action,
            data: 'id=' + item,
            reload: true
        }
    }).open();
}
var myModal;// 定义全局变量,用作弹出窗口上传后,关闭弹出框
export function uploadFile() {
    if (myModal != null) {// 判断是否前一次的没有清除
        myModal.destroy();
    }
    myModal = new jBox('Modal', {
        height: document.body.clientHeight * 0.50,
        width: document.body.clientHeight * 0.45,
        animation: 'slide',
        closeButton: 'title',
        closeOnClick: false,
        //draggable : "title",
        title: "上传图片",
        ajax: {
            url: "/user/upload",
            reload: true
        },
        onCloseComplete: function (e) {
            myModal.destroy();
        },
    });
    myModal.open();
}

var tip;// 定义全局变量,用作弹出窗口上传后,关闭弹出框
export function showTip(msg) {
    if (tip != null) {// 判断是否前一次的没有清除
        tip.destroy();
    }
    tip = new jBox('Notice', {
        content: msg,
        animation: 'zoomIn',
        position: {
            x: 'center',
            y: 'center'
        },
        autoClose: 1000,
        closeOnClick: true
    });
    tip.open();
}
/*
 * 转向登陆页面,并记录当前页面的地址
 */
export function gotoLogin(nowUrl) {
    $.session.set('nowUrl', nowUrl, true);
    window.location.href = "/login";
}
/* logout */
export var logout = function () {
    $.session.remove('user');
    $.ajax({
        type: "post",
        url: "/api/v1/user/logout",
        success: function () {
            window.location.href = window.location.href.replace(/#/g, '');
        }
    });
}
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
