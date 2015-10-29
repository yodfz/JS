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