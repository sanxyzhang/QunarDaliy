### 读书
##### html5 classList属性
* 使用场景：一个元素有多个class值，需要对齐进行个别的增删；
##### API：
1. add(value):如果值存在，则不添加
2. contains(value):存在返回true
3. remove(value):删除className
4. toggle(value):切换，有改class则删除，无则添加
``` div.classList.toggle("disabled")```

##### html5 readyState属性
``` if(document.readyState =="complete")```
* 该属性有两个值：loading,complete

### 前端代码模块化
#### 1.common.js
* Node.js是commonJS规范的主要实践者
* 实际使用时，用module.exports定义当前模块对外输出的接口（不推荐直接用exports），用require加载模块。
* commonJS用同步的方式加载模块。在服务端，模块文件都存在本地磁盘，读取非常快，所以这样做不会有问题。

```javascript
// math.js
var num = 0;
function add(a,b{
    return a+b;
}
module.exports = {
    add :add,
    num: num
}

// 引用自定义的模块时，参数包含路径，可省略.js
var math = require('./math');
math.add(2, 5);

// 引用核心模块时，不需要带路径
var http = require('http');
http.createService(...).listen(3000);
```

#### 2.AMD和require.js
* 用require.config()指定引用路径等，用define()定义模块，用require()加载模块。
```javascript
// 网页中引入require.js及main.js 
<script src="js/require.js" data-main="js/main"></script>

// main.js 入口文件/主模块 
// 首先用config()指定各模块路径和引用名
require.config({
  baseUrl: "js/lib",
  paths: {
    "jquery": "jquery.min",  //实际路径为js/lib/jquery.min.js
    "underscore": "underscore.min",
  }
});
// 执行基本操作
require(["jquery","underscore"],function($,_){
  // some code here
});
```

* 引用模块的时候，我们将模块名放在[ ]中作为reqiure()的第一参数；如果我们定义的模块本身也依赖其他模块,那就需要将它们放在[]中作为define()的第一参数

```javascript
// 定义一个依赖underscore.js的模块
define(['underscore'],function(_){
  var classify = function(list){
    _.countBy(list,function(num){
      return num > 30 ? 'old' : 'young';
    })
  };
  return {
    classify :classify
  };
})
```

* require.js在申明依赖的模块时会在第一之间加载并执行模块内的代码：

```javascript
define(["a", "b", "c", "d", "e", "f"], function(a, b, c, d, e, f) { 
    // 等于在最前面声明并初始化了要用到的所有模块
    if (false) {
      // 即便没用到某个模块 b，但 b 还是提前执行了
      b.foo()
    } 
});
```
#### 3.CMD和sea.js


* AMD推崇依赖前置、提前执行，CMD推崇依赖就近、延迟执行。

```javascript
//CMD推崇依赖就近、延迟执行
define(function(require, exports) {
    console.log('world init');
    exports.getMessage = function() {
        return 'world';
    };
});

// main
define(function(require) {
    var message;
    if (true) {
        message = require('./hello').getMessage();
    } else {
        message = require('./world').getMessage();
    }
});

```

#### 4.ES6 Module
* 其模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
* export default命令，为模块指定默认输出，对应的import语句不需要使用大括号。


#### 5. ES6 模块与 CommonJS 模块的差异