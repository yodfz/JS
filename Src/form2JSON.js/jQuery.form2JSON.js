/**
 * 将表单数据转换成JSON数据
 * author:zyf(苍龙)
 * date:2015年10月28日09:17:34
 */
;
(function(_,fn){
    if(_.jQuery){
        _.jQuery.fn.extend({
            form2JSON:fn
        });
    }
}(this,function(){
    var $fn;
    var $e=$(this);
    $fn=function(){
        var _name=$e.find("[name]");
        var _data={};
        for(var _i= 0,_item;_item=_name[_i++];){
            var _e=$(_item);
            var _n=_e.attr("name");
            var _v=_e.val();
            if(_n.trim()=="") continue;
            if(_data[_n]==undefined){
                _data[_n]=_v;
            }
            else{
                if(_data[_n] instanceof Array){
                    _data[_n].push(_v);
                }
                else{
                    var _temp=_data[_n];
                    _data[_n]=[];
                    _data[_n].push(_temp);
                    _data[_n].push(_v);
                }
            }
        }
        return _data;
    };
    return $fn();
}));