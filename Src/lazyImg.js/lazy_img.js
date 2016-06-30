/**
 * 图片延迟加载
 *
 * <img data-src="需要加载的图片URL" src="占位图片"/>
 * 如果需要逐渐显示 需要加入以下CSS
 * 如果需要逐渐显示 需要加入以下CSS
 *
 opacity: 0;
 transform: translateZ(0);
 -webkit-transition-duration: .5s;
 -moz-transition-duration: .5s;
 -o-transition-duration: .5s;
 transition-duration: .5s;
 */
(function () {
    var $imgs = document.querySelectorAll("img[data-src]");
    var $length=$imgs.length;

    //var $imgData=[];
    //优化点1 可能可以取消
    //for(var i= 0,item;item=$imgs[i++];){
    //    $imgData.push({
    //        e:item,
    //        //rect:item.getBoundingClientRect(),
    //        isload:false
    //    });
    //}
    // 查看是否支持监听DOM变动 MutationObserver
    var $layzImgTimeout,t;
    var $winHeight = window.innerHeight;
    window.onscroll = function () {
        t = document.documentElement.scrollTop || document.body.scrollTop;
        clearTimeout($layzImgTimeout);
        t += $winHeight;
        $layzImgTimeout = setTimeout(function () {
            for (var i = 0;i<$length;i++) {
                var $top;
                if($imgs[i].dataset.top==undefined){
                    $top = $imgs[i].offsetTop;
                    var $p = $imgs[i].offsetParent;
                    while ($p && $p.tagName != "BODY") {
                        $top += $p.offsetTop;
                        $p = $p.offsetParent;
                    }
                    $imgs[i].dataset.top=$top;
                }
                $top=$imgs[i].dataset.top;
                //优化点2 考虑记录已经加载的图片INDEX 然后删除它
                if ($top >= (t - $winHeight * 1.5) && $top <= t&&!$imgs[i].dataset.isload) {
                    $imgs[i].src = $imgs[i].dataset.src;
                    $imgs[i].dataset.isload = true;
                    $imgs[i].onload = function () {
                        this.style.opacity = "1.0";
                        this.onload=null;
                    };
                }
            }
        }, 500);
    };
}());
window.onscroll();