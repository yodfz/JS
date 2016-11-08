(function (w) {
    w.ajax = function (url, methods, data) {
        return new Promise(function (res, rej) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                res(JSON.parse(xhr.responseText));
            };
            xhr.open(methods, url, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            var sendData = [];
            for (var key in data) {
                sendData.push(key + '=' + data[key]);
            }
            xhr.send(sendData.join('&'));
        })
    }
})(window);