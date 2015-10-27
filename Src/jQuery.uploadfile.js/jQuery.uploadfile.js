/**
 * 文件上传jQuery插件
 */
;
(function(_,fn){
    if(_.jQuery){
        _.jQuery.fn.extend({
            uploadfile:fn
        });
        //_.jQuery.extend({
        //    uploadfile:fn
        //});
    }
}(this,function(_c){
    var $fn;
    var $config={
        //上传地址
        uploadSrc:"",
        //回调函数
        success:null,
        //后缀限制
        suffix:"gif,png,jpeg,jpg"
    },_config={},$id;
    var _clickObj=$(this);
    var $result="";

    $fn=function(_){
        var _that=this;
        if(_!=undefined){
            _config= $.extend({},$config,_);
        }
        //创建一个唯一ID
        $id="uploadfile" + (new Date()).valueOf() + Math.random().toFixed(3).substr(2);
        var _form=document.createElement("form");
        var _iframe=document.createElement("iframe");
        var _file=document.createElement("input");
        _form.style.display="none";
        _form.action=_config.uploadSrc;
        _form.id=$id;
        _form.target="iframe" + $id;
        _iframe.id="iframe" + $id;
        _iframe.name="iframe" + $id;
        _file.type="file";
        _file.id="file" + $id;
        _form.appendChild(_iframe);
        _form.appendChild(_file);
        $("body").append(_form);
        //挂接事件
        $("#iframe" + $id).load(_that.loaded);
        $("#file" + $id).change(function(){
            var _path=$(this).val().split('.');
            _path=_path[_path.length-1];
            var _checksuffix=false;
            for(var _i= 0,_item;_item=_config.suffix[_i++];){
                if(_item.toLowerCase()==_path.toLowerCase()){
                    _checksuffix=true;
                }
            }
            if(_checksuffix){
                $("#" + $id).submit();
            }else{
                alert("无法上传此文件,仅限以下后缀文件:" + _config.suffix);
            }
        });
        _clickObj.click(function(){
            _that.upload();
        });
        return this;
    };

    /**
     * 进行上传操作
     */
    $fn.prototype.upload=function(){
        $("#file" + $id).trigger("click");
    };

    /**
     * 上传完成之后的回调
     */
    $fn.prototype.loaded=function(){
        var _body=$(this).contents().find("body");
        var _pre=_body.find("pre");
        $result=_pre.html()==""?_body.html():_pre.html();
        _config.success(JSON.parse($result));
        return $result;
    };
    return new $fn(_c);
}));