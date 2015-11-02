/**
 * JS模板引擎
 * author:zhaoyifeng
 * 说明:
 * 1.JS模板代码需要套在jte中    已经无需挂接JIE中
 * 2.传递进入的对象全部挂接在 model上
 */
;
(function (_, fn) {
    if (_["define"] != undefined && typeof define === "function" && define.amd) {
        define(fn);
    } else if (typeof exports === "object") {
        module.exports = fn();
    } else {
        _.jsTemplateEngine = fn();
    }
}(this, function () {
    var $fn = {};
    $fn = function (_, _v) {
        return $fn.getHtml(_, _v);
    };
    /**
     * 根据给予的字符串或者对象生成最终代码
     * @param _     模板字符串
     * @param _v    用于生成的模板的结果
     */
    $fn.getHtml = function (_, _v) {
        var $getJSBlock = []/*JS模板代码块*/, $getJSBlockReg/*获取JS代码块的正则*/, $getJSTemplate/*临时存放模板*/;

        //$getJSBlockReg=/<jte>([\S\s]*?)<\/jte>/ig;
        //$getJSTemplate= _.replace($getJSBlockReg,function(k,v){
        //    var $t="<jtv>" + Math.random() + "</jtv>";
        //    $getJSBlock.push({k:$t,v:v});
        //    return $t;
        //});
        //考虑是否删除JTE JTV这种，直接将整个模板全部装入代码中执行.
        //2015年11月02日15:45:31 痛定思痛 还是直接删除吧...
        //这样就无需JTE JTV包裹了
        //for(var $i= 0,$item;$item=$getJSBlock[$i++];){
        var $code = _;
        var $codeline = [], $codelineFn = [];
        //console.log($code);
        $code.replace(/([\S\s]*?)\n/ig, function (__k, __v) {
            if (__v != undefined) {
                $codeline.push(__v);
            }
        });
        ///\s+?[<]/ 匹配第一个是否为<
        //var $checkSpaceReg=/^</ig;
        for (var $line in $codeline) {
            var $$code = $codeline[$line];
            if ($$code.replace(/\s+/ig, "")[0] == "<") {
                //HTML代码
                $$code = $$code.replace(/"/ig, "\\\"");
                $$code = $$code.replace(/\{\{/ig, "\"+(");
                $$code = $$code.replace(/\}\}/ig, ")+\"");
                $codelineFn.push("$$outstr.push(\"" + $$code + "\");");
            }
            else {
                //JS代码
                $codelineFn.push($$code);
            }
        }

        var $runFn = "(function(model){var $$outstr=[];" + $codelineFn.join("") + "return $$outstr.join('');}(" + JSON.stringify(_v) + "))";
        //$getJSTemplate=$getJSTemplate.replace($item.k,eval($runFn));
        $getJSTemplate = eval($runFn);
        //}

        return $getJSTemplate;
    };

    return $fn;
}));