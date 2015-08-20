/**
 * Created by 逸风 on 2015/8/19.
 * Description:此JS主要根据给予的条件判断数据是否符合选项
 *
 * Demo:
 *   var _c={"material":"头层牛皮/海绵/聚酯纤维/硬木"};
     var _d=[
     {"sku":1045280615,"material":"意大利头层牛皮/海绵/聚酯纤维/硬木","color":"驼黄色","specification":"长72.5X宽52X高46.5CM","salesstates":"ZX","tooltips":"意大利头层牛皮-驼黄色"},
     {"sku":1045280613,"material":"头层牛皮/海绵/聚酯纤维/硬木","color":"深褐色","specification":"长72.5X宽52X高46.5CM","salesstates":"ZS","tooltips":"头层牛皮-深褐色"},
     {"sku":1045280612,"material":"意大利头层牛皮/海绵/聚酯纤维/硬木","color":"浓咖啡色","specification":"长72.5X宽52X高46.5CM","salesstates":"ZS","tooltips":"意大利头层牛皮-浓咖啡色"},
     {"sku":1045280611,"material":"意大利头层牛皮/海绵/聚酯纤维/硬木","color":"深栗色","specification":"长72.5X宽52X高46.5CM","salesstates":"Z1","tooltips":"意大利头层牛皮-深栗色"}
     ];
     console.log(Check(_d[0],_c));
     console.log(Check(_d[1],_c));
     console.log(Check(_d[2],_c));
     console.log(Check(_d[3],_c));
 */
function getDataByFilter(/*待识别数据*/data,/*识别条件*/ condition) {
    //最终判断结果
    var _result = false;
    //用于定义是否有条件，无条件直接略过
    var _start = true;
    for (var key in condition) {
        _start = false;
        if (condition[key] == "") {
            _result = true;
            continue;
        };
        var _v = data[key] || data[key.toLowerCase()];
        var _type = condition[key].constructor;
        switch (_type) {
            case Array: {
                //数组策略，只要符合一个结果就是TRUE
                for (var i = 0, item; item = condition[key][i++];) {
                    if (_v == item) {
                        _result = true;
                        break;
                    }
                }
            } break;
            default: {
                if (_v == condition[key]) {
                    _result = true;
                }
                else {
                    _result = false;
                    break;
                }
            } break;
        }
        if (!_result) break;
    }
    _type = null;
    return _start ? true : _result;
}