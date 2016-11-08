/**
 * 将表单数据转换成JSON数据
 * author:yodfz
 * date:2015年10月28日09:17:34
 * 新增 data-form2JSON-filter 值为true的时候跳过此值的添加
 * date:2016年1月26日
 * 如果采用form2JSON({}) 将进行反向赋值操作
 */
;
(function (_, fn) {
    if (_.jQuery) {
        _.jQuery.fn.extend({
            form2JSON: fn
        });
    }
}(this, function (obj) {
    var $fn;
    var $e = $(this);
    $fn = function () {
        if(arguments.length==0){
            var _name = $e.find("[name]");
            var _data = {};
            //循环所有NAME
            for (var _i = 0, _item; _item = _name[_i++];) {
                var _e = $(_item);
                if(_e.data("form2JSON-filter")) continue;
                var _n = _e.attr("name");
                var _v = _e.val();
                //跳过空值
                if (_n.trim() == "") continue;
                var _d = _data;
                //查询是否有命名空间
                var _namespace = _n.split('.');
                _n = _namespace[_namespace.length - 1];
                //创建命名空间
                for (var _k = 0; _k < _namespace.length - 1; _k++) {
                    if (_d[_namespace[_k]] == undefined) {
                        if (_namespace[_k].substr(-1) == "]") {
                            _d[_namespace[_k]] = [];
                        } else {
                            _d[_namespace[_k]] = {};
                        }
                    }
                    _d = _d[_namespace[_k]];
                }
                //判断属性值是否为数组
                if (_d instanceof  Array){
                    //查询倒数第二个数组位数 比如  data[0].id=1
                    //此为对象专有
                    //以后可能会增加 如果为 [] 那就读取最后一个 然后赋值
                    var _index = _namespace[_namespace.length - 2].match(/\[(\d+)\]/ig) ? RegExp.$1 : 0;
                    //层级递升
                    _d = _d[_index];
                }
                //else{
                if (_d[_n] == undefined) {
                    //普通对象添加
                    _d[_n] = _v;
                }
                else {
                    //判断对象是否为数组
                    if (_d[_n] instanceof Array) {
                        _d[_n].push(_v);
                    }
                    else {
                        //非数组又重复
                        var _temp = _d[_n];
                        _d[_n] = [];
                        _d[_n].push(_temp);
                        _d[_n].push(_v);
                    }
                }
                //}
            }
            return _data;
        }else{
            for(var key in obj){
                $e.find("[name='" + key + "']").val(obj[key]);
            }
        }
    };
    return $fn();
}));