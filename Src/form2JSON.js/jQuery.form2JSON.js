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
            var _d=_data;
            var _namespace=_n.split('.');
            _n=_namespace[_namespace.length-1];
            for(var _k= 0;_k<_namespace.length-1;_k++){
                if(_d[_namespace[_k]]==undefined){
                    if(_namespace[_k].substr(-1)=="]"){
                        _d[_namespace[_k]]=[];
                    }else{
                        _d[_namespace[_k]]={};
                    }
                }
                _d=_d[_namespace[_k]];
            }

            if(_d instanceof  Array){
                var _index=_namespace[_namespace.length-2].match(/\[(\d+)\]/ig)?RegExp.$1:0;
                _d=_d[_index];
            }
            //else{
            if(_d[_n]==undefined){
                _d[_n]=_v;
            }
            else{
                if(_d[_n] instanceof Array){
                    _d[_n].push(_v);
                }
                else{
                    var _temp=_d[_n];
                    _d[_n]=[];
                    _d[_n].push(_temp);
                    _d[_n].push(_v);
                }
            }
            //}
        }
        return _d;
    };
    return $fn();
}));