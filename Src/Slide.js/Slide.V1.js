/*
 * 幻灯组件
 * date:2015-4-24
 * author:zhaoyifeng
 * 需要框架:jQuery.js >1.11.0
 * 如何使用:
 *        1.首先将CSS,JS文件引入   slide.V1.css,slide.V1.js 并且引入jQuery.js
 *        2.然后为需要幻灯的DIV指定一个唯一性的ID 如layer1 注意 class为 .xxxx id为 #xxxx 必须带前缀
 *        3.在页面载入之后放置代码
 *          var hcslides=new slides({
 *          width:500,height:500,layerid:"#layer1"
 *          ,customtemplate:true,customstartTemplate:true});
 *        4.那么幻灯组件就部署完成了
 *        5.各项参数说明请参考源文件
 * */
(function ($) {
    "use strict";
    var $that = window, $b, $d, $block;
    var $hasTouch = "ontouchstart" in $that;
    var $eventStart = $hasTouch ? "touchstart" : "mousedown",
        $eventEnd = $hasTouch ? "touchend" : "mouseup",
        $eventMove = $hasTouch ? "touchmove" : "mousemove",
        $eventResize = $hasTouch ? "orientationchange" : "resize",
        $eventcancel = $hasTouch ? "touchcancel" : "mouseup";
    var $opt = {
        /*宽度*/  width: 0,
        /*高度*/  height: 0,
        /*绑定ID*/layerid: "",
        /*是否自动切换 功能未开发*/auto: false,
        /*延迟事件 功能未开发*/time: 200,
        /*总图片数*/count: 0,
        /*当前索引INDEX*/index: 0,
        /*是否显示图片标题 功能未开发*/showtitle: false,
        /*鼠标锁定*/lock: false,
        /*是否使用自定义的内容模版*/customtemplate: false,
        /*是否使用自定义的布景模版*/customstartTemplate: false,
        /*模版,此模版将由eval执行后填充入section*/
        /*$item 当前索引图片选项 提供 smallsrc src title*/
        /*$opt 当前的配置*/
        blockHeight:0,
        template: '\"<div style=\\\"width:100%;height:100%;\
                        \\\"><img src=\\\"" + $item.smallsrc + "\\\"/>\
                        </div>\"',
        /*不提供任何API，会将拼装好的template装入_slidesInsert位置*/
        startTemplate: ' <div class="detail">\
                        <header>\
                        <img src="images/HH-logo.png"/>\
                        </header>\
                        <div class="detail-header _slidesClose">\
                        <span></span>\
                        </div>\
                        <div class="detail-content-indigo _slidesInsert">\
                        <span class="detail-left"></span>\
                        <span class="detail-right"></span>\
                        </div>\
                        <div class="indigo-logo">\
                        <img src="images/indigo-logo.png"/>\
                        </div>\
                        </div>',
        /*鼠标*/mouse: {
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0
        }
    };

    var slides;
    slides = function (_opt) {
        this.opt = $.extend({}, $opt, _opt);
        var $that = this.that = $(this.opt.layerid);
        var $imgSrc = [{
            src: "",
            smallSrc: "",
            title: ""
        }];
        this.opt.width = $(window).width();
        this.opt.height = $(window).height();
        this.opt.blockHeight = this.opt.blockHeight == 0 ? this.opt.height * 0.7 : this.opt.blockHeight;
        //接收绑定对象，查找所有的Image
        this.loadImg();
        return this;
    };
    slides.prototype = {
        loadImg: function () {
            var $this = this;
            var $tl = $this.imgList = [];
            var $tmpImg = $this.imgObjList = $this.that.find(".js-img");
            var $tmpImgLength = $tmpImg.length;
            for (var i = 0; i < $tmpImgLength; i++) {
                var $tmpobj = $($tmpImg[i]);
                $tmpobj.unbind();
                //当click的时候 加载所有的大小图
                $tmpobj.bind({
                    click: function () {
                        //触发显示事件
                        var $idx = $tmpImg.index(this);
                        $this.showbg();
                        $this.showimg($idx);
                    }
                });
                $tl.push({
                    src: $tmpobj.attr("src"),
                    smallsrc: $tmpobj.attr("data-src") || $tmpobj.attr("src"),
                    title: $tmpobj.attr("title") || ""
                });
            }
            $this.opt.count = $tmpImg.length;
        },
        //显示背景图
        showbg: function () {
            var $this = this;
            var $bgName = "." + $this.opt.layerid.slice(1, $this.opt.layerid.length) + "slides_bg";
            if ($($bgName).length != 0) {
                $($bgName).fadeIn();
            } else {
                $("<div style=\"width:" + $this.opt.width + "px;" +
                    ";height:" + $this.opt.height +
                    "px;\" class=\"" + $bgName.slice(1, $bgName.length)
                    + " slidesbg " + ($this.opt.customstartTemplate ? "" : " _slidesInsert")
                    + "\">" +
                    ($this.opt.customstartTemplate ? $this.opt.startTemplate : "") +
                    "" +
                    "</div>"
                ).appendTo("body");
                $($bgName).bind({
                    click: function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!$this.lock) {
                            //$(this).fadeOut();
                        }

                    }
                });
                //查看是否有_slidesClose然后为他绑定关闭按钮
                $($bgName + " ._slidesClose").bind({
                    click: function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!$this.lock) {
                            $($bgName).fadeOut();
                        }
                    }
                });
            }
        },
        showimg: function (_index) {
            var $this = this;
            //console.log($this);
            var $idx = _index || 0;
            var $appendObj = "body";
            var $bgName = "." + $this.opt.layerid.slice(1, $this.opt.layerid.length) + "slides_bg ._slidesInsert";
            var $name = $this.opt.layerid.slice(1, $this.opt.layerid.length);
            //查是否已经被初始化过一次了
            //_showImg主要接收各种事件
            //_moveImg防止移动的缩略图
            //_listImg用于放小的缩略图
            if ($("#" + $name + "_moveImg").length == 0) {
                $("<div id=\"" + $name + "_moveImg\"" +
                " class=\"moveImg\" style=\"" +
                ";height:" + $this.opt.blockHeight + "px;width:" + $this.opt.width + "px;\"></div>").appendTo($bgName);
            }

            //if ($("#" + $name + "_listImg").length == 0) {
            //    $("<div id=\"" + $name + "_listImg\"" +
            //    " class=\"listImg\" style=\"width:" + $this.opt.width + "px;" +
            //    ";height:0px;top:" + $this.opt.height * 0.7 +
            //    "px;position: absolute;z-index:105;\"></div>").appendTo($bgName);
            //}
            var $moveImg = $("#" + $name + "_moveImg");
            if ($("#" + $name + "_showImg").length == 0) {
                $("<div id=\"" + $name + "_showImg\"" +
                " class=\"showImg\" style=\"width:" + $this.opt.width + "px;" +
                "height:" + $this.opt.blockHeight + "px;\">" +
                    //"<img style=\"width:100%;\" src=\"\"/>" +
                "</div>").appendTo($bgName);
                $("#" + $name + "_showImg").bind(
                    $eventStart, function (e) {
                        $this.opt.lock = true;
                        e.preventDefault();
                        e.stopPropagation();
                        var $e = $this.getXY(e);
                        $this.opt.mouse.startX = $e.x;
                        $this.opt.mouse.startY = $e.y;
                        $this.opt.mouse.left = parseInt($moveImg.css("left"));
                        $this.opt.mouse.top = parseInt($moveImg.css("top"));
                    }
                );
                $("#" + $name + "_showImg").bind(
                    $eventEnd, function (e) {
                        $this.opt.lock = false;
                        e.preventDefault();
                        e.stopPropagation();
                        var $e = $this.getXY(e);
                        $this.opt.mouse.endX = $e.x;
                        $this.opt.mouse.endY = $e.y;
                        var $left = parseInt($moveImg.css("left"));
                        var $top = parseInt($moveImg.css("top"));
                        //判断滑动距离
                        var $tmpX = $this.opt.mouse.endX - $this.opt.mouse.startX;
                        //做ANIMIATION动画
                        if ($tmpX > 0) {
                            //手指向右滑
                            //上一个
                            $this.opt.index--;
                        }
                        else {
                            //手指向左滑
                            //下一个
                            $this.opt.index++;
                        }
                        $left = $this.opt.index * $this.opt.width;
                        $moveImg.stop();
                        $moveImg.animate({ "left": -$left }, function () {
                            if ($this.opt.index < 0) {
                                $this.opt.index = $this.opt.count - 1;
                                $moveImg.css("left", -($this.opt.index) * $this.opt.width);
                            } else if ($this.opt.index >= $this.opt.count) {
                                $this.opt.index = 0;
                                $moveImg.css("left", -($this.opt.index) * $this.opt.width);
                            }

                        });

                    }
                );
                $("#" + $name + "_showImg").bind(
                    $eventMove, function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        if ($this.opt.mouse.lock) {
                            var $tmpX, $tmpY;
                            var $e = $this.getXY(e);
                            $this.opt.mouse.startX = $e.x;
                            $this.opt.mouse.startY = $e.y;
                            var $l = $tmpX + $this.opt.mouse.left;
                            var $t = $tmpY;
                            $moveImg.css({
                                left: $l
                            });
                        }
                    }
                );
            };
            //$(this.opt.layerid + "_showImg img").attr("src",$this.imgList[_index].src);
            //初始化前面与后面的图片
            var $tmpImg = [];
            var $item = $this.imgList[$this.imgList.length - 1];
            var $opt = $this.opt;
            //加入末尾
            var $tmpwidth = $this.opt.width - 10;
            $tmpImg.push("<section style=\"left:" + (-$this.opt.width) + "px;width:"
            + $tmpwidth + "px;\">" +
            ($this.opt.customtemplate ? eval($opt.template) : "<img style=\"margin:0px auto;\" src=\"" + $item.smallsrc + "\" />") +
            "</section>");
            for (var i = 0; i < $this.imgList.length; i++) {
                $item = $this.imgList[i];
                if ($opt.customtemplate) {
                    $tmpImg.push("<section style=\"left:" + (i * $opt.width) + "px;width:"
                    + $tmpwidth + "px;\">" + eval($opt.template) + "</section>");
                }
                else {
                    $tmpImg.push("<section style=\"left:" + (i * $opt.width) + "px;width:"
                    + $tmpwidth + "px;\">" +
                    "<img style=\"margin:0px auto;\" src=\"" + $item.smallsrc + "\" />" +
                    "</section>");
                }

            }
            //加入开头
            $item = $this.imgList[0];
            $tmpImg.push("<section style=\"left:" + ($this.imgList.length * $this.opt.width) + "px;width:"
            + $tmpwidth + "px;\">" +
            ($this.opt.customtemplate ? eval($opt.template) : "<img style=\"margin:0px auto;\" src=\"" + $item.smallsrc + "\" />") +
            "</section>");

            $this.opt.index = $idx;
            $("#" + $name + "_moveImg").html($tmpImg.join(''));
            //来来来 这里根据$idx定位一下距离
            $("#" + $name + "_moveImg").css("left", -($idx) * $this.opt.width);
        },
        close: function () {
            //关闭所有的显示图层
            var $bgName = "." + $this.opt.layerid.slice(1, $this.opt.layerid.length) + "slides_bg";
            //$($this.opt.layerid + "_moveImg").hide();
            //$($this.opt.layerid + "_showImg").hide();
            //$($this.opt.layerid + "_listImg").hide();
            $($bgName).fadeOut();
        },
        getXY: function (e) {
            //用于扩展JQ的触摸事件
            var $x, $y;
            if (e.originalEvent.changedTouches) {
                $x = e.originalEvent.changedTouches[0].pageX;
                $y = e.originalEvent.changedTouches[0].pageY;
            } else if (e.changedTouches) {
                $x = e.changedTouches[0].pageX;
                $y = e.changedTouches[0].pageY;
            }
            else {
                $x = e.pageX;
                $y = e.pageY;
            }
            return { x: $x, y: $y };
        }
    };
    $that.slides = slides;
})(jQuery);
