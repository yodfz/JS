#CSS性能

##隐藏
建议隐藏DOM使用
```css
display:none;
visibility:hidden;
```

##无需的标签，不需要加到 css 里面去

错误示范
```css
ul#navigation,ul.menu{
    margin-left:0px;
}
```

正确示范
```css
#navigation,.menu{
    margin-left:0px;
}
```

##避免使用通配符（*），连续的选择器应该要 – 按重要性顺序

##移除多余的 DOM 元素（不要滥用 div）