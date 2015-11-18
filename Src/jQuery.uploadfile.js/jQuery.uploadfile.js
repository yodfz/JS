/**
 * 文件上传jQuery插件
 * author:zyf(苍龙)
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
        suffix:"gif,png,jpeg,jpg",
        //指定上传file NAME
        fileName:"files",
        //上传时需要附带的参数
        //{name:"",value:""}
        data:[]
    },_config={},$id;
    var _clickObj=$(this);
    var $result="";

    $fn=function(_){
        var _that=this;
        if(_!=undefined){
            _config= $.extend({},$config,_);
        }
        //判断是否已经绑定过一个上传了
        if(_clickObj.data("bind-jqueryUploadfile")){
            return;
        }
        else{
            _clickObj.data("bind-jqueryUploadfile",true);
        }

        //创建一个唯一ID
        $id="uploadfile" + (new Date()).valueOf() + Math.random().toFixed(3).substr(2);
        var _form=document.createElement("form");
        var _iframe=document.createElement("iframe");
        var _file=document.createElement("input");
        _form.style.display="none";
        _form.action=_config.uploadSrc;
        _form.method="POST";
        _form.enctype="multipart/form-data";
        _form.id=$id;
        _form.target="iframe" + $id;
        _iframe.id="iframe" + $id;
        _iframe.name="iframe" + $id;
        _file.type="file";
        _file.id="file" + $id;
        _file.name=_config.fileName;
        _form.appendChild(_iframe);
        _form.appendChild(_file);
        //检测是否需要携带其他参数
        if(_config.data.length>0){
            for(var _i= 0,_item;_item=_config.data[_i++];){
                var _hide=document.createElement("input");
                _hide.type="hidden";
                _hide.name=_item.name;
                _hide.value=_item.value;
                _form.appendChild(_hide);
            }
        }

        $("body").append(_form);
        //挂接事件
        $("#iframe" + $id).load(_that.loaded);
        $("#file" + $id).change(function(){
            var _path=$(this).val().split('.');
            _path=_path[_path.length-1];
            var _checksuffix=false;
            var _suffix=_config.suffix.split(',');
            for(var _i= 0,_item;_item=_suffix[_i++];){
                if(_item.toLowerCase()==_path.toLowerCase()){
                    _checksuffix=true;
                }
            }
            if(_checksuffix){
                $("#" + $id).submit();
            }else{
                $("#icon" + $id + "").remove();
                alert("无法上传此文件,仅限以下后缀文件:" + _config.suffix);
            }
        });
        _clickObj.click(_that.upload);
        return this;
    };


    /**
     * 进行上传操作
     */
    $fn.prototype.upload=function(){
        $("#iframe" + $id).attr("src","");
        $("#file" + $id).trigger("click");
        //添加转圈操作
        _clickObj.after("<span id='icon" + $id + "'><i class='icon icon-spin1 icon-animation-rotate'></i></span>")
    };

    /**
     * 上传完成之后的回调
     */
    $fn.prototype.loaded=function(){
        $("#icon" + $id + "").remove();
        var _body=$($(this).contents().find("body")[0]);
//        console.log(_body.html(),_body.text(),_body.innerHTML);
//        var _pre=$(_body.find("pre")[0]);
        $result=_body.html();//(_pre.html()==""||_pre.html()=)?_body.text():_pre.text();
        _config.success(JSON.parse($result));
        return $result;
    };
    return new $fn(_c);
}));