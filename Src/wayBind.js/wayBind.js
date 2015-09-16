/**
 * 双向绑定
 * author:zhaoyifeng
 * date:2015-9-16
 */
;
(function(_,fn){
    if (typeof define === "function" && define.amd) {
        define(fn);
    } else if (typeof exports === "object") {
        module.exports = fn();
    } else {
        _.wayBind = fn();
    }
}(this,function(){
    /**
     *
     * wayBind-name 绑定对象
     * wayBind-val  绑定值
     * wayBind-click 绑定事件
     * @type {{}}
     */
    var $wayBind=function(){};
    var $v=[],$m=[],$e=[];
    var $api={};
    var $name="waybind";
    /**
     * 兼容性获取节点
     * @param name
     * @returns {NodeList}
     */
    $api.get=function(name){
        //var _check="querySelectorAll" in document;
        return document.querySelectorAll(name);
    };

    /**
     * 添加监视的模型
     * @param _
     */
    $api.pushModel=function(_){
        var _obj={
            name:_.getAttribute($name +"-name"),
            node:_,
            value:""
        };
        $m.push(_obj);
        $api.addEvent(_obj,_);
    };

    /**
     * 添加监视需要显示的节点
     * @param _
     */
    $api.pushValue=function(_){
        var _obj={
            name:_.getAttribute($name +"-val"),
            node:_,
            value:""
        };
        $v.push(_obj);
    };

    /**
     * 为模型绑定事件
     * @param _m
     * @param _
     */
    $api.addEvent=function(_m,_){
        var _tag= _.tagName;

        switch(_tag){
            case "INPUT":{
                _.addEventListener("keyup",function(e){
                    _m.value=this.value;
                    $api.apply(_m);
                },true);
            }break;
            default :{}break;
        }

    };

    /**
     * 触发检测
     * @param _m
     */
    $api.apply=function(_m){
        if(arguments.length==1){
            //遍历$v 查看相关的
            //$api.get("#A")[0].innerHTML=_m.value;
            for(var i= 0,item;item=$v[i++];){
                if(item.name==_m.name){
                    $api.setValue(item,_m.value);
                }
            }
        }
        else
        {
            //交叉对比所有数据

        }
    };

    /**
     * 如果触发了值 则修改DOM
     * @param _m
     * @param _v
     */
    $api.setValue=function(_m,_v){
        if(_m.value==_v) return;
        var _tag= _m.node.tagName;
        _m.value=_v;
        var _set=null;
        switch(_tag){
            case "INPUT":{
                _set=function(_){
                    _m.value=_;
                };
            }break;
            default :{
                _set=function(_){
                    _m.node.innerHTML=_;
                };
            }break;
        }
        _set(_v);
    };


    /**
     * 输出内部变量
     */
    $api.debug=function(){
        console.log($v);
        console.log($m);
        console.log($e);
    };



    $wayBind.prototype={};
    /**
     * 将绑定的函数添加到缓存列表中
     * @param name
     * @param fn
     */
    $wayBind.prototype.bind=function(name,fn){
        var _getAllName=$api.get("[" + $name + "-name]"),_getAllVal=$api.get("[" + $name + "-val]");
        //var _model={
        //    name:"",
        //    node:null
        //};
        for(var i= 0,item;item=_getAllName[i++];){
            if(item.getAttribute($name +"-name")!=null){
                $api.pushModel(item);
            }
        }
        for(var i= 0,item;item=_getAllVal[i++];){
            $api.pushValue(item);
        }
    };

    $wayBind.prototype.apply=function(){
        $api.apply();
    };

    $wayBind.prototype.debug=function(){
        $api.debug();
    };

    return new $wayBind();
}));