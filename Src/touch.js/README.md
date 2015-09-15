#触摸JS支援文件

##1. 第一步引入文件
```html
<script src="touch.js"></script>
```

##2. 第二步添加预置代码
```js
//原始
window.onload=function(){
    onload();
};
//jQuery
$(function(){
    onload();
}());

function onload(){
    var $touch=new touch();
    $touch.start=function(e){
        //触摸或者按下事件
    };
    $touch.end=function(e){
        //触摸离开或者弹起
    };
    $touch.move=function(e){
        //拖拽或者鼠标移动
    };
    $touch.resize=function(e){
        //窗口变换
    };
    $touch.cancel=function(e){
        //触摸取消
    };
}
```