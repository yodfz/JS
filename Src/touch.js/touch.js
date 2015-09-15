/*
 * 鼠标与触摸事件监听
 * author:zhaoyifeng
 * date:2015-4-24
 * demo:
 *       var touchobj=new touchEvents(); 默认为body可以自由传递进支持addEventListener的对象
 *       touchobj.start() 触摸开始 或者 鼠标按下
 *               .move()  移动
 *               .end     触摸离开或者鼠标弹起
 *      指定触摸事件
 *      touchobj.start=function(e){
 *          //阻止事件冒泡
 *          e.preventDefault();
 *          指定触发事件
 *      }
 * */
(function()
{
    "use strict";
    var $that=this,
        $d,
        $b;
    //$lock;
    var $hasTouch="ontouchstart" in $that;
    var $eventStart = $hasTouch?"touchstart"        :   "mousedown",
        $eventEnd   = $hasTouch?"touchend"          :   "mouseup",
        $eventMove  = $hasTouch?"touchmove"         :   "mousemove",
        $eventResize= $hasTouch?"orientationchange" :   "resize",
        $eventcancel= $hasTouch?"touchcancel"       :   "mouseup";
    var $touch;
    var $obj=null;

    $touch=function(element){
        $d=$that.document;
        $b=$d.body;
        if(element==undefined){
            $obj=$b;
        }
        $obj.addEventListener($eventStart,function(e){
            touchEvents.start(e);
        });

        $obj.addEventListener($eventEnd,function(e){
            touchEvents.end(e);
        });

        $obj.addEventListener($eventMove,function(e){
            touchEvents.move(e);
        });
        window.addEventListener($eventResize,function(e){
            touchEvents.resize(e);
        });

        $obj.addEventListener($eventcancel,function(e){

            touchEvents.cancel(e);
        });
        return touchEvents;
    };

    $touch.start=function(e){

    };
    $touch.end=function(e){

    };
    $touch.move=function(e){

    };
    $touch.resize=function(e){

    };
    $touch.cancel=function(e){
    };
    $that.touch=$touch;
}).call(this,document);
