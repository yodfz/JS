/**
 * 文件上传jQuery插件
 * date:2015年10月27日16:56:10
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

    var $postForm/*提交上传的表单*/;
    $fn=function(_){
        console.log(_);
        console.log(_clickObj);
        var _that=this;
        if(_!=undefined){
            _config= $.extend({},$config,_);
        }
        //创建一个form表单
        $id="uploadfile" + (new Date()).valueOf() + Math.random().toFixed(3).substr(2);
        var _form=document.createElement("form");
        var _iframe=document.createElement("iframe");
        var _file=document.createElement("input");
        //_form.style.display="none";
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
        $("#file" + $id).change(function(){
            console.log("change");
            _iframe.load=_that.loaded("#iframe" + $id);
            $("#" + $id).submit();
        });
        _clickObj.click(function(){
            _that.upload();
        });
        return this;
    };

    //进行上传操作
    $fn.prototype.upload=function(){
        console.log("#file" + $id);
        $("#file" + $id).trigger("click");
    };

    /**
     * 上传完成之后的回调
     * @param _d
     */
    $fn.prototype.loaded=function(_d){
        var _body=$(_d).contents().find("body");
        var _pre=_body.find("pre");
        var _result=_pre.html()==""?_body.html():_pre.html();
        $result=_result;
        _config.success(JSON.parse(_d));
        return _result;
    };



    return new $fn(_c);
}));