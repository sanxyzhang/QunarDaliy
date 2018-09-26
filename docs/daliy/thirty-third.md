### 周四请假一天，参加发小婚礼。
### 今天开了一个新需求：国内自营一键回帖票号,差不多做了百分之60吧，明天抽空按wiki来添油加醋一下。
### 1.不要理所当然和马虎，这两种写法不一样
```javascript
var num=8;
if(num!='11'&&'12'&&'13'){
    console.log("hah");
}
if(num!='11'&&num!='12'&&num!='13'){
    console.log("heihei");
}
```
### 2.jquery $.when用法
* jQuery.when(deferreds) 类型: Deferred 或 Promise 或 Thenable
* 零个或多个延迟对象，或者普通的JavaScript对象。
```javascript
var d1 = $.Deferred();
var d2 = $.Deferred();
var d3 = $.Deferred();
 
$.when( d1, d2, d3 ).done(function ( v1, v2, v3 ) {
    console.log( v1 ); // v1 is undefined
    console.log( v2 ); // v2 is "abc"
    console.log( v3 ); // v3 is an array [ 1, 2, 3, 4, 5 ]
});
 
d1.resolve();
d2.resolve( "abc" );
d3.resolve( 1, 2, 3, 4, 5 );
```