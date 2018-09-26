### 1.今天两个需求都要提测，终于做完啦，就等后端大哥整好了，联调试一下。应该没什么问题，数据mock的都成功了
* 因为两个需求是独立的，但是还是用的同一个工程，所以就在master上建立了两个独立的分支。
然后悲哀的时候就来临了，我切了分支，但是没有push上之前的项目分支，哎，切回来的时候代码全没了，长记性了。
### 2.then和获取数据
```javascript
var tran_={
    changeTicketInfo:function(dt) {
        return trans.request('changeTicketInfo', {
            data:dt,
            error: function (e) {
                art.alert('请求异常，请稍后重试!');
            }
    })
}
    $.when(
            _trans.changeTicketInfo({changeOrderNo: C.getField('orderNumber')})
        ).then(function(ticketInfo){
            console.log(ticketInfo);
```

这里console.log()的是一个数组对象。
```javascript
0:data:{ticketNo: "xep180905163745953001_2072800", actualGqFee: "xep180905163745953001"}message:"出错了"ret:false ;__proto__:Object
1:"success"
2:{readyState: 4, setRequestHeader: ƒ, getAllResponseHeaders: ƒ, getResponseHeader: ƒ, overrideMimeType: ƒ, …}
length:3 __proto__:Array(0)
```
取得data的话需要：```console.log(ticketInfo[0]);```

### js设计模式一
#### 单例设计模式
* 单例模式的核心是确保只有一个实例，并提供全局访问
* 单例模式的好处：
1. 在全局中只生成一个变量，减少全局变量的污染，同时也很好的解决了命名冲突。
2. 只需新创建一次对象，减少对内存资源的占用。
3. 减少系统加载的时间，遇到bug更容易排查。
```javascript
var demo =(function(){
	var div;
	function init(){
	    div=document.createElement('div');
	    div.innerText="创建了一个div";
	    document.body.appendChild(div);
	}
	return function(){
        if(!div){
            init();
        }
        return div;
    }
})();
demo();//在页面上创建了一个div元素
demo();//已经创建了
```

上面的方法只能实例一个div元素，如果需要创建多个就比较麻烦了。而且创建的实例和它的管理都放于一个函数demo中，这明显不能更好的扩展。所以需要把变化的封装起来，不变的隔离开，以便于程序的扩展性
```javascript
var demo = function(fn){
    var elm;
    return function(){
        return elm || (elm = fn.apply(this, arguments));
    }
};
var initDiv=function(){
    var div=document.createElement('div');
	div.innerText="创建了一个div";  
    document.body.appendChild(div);
    return div;
};
var initP=function(){
    var p=document.createElement('p');
	p.innerText="创建了一个p";  
    document.body.appendChild(p);
    return p;
};
var a=demo(initDiv);
a();//创建了一个div
a();//已经存在了
var a_1=demo(initDiv);
a_1();//又创建了一个div
var b=demo(initP);
b();//又通过demo创建了p
b();//已经存在了
```