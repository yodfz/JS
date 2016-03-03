///<reference path="touch.js">
/**
 * 轮播切换JS
 * author:zhaoyifeng
 * 需求:touch.js支持
 */
(function (_, _fn) {
    if (_["define"] != undefined && typeof define === "function" && define.amd) {
        define(_fn);
    } else if (typeof exports === "object") {
        module.exports = _fn();
    } else {
        _.touchBanner = _fn();
    }
}(this, function () {
    var $fn, $utils;
    $utils = {
        //removeClass: function (_e, _className) {
        //
        //},
        //addClass: function (_e, _className) {
        //
        //},
        getXY: function (_e) {
            //用于扩展JQ的触摸事件
            var $x, $y;
            if (_e.originalEvent && _e.originalEvent.changedTouches) {
                $x = _e.originalEvent.changedTouches[0].pageX;
                $y = _e.originalEvent.changedTouches[0].pageY;
            } else if (_e.changedTouches) {
                $x = _e.changedTouches[0].pageX;
                $y = _e.changedTouches[0].pageY;
            }
            else {
                $x = _e.pageX;
                $y = _e.pageY;
            }
            return {x: $x, y: $y};
        },
        setCSS: function (_e, _key, _s) {
            _e.style["-webkit-" + _key] = _s;
            _e.style["-moz-" + _key] = _s;
            _e.style["-ms-" + _key] = _s;
            _e.style["-o-" + _key] = _s;
            _e.style[_key] = _s;
        }
    };
    $fn = function (_opt) {
        var /*基本配置*/$opt = {},
        /*表示是否已经触发TOUCH*/$isStart = false,
        /*表示touch触发位置*/$mouse = {};
        var $html = [], $i, /*记录当前BANNER的位置*/$bgX, $bgTransform;
        var /*屏幕宽度*/$Width = document.documentElement.clientWidth;
        var $touchEvent;
        if (typeof _opt === "string") {
            $opt.id = _opt;
            $opt.obj = document.querySelector($opt.id);
        }
        //当前显示的序号
        $opt.index = 1;
        $opt.ele = {};
        //初始化节点
        $opt.ele.bg = $opt.obj.querySelector(".bg");
        $opt.ele.bgNode = $opt.obj.querySelectorAll(".bgNode");

        //初始化圆点
        $i = $opt.ele.bgNode.length;
        for (var i = 0; i < $i; i++) {
            $html.push('<i class="dot"></i>');
        }
        $opt.obj.querySelector('.dots').innerHTML = $html.join('');
        $opt.ele.dots = $opt.obj.querySelectorAll(".dot");
        $opt.ele.dots[0].className="dot active";

        //setTimeout(function(){
        //    $utils.setCSS($opt.ele.bg,"transition-duration",".5");
        //},1);
        //克隆第一个
        //克隆最后一个
        var $firstNode=$opt.ele.bgNode[0].cloneNode(true);
        var $lastNode=$opt.ele.bgNode[$i-1].cloneNode(true);
        $opt.ele.bg.appendChild($firstNode);
        $opt.ele.bg.insertBefore($lastNode,$opt.ele.bgNode[0]);
        $i+=2;
        //初始化显示
        //这个2是因为需要前后挂接一个 实现无缝切换
        $opt.ele.bg.style.width = ($i + 2) * 15 + "rem";
        $opt.ele.bg.style.transform = "translateX(" + (-$Width) + "px)";

        //挂接自动
        var touchobj = new touch($opt.obj);
        touchobj.start = function (e) {
            //阻止事件冒泡
            e.preventDefault();
            $isStart = true;
            $mouse = $utils.getXY(e);
            $bgX = $opt.ele.bg.style.transform.slice(11, $opt.ele.bg.style.transform.length - 3) * 1;
        };
        $touchEvent=function(){
            if($opt.index<0) $opt.index=0;
            if($opt.index>($i-1)) $opt.index=$i-1;
            $opt.ele.bg.style.transform = "translateX(" + (-$opt.index*$Width) + "px)";
            //判断是否到了最头部 或者 最尾部
            if($opt.index==0||$opt.index==$i-1){
                $opt.index=($opt.index==0?($i-2):1);
                console.log($opt.index);
                setTimeout(function(){
                    $utils.setCSS($opt.ele.bg,"transition-duration","0s");
                    $opt.ele.bg.style.transform = "translateX(" + (-$opt.index*$Width) + "px)";
                },500);
            }
            //设置亮点
            for(var i=0;i<$i-2;i++){
                $opt.ele.dots[i].className="dot";
            }
            $opt.ele.dots[$opt.index-1].className="dot active";

        };
        touchobj.end = function (e) {
            e.preventDefault();
            $isStart = false;
            var $nowMouse = $utils.getXY(e);
            var $direction = $nowMouse.x - $mouse.x;
            var $directionLeft = $direction < 0;
            var $directionResult = Math.abs($direction) * 5 >= $Width;
            $utils.setCSS($opt.ele.bg,"transition-duration",".5s");
            if ($directionResult) {
                if ($directionLeft) {
                    $opt.index++;
                } else {
                    $opt.index--;
                }
                $touchEvent();
            }
            else{
                //用于复原
                $opt.ele.bg.style.transform = "translateX(" + (-$opt.index*$Width) + "px)";
            }
            $mouse = null;
        };
        touchobj.move = function (e) {
            e.preventDefault();
            if ($isStart && $mouse) {
                $utils.setCSS($opt.ele.bg,"transition-duration","0s");
                var $nowMouse = $utils.getXY(e);
                var $isleft = ($nowMouse.x - $mouse.x) < 0;
                var $deviation = $nowMouse.x - $mouse.x;
                $opt.ele.bg.style.transform = "translateX(" + ($bgX + $deviation) + "px)";
            }
        };
        touchobj.resize = function (e) {
            e.preventDefault();

        };
        touchobj.cancel = function (e) {
            e.preventDefault();

        };
    };

    return $fn;
}));
