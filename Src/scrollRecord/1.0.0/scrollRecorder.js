(function (_win, _doc) {
	var _onscroll = _win.onscroll;
	var _onload = _win.onload;

	function _getScroll() {
		_onload && _onload.apply(this, arguments);
		// 读取当前URL标志位
		var _recorder = _win.sessionStorage.getItem(_win.location.href.toLowerCase());
		if (_recorder) {
			//设置位置
			_win.scrollTo(0, _recorder);
		}
	};
	function _setScroll() {
		_onscroll && _onscroll.apply(this, arguments);
		_win.sessionStorage.setItem(_win.location.href.toLowerCase(), _win.scrollY);
	};
	_win.onscroll = _setScroll;
	_win.onload = _getScroll;
	_win.scrollRecorder = _getScroll;
})(window, document);