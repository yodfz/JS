/*
 能力探测JS
 isWebP:查看是否支持WEBP格式
 */
var suppor = {
    isWebP: (function () {
        var elem = document.createElement('canvas');
        if (!!(elem.getContext && elem.getContext('2d'))) {
            return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
        }
        else {
            return false;
        }
    }())
};