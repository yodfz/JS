#JS小代码

##FOR实现斐波那契函数

```js
var a=[0,1];
for(var i=2;i<10;a[i]=a[i-1]+a[i-2],i++){}
```

##父框架调用子框架执行代码
```js
document.querySelector("#iFrameiPhone").contentWindow.iphone
```

##REM布局使用的JS代码
```js
<!--动态设置像素比-->
		<script>
			var iScale = 1;
			iScale = iScale / window.devicePixelRatio;
			document.write('<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=' + iScale + ',minimum-scale=' + iScale + ',maximum-scale=' + iScale + '">')
		</script>
		<!--动态设置文字大小-->
		<script>
			var iWidth = document.documentElement.clientWidth;
			var iHeight = document.documentElement.clientHeight;
			document.getElementsByTagName('html')[0].style.fontSize = iWidth / 16 + 'px';
		</script>
```
来源:前端群 - 蓝色い轨迹