### 1.今天就比较忙了，领了旁边姐的需求，因为产品不在，刚开始的一些操作就很费时间。每人给nginx文件，只好照猫画虎的自己捏了一个，功能残缺，但凑活着用吧。又帮出去旅游的大哥招待了个产品解决了个bug。
### 2.明天准备继续做这个调价工具的需求。明天晚上争取提测
### 3.常识
* undefined==null //true;
* 0=="" //true;
* 0=="null" //false;
* 0==NaN; //false;
* NaN==NaN;//false

### 4.script标签中defer和async的区别
* defer
如果script标签设置了该属性，则浏览器会异步的下载该文件并且不会影响到后续DOM的渲染；
如果有多个设置了defer的script标签存在，则会按照顺序执行所有的script；
defer脚本会在文档渲染完毕后，DOMContentLoaded事件调用前执行。

* async的设置，会使得script脚本异步的加载并在允许的情况下执行
async的执行，并不会按着script在页面中的顺序来执行，而是谁先加载完谁执行。