(function (w) {
    w.ajax = function (url, methods, data, headers, opt) {
        return new Promise(function (res, rej) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status >= 500) {
                        window.alertTip("访问服务失败");
                        rej(xhr.responseText);
                        return;
                    }
                    res(JSON.parse(xhr.responseText));
                }
            };
            for (var i in opt) {
                xhr[i] = opt[i];
            }
            xhr.open(methods, url, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            if (headers && typeof headers === 'object') {
                for (var i in headers) {
                    xhr.setRequestHeader(i, headers[i]);
                }
            }
            var sendData = [];
            for (var key in data) {
                sendData.push(key + '=' + data[key]);
            }
            xhr.send(methods === 'GET' ? null : sendData.sort().join('&'));
        });
    };
})(window);