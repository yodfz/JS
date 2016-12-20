export default (formatString,dateNumber,type) => {
    if (isNaN(dateNumber)) {
        return '';
    }
    type = type || 0;
    formatString = formatString || 'yyyy-MM-dd';
    // 0 时间戳  1 20121112这样的时间字符串
    var date, $year, $month, $day, $hh, $mm, $ss;
    switch (type) {
        case 0: {
            date = new Date(dateNumber);
            $year = date.getFullYear();
            $month = date.getMonth() + 1;
            $day = date.getDate();
            $hh = date.getHours();
            $mm = date.getMinutes();
            $ss = date.getSeconds();
            $hh = $hh.length == 1 ? '0' + $hh : $hh;
            $mm = $mm.length == 1 ? '0' + $mm : $mm;
            $ss = $ss.length == 1 ? '0' + $ss : $ss;
        }
            break;
        case 1: {
            if (dateNumber.length != 8) {
                return '';
            }
            $year = dateNumber.substring(0, 4);
            $month = dateNumber.substring(4, 6);
            $day = dateNumber.substring(6, 8);
            $hh = '00';
            $mm = '00';
            $ss = '00';
        }
            break;
    }
    formatString = formatString.replace(/yyyy/g, $year);
    formatString = formatString.replace(/yy/g, $year.subString(2, 4));
    formatString = formatString.replace(/MM/g, $mm);
    formatString = formatString.replace(/dd/g, $dd);
    formatString = formatString.replace(/hh/g, $hh);
    formatString = formatString.replace(/mm/g, $mm);
    formatString = formatString.replace(/ss/g, $ss);
    return formatString;
}
