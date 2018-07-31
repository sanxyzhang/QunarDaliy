# Fourth Day
### 1.熟悉webpack以及react自动化构建打包工具

(1).npm start 

    在http://localhost:3000下监视文件，文件修改将自动更新，你可以在控制台中看到检测错误

(2).npm test

    在交互监视模式下启动测试运行程序。
(3).npm run build

    在生产环境中编译代码，并放在build目录中
    能够正确的打包代码，并且优化，压缩，使用hash重命名文件

(4).npm run eject

    注意：这是一个单向操作，一旦你使用eject，那么就不能恢复了
    使用说明：如果你对create-react-app这个构建工具和配置项不满意，你可以在任何时候eject，从而导出可配置的模板，这个命令可以移除到项目的单一构建依赖，取而代之的是将配置文件和项目依赖到导入到你的项目中，你可以随意支配他们，之后除了eject命令以外其余的命令都是可用的，这些命令也是可配置的，所以这时候你就可以操作他们了.
    
### 2.深入理解bind,apply,call
##### 简单例子阐明用法
```javascript
// 有只猫叫小黑，小黑会吃鱼
const cat = {
    name: '小黑',
    eatFish(...args) {
        console.log('this指向=>', this);
        console.log('...args', args);
        console.log(this.name + '吃鱼');
    },
}
// 有只狗叫大毛，大毛会吃骨头
const dog = {
    name: '大毛',
    eatBone(...args) {
        console.log('this指向=>', this);
        console.log('...args', args);
        console.log(this.name + '吃骨头');
    },
}
console.log('=================== call =========================');
// 有一天大毛想吃鱼了，可是它不知道怎么吃。怎么办？小黑说我吃的时候喂你吃
cat.eatFish.call(dog, '汪汪汪', 'call')
// 大毛为了表示感谢，决定下次吃骨头的时候也喂小黑吃
dog.eatBone.call(cat, '喵喵喵', 'call')

console.log('=================== apply =========================');
cat.eatFish.apply(dog, ['汪汪汪', 'apply'])
dog.eatBone.apply(cat, ['喵喵喵', 'apply'])

console.log('=================== bind =========================');
// 有一天他们觉得每次吃的时候再喂太麻烦了。干脆直接教对方怎么吃
const test1 = cat.eatFish.bind(dog, '汪汪汪', 'bind')
const test2 = dog.eatBone.bind(cat, '喵喵喵', 'bind')
test1()
test2()
```
##### 结果
```javascript
this指向=> ObjecteatBone: eatBone(...args) {console.log('this指向=> {…}name: "大毛"__proto__: Object
 ...args Array(2)0: "汪汪汪"1: "call"length: 2__proto__: Array(0)
 大毛吃鱼
```
* call跟apply的用法几乎一样，唯一的不同就是传递的参数不同，__ call只能一个参数一个参数的传入。__
* **apply则只支持传入一个数组，**哪怕是一个参数也要是数组形式。最终调用函数时候这个数组会拆成一个个参数分别传入。
* bind方法，** 他是直接改变这个函数的this指向并且返回一个新的函数，** 之后再次调用这个函数的时候this都是指向bind绑定的第一个参数。bind传参方式跟call方法一致。
#### 区别bind，apply必用黑魔法
**原理**

如果一个数组我们已知里面全都是数字，想要知道最大的那个数，**由于Array没有max方法，Math对象上有**

**我们可以根据apply传递参数的特性将这个数组当成参数传入**
最终Math.max函数调用的时候会将apply的数组里面的参数一个一个传入，恰好符合** Math.max的参数传递方式**
这样变相的实现了数组的max方法。min方法也同理
```javascript
var arr=[1,2,3,4];
var max=Math.max.apply(null,arr);
console.log(max);
```

如果你想将某个函数绑定新的`this`指向并且固定先传入几个变量可以在绑定的时候就传入，之后调用新函数传入的参数都会排在之后
```javascript
const obj = {}
function test(...args) {console.log(args)}
const newFn = test.bind(obj, '静态参数1', '静态参数2')
newFn('动态参数3', '动态参数4')
```
#### 总结
* 当我们使用一个函数需要改变this指向的时候才会用到call`apply`bind
* 如果你要传递的参数不多，则可以使用fn.call(thisObj, arg1, arg2 ...)
* 如果你要传递的参数很多，则可以用数组将参数整理好调用fn.apply(thisObj, [arg1, arg2 ...])
* 如果你想生成一个新的函数长期绑定某个函数给某个对象使用，则可以使用const newFn = fn.bind(thisObj); newFn(arg1, arg2...)
### 3.深入理解react中this
##### 箭头函数得原理
**this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。所以，箭头函数转成ES5的代码如下：**
```javascript
// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}
// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}
```

经典入坑题
```javascript
(function() {
  return [
    (() => this.x).bind({ x: 'inner' })()
  ];
}).call({ x: 'outer' });
```
上面代码中，箭头函数没有自己的this，所以bind方法无效，内部的this指向外部的this。所以上面的代码最终输出 ['outer']。

最后引用阮一峰老师对箭头函数得四条总结

（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

上面四点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。

### 4.TodoList项目引发的对es6展开符的反思
如上例，我们主要使用Function.prototype.apply方法来将一个数组展开成多个参数
```javascript
function myFunction(x, y, z) { }
var args = [0, 1, 2];
myFunction.apply(null, args);
```
**有了es6展开符，我们现在可以这么做**
```javascript
function myFunction(x, y, z) { }
var args = [0, 1, 2];
myFunction(...args);
```
* 以上是展开符的第一类用法：**函数传参**
* 数据解构
```javascript
let cold = ['autumn', 'winter'];
let warm = ['spring', 'summer'];
// 析构数组
let otherSeasons, autumn;
[autumn, ...otherSeasons] = cold;
otherSeasons      // => ['winter']
```
不光能解构数组，还可以结构对象；
* 数据构造
先解构再构造，显而易懂。
### 5.通过TodoList项目对assign方法的反思理解
#### Object.assign方法的常见用途   

**(1)为对象添加属性**

```javascript
class Point{
   constructor(x,y){
      Object.assign(this,{x,y});
   }
}
```
上面的方法可以为对象Point类的实例对象添加属性x和属性y。

**(2)为对象添加方法**
```javascript
Object.assign(SomeClass.prototype,{
    someMethod(arg1,arg2){...},
    anotherMethod(){...}
});
```
**(3)克隆对象**
```javascript
// 默认值对象
const DEFAULTS = {
   logLevel : 0,
   outputFormat : 'html'
};
 
// 利用assign同名属性会覆盖的特性，指定默认值，如果options里有新值的话，会覆盖掉默认值
function processContent(options){
   options = Object.assign({},DEFAULTS,options);
   console.log(options);
   //...
}
```
**(4)为属性设置默认值或者修改属性**
```javascript
const DEFAULTS = {
   logLevel : 0,
   outputFormat : 'html'
};
 
// 利用assign同名属性会覆盖的特性，指定默认值，如果options里有新值的话，会覆盖掉默认值
function processContent(options){
   options = Object.assign({},DEFAULTS,options);
   console.log(options);
   //...
}
```

### 6.Redux 提供的combineReducers
```javascript
import { combineReducers } from 'redux'

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp
```

与如下代码等价

```javascript
export default function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}
```