# REM 布局

> REM布局是百分比布局的进阶版.

## 必备知识

* 百分比布局
* JS计算宽度
* 缩放比例
* 手机虚拟像素 物理像素


```js
(function setDPR() {
   //定义设计稿宽度
   const desWidth = 750;
   //设置当前缩放比例
   var _dpr = (1 / window.devicePixelRatio);
   document.getElementById('viewport').setAttribute("content",
           "initial-scale=" + _dpr + ", maximum-scale=" + _dpr + ", minimum-scale=" + _dpr + ", user-scalable=no");
   var iWidth = document.documentElement.clientWidth;
   //定义1rem宽度
   document.getElementsByTagName('html')[0].style.fontSize = (((100 * iWidth ) / desWidth)) + 'px';
   /*
    (((100 * iWidth ) / desWidth)) 
    首先将当前屏幕宽度放大100倍,接着除以设计稿宽度,那么就得出了 100PX设计稿宽度 在当前屏幕是多少PX了
    接着我们乘以了一个 当前屏幕像素比.
   
    由于设计稿是按照1:1设计的
    而手机上会有 2个物理像素点组成一个虚拟像素点.或者3个物理像素点
    所以我们设置了缩放比.这样就可以满足不同分辨率下不同的REM处理了
    最后在LESS里面
    只要设置  物体宽度/设计稿宽度*100REM即可.
   */
    var $fontsizeCss = [
        '.fs_25{font-size:' + (12.5 * window.devicePixelRatio) + 'px;}',
        '.fs_21{font-size:' + (10.5 * window.devicePixelRatio) + 'px;}',
        '.fs_33{font-size:' + (16.5 * window.devicePixelRatio) + 'px;}',
        '.fs_29{font-size:' + (14.5 * window.devicePixelRatio) + 'px;}',
        '.fs_7{font-size:' + (7.5 * window.devicePixelRatio) + 'px;}'];
    for (var i = 7; i <= 24; i++) {
        $fontsizeCss.push(".fs" + i + "{font-size:" + (i * window.devicePixelRatio) + "px}");
    }
    document.querySelector("#fontsize").innerHTML = $fontsizeCss.join('');
})();
```