// 修改微信标题
function setTitle(_title) {
	document.title = _title;
	var ua = navigator.userAgent.toLowerCase();
	// IPHONE版无法监听TITLE 需要IFRAME触发
	if (ua.indexOf('iphone') > -1) {
		var $body = document.body;
		var $iframe = document.createElement('iframe');
		$iframe.src = '/static/ok.txt';
		$iframe.width = '0px;';
		$iframe.height = '0px;';
		$iframe.onload = function () {
			setTimeout(function () {
				$body.removeChild($iframe);
			}, 0);
		};
		$body.appendChild($iframe);
	}
}