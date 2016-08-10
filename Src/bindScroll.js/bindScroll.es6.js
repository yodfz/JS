let eventData = [];
let isEvent = false;
let t;
//滚动条在Y轴上的滚动距离

let getScrollTop = () => {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
};

//文档的总高度

let getScrollHeight = () => {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
};

//浏览器视口的高度

let getWindowHeight = () => {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
};

let checkBottom = () => {
    if (getScrollTop() + getWindowHeight() == getScrollHeight()) {
        eventData.forEach(p=> {
            p();
        });
        return true;
    }
    return false;
};

// TODO 滚动条自动加载
export default {
    bind () {
        let onscrollEvent = window.onscroll;
        window.onscroll = () => {
            onscrollEvent();
            clearTimeout(t);
            t = setTimeout(function () {
                checkBottom();
            }, 300);
        };
    },
    push (event) {
        eventData.push(event);
    },
    clear () {
        eventData.length = 0;
    }
};
