import scrollRecord from 'scrollRecord';
scrollRecord.readScroll((next, rej)=> {
    setTimeout(function () {
        vue.nextTick(function () {
            next();
        });
    }, 1000);
}, (next, rej)=> {
    setTimeout(function () {
        vue.nextTick(function () {
            next();
        });
    }, 4000);
});