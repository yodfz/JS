/**
 * 序列化JSON 到 可提交的POST字符串
 * @param obj JSON对象
 * @param _key 前缀
 * @returns {string}
 * @constructor
 */
function JSON2PostData(obj,_key){
    var jsonResult=[];
    var $qz='';
    if(_key instanceof  Array){
        $qz=_key.join('.');
        if(_key.length>0){
            $qz+='.';
        }
    }
    function checkOBJ(_){
        for(var _key in _){
            return false;
        }
        return true;
    }
    for(var key in obj){
        if(obj[key] instanceof Array){
            for(var i= 0,item;item=obj[key][i++];){
                if(checkOBJ(item)){
                    jsonResult.push($qz + key + "[" + (i-1) + "]=" + (item))
                }else{
                    jsonResult.push($qz + key + "[" + (i-1) + "]." + JSON2PostData(item));
                }
            }
        }
        else{
            if(checkOBJ(obj[key])){
                jsonResult.push($qz + key +"=" + obj[key]);
            }else{
                if(!(_key instanceof  Array)) _key=[];
                _key.push(key);
                jsonResult=jsonResult.concat(JSON2PostData(obj[key],_key));

            }
        }
    }
    return jsonResult.join("&")
}
