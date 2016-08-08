let template = `
    <div id="message_{{id}}" class="screenLock animated fadeIn">
    <div class="message">
        <div class="title">
        {{title}}
        </div>
        <div class="content">
        {{content}}
        </div>
        <div class="buttonGroup">
            {{button}}
        </div>
    </div></div>`;

export default {
	showMsg (_title, _content, okEvent, cancelEvent, _type) {
		let _id = +new Date();
		let $hasTouch = 'ontouchstart' in window;
		// 点透问题
		let $eventStart = $hasTouch ? 'touchstart' : 'click';
		let _html = template.replace('{{title}}', _title)
			.replace('{{content}}', _content)
			.replace('{{id}}', _id);
		// 判断类型,计算给什么种类的按钮
		_type = _type || 0;
		let _btnHtml = [
			`<button class="leftBtn js-cancel">取消</button>
             <button class="rightBtn js-ok">确定</button>`,
			`<button class="btn js-ok">
            确定</button>`
		];
		_html = _html.replace('{{button}}', _btnHtml[_type]);
		document.body.insertAdjacentHTML('beforeend', _html);
		let _obj = document.querySelector('#message_' + _id);
		document.querySelector('.wrapperContains').className = 'wrapperContains blur';
		_obj.addEventListener($eventStart, function (e) {
			let _className = e.target.className;
			if (_className.indexOf('js-cancel') > -1) {
				e.stopPropagation();
				e.preventDefault();
				document.querySelector('.wrapperContains').className = 'wrapperContains';
				cancelEvent && cancelEvent();
				_obj.remove();
			}
			if (_className.indexOf('js-ok') > -1) {
				e.stopPropagation();
				e.preventDefault();
				document.querySelector('.wrapperContains').className = 'wrapperContains';
				okEvent && okEvent();
				_obj.remove();
			}
		});
	}
};
