/**
 *图片延迟加载
 *
 * <img data-src="需要加载的图片URL" src="占位图片"/>
 */
(function(){
    var $imgs=document.querySelectorAll("img[data-src]");
    //var $imgData=[];
    //优化点1 可能可以取消
    //for(var i= 0,item;item=$imgs[i++];){
    //    $imgData.push({
    //        e:item,
    //        //rect:item.getBoundingClientRect(),
    //        isload:false
    //    });
    //}
    var $layzImgTimeout;
    var $winHeight=window.innerHeight;
    window.onscroll=function(){
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        clearTimeout($layzImgTimeout);
        t+=$winHeight;
        $layzImgTimeout=setTimeout(function(){
            for(var i= 0,item;item=$imgs[i++];){
                var $top=item.offsetTop;
                var $p=item.offsetParent;
                while($p.tagName!="BODY"){
                    $top+=$p.offsetTop;
                    $p=$p.offsetParent;
                }
                //优化点2 考虑记录已经加载的图片INDEX 然后删除它
                if($top>=(t-$winHeight)&&$top<=t&&!item.dataset.isload){
                    item.src=item.dataset.src;
                    item.dataset.isload=true;
                }
            }
        },500);
    };
}());
window.onscroll();