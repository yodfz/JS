/**
 * JS模板引擎
 * author:zhaoyifeng
 * 说明:
 * 1.JS模板代码需要套在jte中
 * 2.传递进入的对象全部挂接在 model上
 */
;
(function(_,fn){
    if (typeof define === "function" && define.amd) {
        define(fn);
    } else if (typeof exports === "object") {
        module.exports = fn();
    } else {
        _.jsTemplateEngine = fn();
    }
}(this,function(){
    var $fn={};

    /**
     * 根据给予的字符串或者对象生成最终代码
     * @param _     模板字符串
     * @param _v    用于生成的模板的结果
     */
    $fn.getHtml=function(_,_v){
        var $getJSBlock=[]/*JS模板代码块*/,$getJSBlockReg/*获取JS代码块的正则*/,$getJSTemplate/*临时存放模板*/;

        $getJSBlockReg=/<jte>([\S\s]*?)<\/jte>/ig;
        $getJSTemplate= _.replace($getJSBlockReg,function(k,v){
            var $t="<jtv>" + Math.random() + "</jtv>";
            $getJSBlock.push({k:$t,v:v});
            return $t;
        });
        console.log($getJSBlock);
        //考虑是否删除JTE JTV这种，直接将整个模板全部装入代码中执行.
        for(var $i= 0,$item;$item=$getJSBlock[$i++];){
            var $code=$item.v;
            var $codeline=[],$codelineFn=[];

            $code.replace(/([\S\s]*?)\n/ig,function(__k,__v){
                if(__v!=undefined){
                    $codeline.push(__v);
                }
            });
            ///\s+?[<]/ 匹配第一个是否为<
            for($line in $codeline){
                var $$code=$codeline[$line];
                //这里修改为删除所有空格,然后判断第一个字符
                if($$code.replace(/\s+/ig,"")[0]=="<"){
                    //HTML代码
                    $$code=$$code.replace(/"/ig,"\\\"");
                    $$code=$$code.replace(/\{\{/ig,"\"+");
                    $$code=$$code.replace(/\}\}/ig,"+\"");
                    $codelineFn.push("$$outstr.push(\"" + $$code +"\");");
                }
                else{
                    //JS代码
                    $codelineFn.push($$code);
                }
            }

            var $runFn="(function(model){var $$outstr=[];" + $codelineFn.join("") + "return $$outstr.join('');}(" + JSON.stringify(_v) + "))";
            console.log($runFn);
            $getJSTemplate=$getJSTemplate.replace($item.k,eval($runFn));
        }

        return $getJSTemplate;
    };

    return $fn;
}));