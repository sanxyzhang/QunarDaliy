### SixteenDay
###### 1.原虚拟页代码优化
###### 2.解决服务其他页面默认时间问题

##### 3.$(function(){})作用时间问题
在页面DOM文档加载完成后加载执行的，等效于$(document).ready(function(){...}); 

优于window.onload，后者必须等到页面内包括图片的所有元素加载完毕后才能执行。

##### 4.HTML5的自定义 data-* 属性和jquery的data()方法的使用
最近写代码，可能是吃的盐太少了，老喜欢往HTML标签上添加自定义属性来存储和操作数据，听了大哥的话并查了查，才知道这样做的问题是，你不知道将来会不会有其它脚本把你的自定义属性给重置掉，此外，你这样做也会导致html语法上不符合Html规范，以及一些其它副作用。

替代方案是：HTML标签上添加任意以 "data-"开头的属性，这些属性页面上是不显示的，它不会影响到你的页面布局和风格，但它却是可读可写的。
```<div id="awesome" data-myid="3e4ae6c4e">  Some awesome data  </div>```
使用jQuery的.data()方法来访问这些"data-*" 属性。其中一个方法就是 .data(obj)，这个方法是在 jQuery1.4.3版本后出现的，它能返回相应的data属性。
```var myid= jQuery("#awesome").data('myid');```

还可以在"data-*" 属性里使用json语法
```<div id="awesome-json" data-awesome='{"game":"on"}'></div>```
```var gameStatus= jQuery("#awesome-json").data('awesome').game;```

坑的一点还有：只能 data-record-id 不可以 data-recordId

$("button").data(recordId);

##### 5.prop跟attr区别
两个方法最主要的源码部分是：attr是通过setAtrribute和getAttribute来设置的，使用的是DOM属性节点，而prop是通过document.getElementById(el)[name] = value来设置的，是转化为js对象的属性。

通常在获取或者设置checked，selected，readonly，disabled等的时候使用prop效果更好，减少了访问dom属性节点的频率。

一般如果是标签自身自带的属性，我们用prop方法来获取；如果是自定义的属性，我们用attr方法来获取。
```javascript
c1:<input id="c1" name="checkbox" type="checkbox" /></br>
c2:<input id="c2" name="checkbox" type="checkbox" checked=false/> </br>
 var a1=$("#c1").attr("checked"); //checked
 var a2=$("#c2").attr("checked"); //undefined
 var p1=$("#c1").prop("checked"); //true
 var p2=$("#c2").prop("checked"); //false
```
attr的返回值要么是checked要么是undefined，prop的返回值只有true和false。
