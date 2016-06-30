(function (_win, _doc) {
	var _onscroll = window.onscroll;
	var _onload = window.onload;
	window.onscroll = function () {
		_onscroll.call(this, arguments);
		window.sessionStorage.setItem(window.localtion.href.toLowerCase(), window.scrollY);
		console.log('new scroll');
	};
	window.onload = function () {
		_onload.call(this, arguments);
		// 读取当前URL标志位
		var _recorder = window.sessionStorage.getItem(window.localtion.href.toLowerCase());
		if (_recorder) {
			//设置位置
			// window.scrollTo(0,1800)
		}
	};
})(window, document);