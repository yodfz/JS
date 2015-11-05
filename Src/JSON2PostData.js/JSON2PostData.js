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
        if(typeof _=="object"){
            for(var $$key in _){
                return false;
            }
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

JSON2PostData({"id":"","type":"7"});
JSON2PostData({ a: { b:1,c:2 }, d: [3,4,{ e:5 }] });
JSON2PostData({"contents":[{"id":"","type":"7","data":"{\"text\":\"阿萨德\"}"},{"id":"","type":"1","data":"{\"text\":\"请在此输入文字内容!\"}"}],"images":[{"type":1,"imgKey":"qn|xaya|Fs3_GpHAEuEhZx9D3i37rIu6M1_v","imgUrl":"http://xaya.qiniudn.com/Fs3_GpHAEuEhZx9D3i37rIu6M1_v?imageView2/2/w/480/q/100"}],"tags":[{"id":42,"name":"阿斯蒂芬"}],"title":"阿斯顿发斯蒂芬","author":"","categoryId":"3","summary":"阿斯顿发生非打死打法是否打算打发斯蒂芬","id":"","type":"1"})