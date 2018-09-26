### 一.事件代理闭包结合
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