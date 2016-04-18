/*
 * 鼠标与触摸事件监听
 * author:zhaoyifeng
 * date:2015-4-24
 * demo:
 *       var touchobj=new touch(); 默认为body可以自由传递进支持addEventListener的对象
 *       touchobj.start() 触摸开始 或者 鼠标按下
 *               .move()  移动
 *               .end     触摸离开或者鼠标弹起
 *      指定触摸事件
 *      touchobj.start=function(e){
 *          //阻止事件冒泡
 *          e.preventDefault();
 *          指定触发事件
 *      }
 * 接口:
 * start    触摸开始
 * end      触摸结束
 * move     按住移动
 * cancel   取消触摸
 * resize   窗口改变大小
 * */
(function () {
    "use strict";

    var $touch = function (element) {
        var $that = this,
            $d,
            $b;
        //$lock;
        var $hasTouch = "ontouchstart" in $that;
        var $eventStart = $hasTouch ? "touchstart" : "mousedown",
            $eventEnd = $hasTouch ? "touchend" : "mouseup",
            $eventMove = $hasTouch ? "touchmove" : "mousemove",
            $eventResize = $hasTouch ? "orientationchange" : "resize",
            $eventcancel = $hasTouch ? "touchcancel" : "mouseup";
        var $obj = null;

        $d = $that.document;
        $b = $d.body;
        if (element == undefined) {
            $obj = $b;
        }
        else {
            $obj = element;
        }

        $obj.addEventListener($eventStart, function (e) {
            this.start(e);
        });

        $obj.addEventListener($eventEnd, function (e) {
            this.end(e);
        });

        $obj.addEventListener($eventMove, function (e) {
            this.move(e);
        });

        window.addEventListener($eventResize, function (e) {
            this.resize(e);
        });

        $obj.addEventListener($eventcancel, function (e) {
            this.cancel(e);
        });
        return $touch;
    };

    $touch.start = function (e) {

    };
    $touch.end = function (e) {

    };
    $touch.move = function (e) {

    };
    $touch.resize = function (e) {

    };
    $touch.cancel = function (e) {
    };
    $that.touch = $touch;
}).call(this, document);