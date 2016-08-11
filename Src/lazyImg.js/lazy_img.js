/**
 * 图片延迟加载
 *
 * <img data-src="需要加载的图片URL" src="占位图片"/>
 * 如果需要逐渐显示 需要加入以下CSS
 * 如果需要逐渐显示 需要加入以下CSS
 *
 opacity: 0;
 transform: translateZ(0);
 -webkit-transition-duration: .5s;
 -moz-transition-duration: .5s;
 -o-transition-duration: .5s;
 transition-duration: .5s;
 */
(function () {
	var $imgs = document.querySelectorAll("img[data-src]");
	var $length = $imgs.length;
	var $oldload, $load = [];
	//var $imgData=[];
	//优化点1 可能可以取消
	//for(var i= 0,item;item=$imgs[i++];){
	//    $imgData.push({
	//        e:item,
	//        //rect:item.getBoundingClientRect(),
	//        isload:false
	//    });
	//}
	var $layzImgTimeout, $layzImgLoadTimeout, t;
	var $winHeight = window.innerHeight;
	var lazyImg = function () {
		$imgs = document.querySelectorAll("img[data-src]");
		$length = $imgs.length;
		$winHeight = window.innerHeight;
	};
	var lazyImgScroll = function () {
		t = document.documentElement.scrollTop || (document.body != null ? document.body.scrollTop : 0);
		clearTimeout($layzImgTimeout);
		t += $winHeight;
		$layzImgTimeout = setTimeout(function () {
			for (var i = 0; i < $length; i++) {
				var $top;
				if ($imgs[i].dataset.top == undefined) {
					$top = $imgs[i].offsetTop;
					var $p = $imgs[i].offsetParent;
					while ($p && $p.tagName != "BODY") {
						$top += $p.offsetTop;
						$p = $p.offsetParent;
					}
					$imgs[i].dataset.top = $top;
				}
				$top = $imgs[i].dataset.top;
				//优化点2 考虑记录已经加载的图片INDEX 然后删除它
				if ($top >= (t - $winHeight * 1.5) && $top <= t && !$imgs[i].dataset.isload) {
					$imgs[i].src = $imgs[i].dataset.src;
					$imgs[i].dataset.isload = true;
					$imgs[i].onload = function () {
						this.style.opacity = "1.0";
						this.onload = null;
					};
				}
			}
		}, 100);
	};
	// 查看是否支持监听DOM变动 MutationObserver
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
	$oldload = window.onload;
	if (MutationObserver != null) {
		$load.push(function () {
			var observer = new MutationObserver(function (mutations, observer) {
				clearTimeout($layzImgLoadTimeout);
				$layzImgLoadTimeout = setTimeout(function () {
					lazyImg();
					window.onscroll();
				}, 200);
			});
			observer.observe(document, {
				subtree: true,
				//attributes: true,
				childList: true
				//characterData: true
			});
		});
	} else {
		// 退化选择
		//（1）DOMSubtreeModified：在DOM结构中发生的任何变化时触发。这个事件在其他任何事件触发后都会触发。
		//
		//（2）DOMNodeInserted：在一个节点作为子节点被插入到另一个节点中时触发。
		//
		//（3）DOMNodeRemoved：在节点从其父节点中被移除时触发。
		$load.push(function () {
			document.body.addEventListener('DOMSubtreeModified', function () {
				$layzImgLoadTimeout = setTimeout(function () {
					lazyImg();
					window.onscroll();
				}, 200);
			}, false);
		});
	}

	window.onscroll = lazyImgScroll;
	window.lazyImg = lazyImg;

	$load.push(lazyImg);
	$load.push(lazyImgScroll);
	window.onload = function () {
		$oldload && $oldload();
		$load.forEach(function (p) {
			p();
		});
		//window.lazyImg();
		//window.onscroll();
	};
}());
window.onscroll();
