/**
 * version:1.1.0
 */
import Promise from 'promise';
import bindscroll from '../../bindScroll.js/bindScroll.es6';
let _win = window;
let scrollRecordsetUrl = 'scrollRecordsetUrl';
let id = '';

export default {
    setscroll () {
        _win.sessionStorage.setItem(_win.sessionStorage.getItem(scrollRecordsetUrl), window.scrollY);
    },
    setUrl (_url) {
        _win.sessionStorage.setItem(scrollRecordsetUrl, _url);
    },
    readScroll (...params) {
        let that = this;
        let PromiseArray = [];
        params.forEach(p=> {
            PromiseArray.push(new Promise(p));
        });
        Promise.all(PromiseArray).then(p=> {
            id = Math.random();
            that.eventScroll();
            that.setUrl(window.location.href);
        });
    },
    eventScroll () {
        let that = this;
        var _recorder = _win.sessionStorage.getItem(_win.sessionStorage.getItem(scrollRecordsetUrl));
        if (_recorder) {
            // 设置位置
            _win.scrollTo(0, _recorder);
        }
        bindscroll.pushOther(()=> {
            that.setscroll();
        });
    }
};
