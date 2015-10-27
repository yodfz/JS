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
        $watchList.after(function(index){
            $(this).data("kbc-index",index);
            return "<span class='keyboardCountSpan' data-kbc-index='" + index + "'>0/" + $(this).data("kbc-max") + "</span>"
        });

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