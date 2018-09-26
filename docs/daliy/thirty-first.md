## 一.今天进行了退票小助手的需求开发。
由于之前没有接触过这种项目，对流程一脸蒙蔽，产品大哥也不在，只能qtalk交流，没办法，慢慢差不多理解了这个流程吧。读了原有的代码，基于原有代码，进行开发。开发开发，一天就过去啦。
### 周六日看了些东西，没怎么整理，也就放周一日报上一起了。
## 二.深入理解js对象继承
### 1.原型链继承
```javascript
function Parent(name){
    this.name=name;
}
Parent.prototype.getName = function () {
  console.log(this.name);
}
function Child(){
}

Child().prototype= new Parent();
var child1 = new Child();
console.log(child1.getName()) // kevin
```
* 1.单纯的原型链继承会导致引用类型的属性被所有实例共享
* 2.创建Child实例时，不能向Parent传参

### 2.构造函数实现继承
```javascript
function Parent(){
    this.name=['aaa','bbb'];
}
function Child(){
    Parent.call(this);
}
var child1 = new Child();
child1.name.push('ccc');
console.log(child1.names); // ["kevin", "daisy", "yayu"]
var child2 = new Child();
console.log(child2.names); // ["kevin", "daisy"]
```
* 1.避免了引用类型的属性被所有实例共享
* 2.可以在 Child 中向 Parent 传参

### 3.原型链和构造函数组合继承
```javascript
function Parent (name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}
Parent.prototype.getName = function () {
  console.log(this.name)
}
function Child (name, age) {
  Parent.call(this, name); 
  this.age = age;
}
Child.prototype = new Parent();
var child1 = new Child('kevin', '18');
 
child1.colors.push('black');
 
console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]
 
var child2 = new Child('daisy', '20');
 
console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.colors); // ["red", "blue", "green"]

```
* 组合继承方式可以向Parent传参
* 既可以共享原型链的getName方法
* 又避免了引用类型的属性被所有实例共享

### 4.混合继承还能改进！
* 上周的日报上有new的过程
```javascript
var a=new myFunction("Li","Cherry");
new myFunction{
    var obj={};
    obj.__prop__=myFunction.propotype;
    var result = myFunction.call(obj,"Li","Cherry");
    return typeof result === "obj"?result:obj;
}
```
组合继承最大的缺点是会调用两次父构造函数。
一次是设置子类型实例的原型的时候：
Child.prototype = new Parent();

一次在创建子类型实例的时候：
var child1 = new Child('kevin', '18');

* 解决思路：不用Child.prototype = new Parent() ，而是间接的让 Child.prototype 访问到 Parent.prototype
```javascript
function Parent (name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}
 
Parent.prototype.getName = function () {
  console.log(this.name)
}
 
function Child (name, age) {
  Parent.call(this, name);
  this.age = age;
}
// 关键的三步
var F = function () {};
F.prototype = Parent.prototype;
Child.prototype = new F(); 

var child1 = new Child('kevin', '18');
console.log(child1);
```

把关键3步封装一下
```javascript
function object(o){
    function F(){}
    F.prototype=o;
    return new F();
}

function prototype(child, parent) {
  var prototype = object(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}

prototype(Child, Parent);
```
## 三.css布局相关
实现两个p布局，高度为200px，左边固定p宽度100px，右边p自适应。
```html
<p class="container">  
        <p class="left"></p>  
        <p class="right"></p>  
</p>  
```
1. Position实现
关键代码
```css
.container{
    width:100%;
    position:relative;
}
.left{
    position:absolute;
    background-color:red;
    height:200px;
    width:100px;
    left:0p;
}
.right{
    position:absolute;
    background-color:blue;
    height:200px;
    left:100px;
    right:0;
}
```
2. float实现
关键代码
```css
.container{
    width:100%;
    height:200px;
}
.left{
    float:left;
    width:100px;
    background-color:red;
    height:100%;
}
.right{
    margin-left:100px;/* width: calc(100% - 100px);  float:left */
    background-color:blue;
    height:100%;
}
```
3. flex布局
关键代码
```css
        .container{  
            width: 100%;  
            height: 200px;  
            display: flex;  
            flex-direction: row;  
        }  
        .left{  
            flex-basis:100px;  
            background-color: yellow;  
            height: 100%;  
        }  
        .right{  
            background-color: red;  
            flex-grow: 1;  
        }  
```
### 四.最后附上周六日看到一篇掘金小文
[flex布局历险记](https://juejin.im/entry/57675f8f80dda4005f9bbe0c)