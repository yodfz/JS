# layz_img 图片延迟加载库
> 这个库主要以移动端为主,PC端也适用,但是仅支持IE9以上,Chrome,ff浏览器.


>This lib support mobile,and desktop IE9+,Chrome,and Firefox!

## 起步
```css
 opacity: 0;
 transform: translateZ(0);
 -webkit-transition-duration: .5s;
 -moz-transition-duration: .5s;
 -o-transition-duration: .5s;
 transition-duration: .5s;
```
>为需要延迟加载的图片指定以上样式

```html
<img data-src='需延迟加载图片' src='占位图片'>
```
>data-src表示是需要延迟加载的图片,占位图片可有可无,但是如果未指定src那么图片会引用当前页,建议指定一个占位图片,
另外建议为图片指定宽高,否则图片加载的时候由于DOM高度变化会造成页面重绘.并且页面图片顶开的效果也不符合用户体验.

```html
<script src='lazy_img.js'></script>
```
>直接在body结束标签后引入这个文件


>Import this file,append body tagName;

