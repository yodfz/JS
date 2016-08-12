let template = `
    <div id="message_{{id}}" class="screenLock">
    <div id="message_js_{{id}}" class="lcs message animated {{animation}}In">
        <div class="title lcs">
        {{title}}
        </div>
        <div class="content lcs">
        {{content}}
        </div>
        <div class="buttonGroup lcs">
            {{button}}
        </div>
    </div></div>`;

export default {
	showMsg (_title, _content, okEvent, cancelEvent, _type, _animation) {
		let _id = +new Date();
		let d = document;
		if (typeof _title === 'object') {
			let result = Object.assign({}, _title);
			_title = result.title;
			_content = result.content;
			okEvent = result.okEvent;
			cancelEvent = result.cancelEvent;
			_type = result.type;
			_animation = result.animation;
		}
		// 判断类型,计算给什么种类的按钮
		_type = _type || 0;
		_animation = _animation || 'fade';

		let $hasTouch = 'ontouchend' in window;
		// 点透问题
		let $eventStart = $hasTouch ? 'touchend' : 'click';
		let _html = template.replace('{{title}}', _title)
			.replace('{{content}}', _content)
			.replace(/\{\{id\}\}/ig, _id)
			.replace('{{animation}}', _animation);

		let _btnHtml = [
			`<button class="leftBtn js-cancel lcs">取消</button>
             <button class="rightBtn js-ok lcs">确定</button>`,
			`<button class="btn js-ok lcs">
            确定</button>`
		];
		_html = _html.replace('{{button}}', _btnHtml[_type]);
		d.body.insertAdjacentHTML('beforeend', _html);
		let _obj = d.querySelector('#message_' + _id);
		// let _objJS = d.querySelector('#message_js_' + _id);
		d.querySelector('.wrapperContains').className = 'wrapperContains blur';
		_obj.addEventListener($eventStart, function (e) {
			e.preventDefault();
			let _className = e.target.className;
			if (_className.indexOf('js-cancel') > -1) {
				d.querySelector('.wrapperContains').className = 'wrapperContains';
				cancelEvent && cancelEvent();
				// _obj.remove();
				// _obj && _obj.parentNode.removeChild(_obj);
				//
				_obj.className = `screenLock animated ${_animation}Out`;
				setTimeout(function () {
					_obj && _obj.parentNode.removeChild(_obj);
				}, 500);
			}
			if (_className.indexOf('js-ok') > -1) {
				d.querySelector('.wrapperContains').className = 'wrapperContains';
				okEvent && okEvent();
				// _obj.remove();
				// _obj && _obj.parentNode.removeChild(_obj);
				// _obj && _obj.parentNode.removeChild(_obj);
				_obj.className = `screenLock animated ${_animation}Out`;
				setTimeout(function () {
					_obj && _obj.parentNode.removeChild(_obj);
				}, 500);
			}
		});
		_obj.addEventListener('click', function (e) {
			e.preventDefault();
		});
	}
};
