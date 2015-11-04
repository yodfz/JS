/**
 * 获取当前鼠标XY坐标
 * @param e
 * @returns {{x: *, y: *}}
 */
function getXY(e) {
    //用于扩展JQ的触摸事件
    var $x, $y;
    if (e.originalEvent&& e.originalEvent.changedTouches) {
        $x = e.originalEvent.changedTouches[0].pageX;
        $y = e.originalEvent.changedTouches[0].pageY;
    } else if (e.changedTouches) {
        $x = e.changedTouches[0].pageX;
        $y = e.changedTouches[0].pageY;
    }
    else {
        $x = e.pageX;
        $y = e.pageY;
    }
    return { x: $x, y: $y };
}