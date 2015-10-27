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
        uploadSrc:"",
        success:null
    },_config={},$id;
    var _clickObj=$(this);
    var $result="";

    //var $postForm/*提交上传的表单*/;
    $fn=function(_){
        var _that=this;
        if(_!=undefined){
            _config= $.extend({},$config,_);
        }
        //创建一个form表单
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
            $("#" + $id).submit();
        });
        _clickObj.click(function(){
            _that.upload();
        });
        return this;
    };

    //进行上传操作
    $fn.prototype.upload=function(){
        $("#file" + $id).trigger("click");
    };

    /**
     * 上传完成之后的回调
     * @param _d
     */
    $fn.prototype.loaded=function(){
        var _body=$(this).contents().find("body");
        var _pre=_body.find("pre");
        var _result=_pre.html()==""?_body.html():_pre.html();
        $result=_result;
        _config.success(JSON.parse($result));
        return _result;
    };



    return new $fn(_c);
}));