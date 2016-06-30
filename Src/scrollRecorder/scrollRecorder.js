(function (_win, _doc) {
	var _onscroll = _win.onscroll;
	var _onload = _win.onload;
	_win.onscroll = function () {
		_onscroll.call(this, arguments);
		_win.sessionStorage.setItem(_win.localtion.href.toLowerCase(), _win.scrollY);
		console.log('new scroll');
	};
	_win.onload = function () {
		_onload.call(this, arguments);
		// 读取当前URL标志位
		var _recorder = _win.sessionStorage.getItem(_win.localtion.href.toLowerCase());
		if (_recorder) {
			//设置位置
			_win.scrollTo(0,_recorder)
		}
	};
})(window, document);