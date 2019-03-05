/* eslint-disable */
//--------------上拉加载更多---------------
//获取滚动条当前的位置 
export function getScrollTop() {
    var scrollTop = 0  
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop  
    } else if (document.body) {
        scrollTop = document.body.scrollTop  
    }
    return scrollTop  
}

// 获取当前可视范围的高度
export function getClientHeight() {
    var clientHeight = 0  
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)  
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)  
    }
    return clientHeight  
}

// 获取文档完整的高度
export function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)  
}


// -----------------结束--------------------
