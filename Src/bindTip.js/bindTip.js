/**
 * 绑定一个Tip到绑定的控件上
 */
;
(function(_,fn){
    if (typeof define === "function" && define.amd) {
        define(fn);
    } else if (typeof exports === "object") {
        module.exports = fn();
    } else {
        _.bindTip = fn();
    }
}(this,function(){
    var $dom,$domRect,$bindTip=function(_){
        //根据给予的_寻找合适的控件查找
        switch(_.constructor){
            case HTMLParagraphElement:{
                $dom=_;
            }break;
            case String:{
                $dom=document.querySelector(_);
            }break;
        }
        $domRect= _.getBoundingClientRect();
    };

}));