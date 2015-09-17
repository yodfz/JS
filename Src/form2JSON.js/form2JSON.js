/**
 * Created by Administrator on 2015/9/17.
 */
;(function(_,fn){
    if (typeof define === "function" && define.amd) {
        define(fn);
    } else if (typeof exports === "object") {
        module.exports = fn();
    } else {
        _.form2JSON = fn();
    }
}(
    this,function(){

    }
));