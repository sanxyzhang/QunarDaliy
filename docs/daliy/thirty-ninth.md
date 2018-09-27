### 一.点完了ota报价监控的case，照猫画虎配了一个简单的nginx。把辅营产品退款做了一部分。明天准备做完。
```javascript
upstream ota_page {
       server 127.0.0.1:3000;
}

upstream ota_api {
       server l-noah6ifckpiwd1.auto.beta.cn0:8080;
}

server{
    listen  80;
    server_name fws.pagestore.node;
    expires -1;

    location /fwspage/ {
        proxy_pass $scheme://ota_page$request_uri;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
  }

location /analysis/ {
        proxy_pass $scheme://ota_api;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
  }

}

```
### 二.事件代理闭包结合
```javascript
//闭包实现
var node=document.getElementsByTagName("li");
for(var i=0;i<node.length;i++){
    node[i].onclick=(function(){
        return function(){
            alert(i);
        }
    })(i);
}
//let实现代替闭包实现

//事件代理实现
// Event对象提供了一个属性叫target，可以返回事件的目标节点，
// target就可以表示为当前的事件操作的dom，但是不是真正操作dom，
// 标准浏览器用ev.target，IE浏览器用event.srcElement，此时只是获取了当前节点的位置，
var ul=document.querySelector("ul");
var list=document.querySelectorAll("ul li");
ul.addEventListener("click",function(ev){
    var ev=ev||window.event;
    var target=ev.target||ev.srcElement;
    var len=list.length;
    for(let i=0;i<len;i++){
        if(list[i]==target){
            alert(target.innerHTML);
        }
    }
})
//jquery on方法
 $("ul").on("click", "li", function(){  
    var index = $(this).index();  
    var info = $(this).html();  
    alert(index + "----" + info);  
}); 
```

### console敲了敲，发现点门道
```javascript
var a={},b={key:"b"},c={key:"c"}
a.a=123;
a   => {a:123}
a[b]=456;
a  =>{a:123,[object  Object]:456}
a.b=456;
a  =>{a:123,b:456,[object  Object]:456}
a[c]=789;
a  =>{a:123,b:456,[object  Object]:789}
a.e=000;
a  =>{a:123,b:456, e:000,[object  Object]:789}
a[e]=000;
=>Uncaught ReferenceError: e is not defined
```

