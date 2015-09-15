/**
 * 双向绑定
 */
;
(function(_,fn){
    if (typeof define === "function" && define.amd) {
        define(fn);
    } else if (typeof exports === "object") {
        module.exports = fn();
    } else {
        _.way = fn();
    }
}(window,function(){

    var $wayBind={};

    /**
     * 将绑定的函数添加到缓存列表中
     * @param name
     * @param fn
     */
    $wayBind.prototype.bind=function(name,fn){

    };

}));