### 1.这两天在做大龙国际日报开发，实时官网价格优化。多看代码多吃盐，多理解多吸收
### 2.ajax参数
1. jQuery.ajax([settings])参数
* async 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
* beforeSend 类型：Function  发送请求前可修改 XMLHttpRequest 对象的函数，如添加自定义 HTTP 头 XMLHttpRequest 对象是唯一的参数。这是一个 Ajax 事件。如果返回 false 可以取消本次 ajax 请求
* cache 默认值: true，dataType 为 script 和 jsonp 时默认为 false。设置为 false 将不缓存此页面。
* context  类型：Object
这个对象用于设置 Ajax 相关回调函数的上下文。也就是说，让回调函数内 this 指向这个对象（如果不设定这个参数，那么 this 就指向调用本次 AJAX 请求时传递的 options 参数）。比如指定一个 DOM 元素作为 context 参数，这样就设置了 success 回调函数的上下文为这个 DOM 元素。
```javascript
$.ajax({ url: "test.html", context: document.body, success: function(){
        $(this).addClass("done");
      }});
```
* dataType 预期服务器返回的数据类型 xml html script json jsonp text
* jsonp 在一个 jsonp 请求中重写回调函数的名字。这个值用来替代在 "callback=?" 这种 GET 或 POST 请求中 URL 参数里的 "callback" 部分，比如 {jsonp:'onJsonPLoad'} 会导致将 "onJsonPLoad=?" 传给服务器。

