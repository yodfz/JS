/**
 * 双向绑定
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

    $api.pushModel=function(_){
        var _obj={
            name:_.getAttribute($name +"-name"),
            node:_,
            value:""
        };
        $m.push(_obj);
        $api.addEvent(_obj,_);
    };
    $api.pushValue=function(_){
        var _obj={
            name:_.getAttribute($name +"-val"),
            node:_,
            value:""
        };
        $v.push(_obj);
    };

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
    $api.apply=function(_m){
        //遍历$v 查看相关的
        //$api.get("#A")[0].innerHTML=_m.value;
        for(var i= 0,item;item=$v[i++];){
            if(item.name==_m.name){
                $api.setValue(item,_m.value);
            }
        }
    };
    $api.setValue=function(_m,_v){
        var _tag= _m.node.tagName;
        _m.value=_v;
        var _set=null;
        switch(_tag){
            case "DIV":{
                _set=function(_){
                    _m.node.innerHTML=_;
                };
            }break;
            default :{}break;
        }
        _set(_v);
    };


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
        var _getAllName=$api.get("[" + $name + "-name]");
        var _getAllVal=$api.get("[" + $name + "-val]");
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
    /**
     * 获取所有的绑定事件与绑定值DOM
     */
    $wayBind.prototype.getAllBind=function(){

    };

    $wayBind.prototype.apply=function(){

    };

    $wayBind.prototype.debug=function(){
        $api.debug();
    };

    return new $wayBind();
}));