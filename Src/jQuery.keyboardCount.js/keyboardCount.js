/**
 * 统计字数的jQuery插件
 */
;
(function(_,fn){
    if(_.jQuery){
        _.jQuery.extend({
            keyboardCount:fn()
        });
    }
}(this,function(){
    var $fn,$watchList;

    $fn=function(){
        return $fn;
    };

    /**
     * 绑定
     */
    $fn.bind=function(){
        $watchList=$("[data-kbc-max]");
        for(var i= 0,item;item=$watchList[i++];){
            var item=$(item);
            var $index=i-1;
            item.data("kbc-index",$index);
            if($("[data-kbc-index='" + $index+ "']").length==1){
                $($("[data-kbc-index='" + $index+ "']")[0]).html(item.val().length + "/" + item.data("kbc-max"));
            }
            else{
                item.after("<span class='keyboardCountSpan' data-kbc-index='" + $index + "'>0/" + item.data("kbc-max") + "</span>");
            }
        }

        $watchList.keydown(function(e){
            var _that=$(this);
            var _index=_that.data("kbc-index");
            var _max=_that.data("kbc-max");
            if(_that.val().length>=_max){
                _that.val(_that.val().substr(0,_max));
            }
            $("[data-kbc-index='" + _index + "']").html((_that.val().length+1) + "/" + _that.data("kbc-max"))
        });
    };

    return $fn;
}));