## PROXY
### 1.proxy概述
### 2.proxy实例方法
### 3.proxy使用案例

## 1.proxy概述
### proxy————代理/拦截————元编程
```javascript
var obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  }
});
```
* target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。
* 如果handler没有设置任何拦截，那就等同于直接通向原对象

### Proxy支持的拦截操作
* get(target, propKey, receiver)
* set(target, propKey, value, receiver)
* has(target, propKey)
* deleteProperty(target, propKey)
* ownKeys(target)
* getOwnPropertyDescriptor(target, propKey)
* defineProperty(target, propKey, propDesc)
* preventExtensions(target)：
* getPrototypeOf(target)
* isExtensible(target)：
* setPrototypeOf(target, proto)：
* apply(target, object, args)
* construct(target, args)

## 2.proxy实例方法
### get(target, propKey, receiver)
```javascript
var person = {
  name: "张三"
};

var proxy = new Proxy(person, {
  get: function(target, property) {
    if (property in target) {
      return target[property];
    } else {
      throw new ReferenceError("Property \"" + property + "\" does not exist.");
    }
  }
});
```

#### get方法可以继承
```  var obj = Object.create(proxy) ```
#### get使用实例

```javascript
function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey);
      if (index < 0) {
        propKey = String(target.length + index);
      }
      return Reflect.get(target, propKey, receiver);
    }
  };

  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
}

let arr = createArray('a', 'b', 'c');
arr[-1] 
```

#### 第三个参数receiver

* 它总是指向原始的读操作所在的那个对象，一般情况下就是 Proxy 实例。

```javascript
const proxy = new Proxy({}, {
  get: function(target, property, receiver) {
    return receiver;
  }
});
proxy.getReceiver === proxy 
//创建对象
const proxy = new Proxy({}, {
  get: function(target, property, receiver) {
    return receiver;
  }
});

const d = Object.create(proxy);
d.a === d 
```

* d对象本身没有a属性，所以读取d.a的时候，会去d的原型proxy对象找。这时，receiver就指向d，代表原始的读操作所在的那个对象

### set(target, propKey, value, receiver)
* 四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。
* set方法的第四个参数receiver，指的是原始的操作行为所在的那个对象，一般情况下是proxy实例本身

```javascript
const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = receiver;
  }
};
const proxy = new Proxy({}, handler);
proxy.foo = 'bar';
proxy.foo === proxy
//创建对象
const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = receiver;
  }
};
const proxy = new Proxy({}, handler);
const myObj = {};
Object.setPrototypeOf(myObj, proxy);

myObj.foo = 'bar';
myObj.foo === myObj 
```

### apply(target, object, args)
* apply方法拦截函数的调用、call和apply操作
* apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。

```javascript
function sum(left, right) {
  return (this.x || left) + right;
}
var twice = {
  apply(target, ctx, args) {
    console.log(ctx == obj);
    return Reflect.apply(...arguments) * 2;
  },
};

var proxy = new Proxy(sum, twice);
let obj = { test: "test", proxy, x: 33 };
console.log(obj.proxy(1, 2));
//true
//70
//可见ctx为执行环境this

var twice_changeParams = {
  apply(target, ctx, args) {
    args[1] = args[1] + 5;
    return Reflect.apply(...arguments) * 2;
  },
};
proxy = new Proxy(sum, twice_changeParams);
console.log(proxy(1, 2));
// 16
//16为sum(1,(2+5))*2 分别对输入和输出进行了拦截
//这就是拦截器的含义
```

### has(target, propKey)
* has方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。
* has方法可以接受两个参数，分别是目标对象、需查询的属性名。
#### 在 JavaScript中实现真正的私有
```javascript
var handler = {
  has (target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
'_prop' in proxy // false
```

* has方法拦截的是HasProperty操作，而不是HasOwnProperty操作，即has方法不判断一个属性是对象自身的属性，还是继承的属性。

```var obj4=Object.create(proxy);  '_prop' in obj4 ; 'prop' in obj4```

* 虽然for...in循环也用到了in运算符，但是has拦截对for...in循环不生效

```for(a in obj4){console.log(a)};```


### construct(target, args)
* construct方法可以接受两个参数。target：目标对象 args：构造函数的参数对象

```javascript
var p = new Proxy(function () {}, {
  construct: function(target, args) {
    console.log('target'+target+'args'+ args.join(', '));
    return { value: args[0] * 10 };
  }
});

(new p(1)).value
```

* construct方法返回的必须是一个对象，否则会报错。

```javascript
var p = new Proxy(function() {}, {
  construct: function(target, argumentsList) {
    return 1;
  }
});
new p() // 报错
```


### ownKeys(target)
* ownKeys方法用来拦截**对象自身属性**的读取操作。具体来说，拦截以下操作。
1. Object.getOwnPropertyNames()
2. Object.getOwnPropertySymbols()
3. Object.keys()
4. for...in循环

### 被Object.keys过滤的属性
```javascript
let target = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.for('secret')]: '4',
};

Object.defineProperty(target, 'key', {
  enumerable: false,
  configurable: true,
  writable: true,
  value: 'static'
});
Object.keys(obj)//过滤后输出

let handler = {
  ownKeys(target) {
    return ['a', 'd', Symbol.for('secret'), 'key'];
  }
};

let proxy = new Proxy(target, handler);
Object.keys(proxy)//过滤加拦截后输出
```

#### 有三类属性会被ownKeys方法自动过滤，不会返回。

* 目标对象上不存在的属性
* 属性名为 Symbol 值
* 不可遍历（enumerable）的属性

### 拦截下划线开头的私有属性

```javascript
let target = {
  _bar: 'foo',
  _prop: 'bar',
  prop: 'baz'
};

let handler = {
  ownKeys (target) {
    return Reflect.ownKeys(target).filter(key => key[0] !== '_');
  }
};

let proxy = new Proxy(target, handler);
for (let key of Object.keys(proxy)) {
  console.log(target[key]);
}
```

### 上述代码没什么用处。get,set仍不拦截

### 拦截Object.getOwnPropertyNames()。
```javascript
  ownKeys: function(target) {
    return ['a', 'b', 'c'];
  }
});

Object.getOwnPropertyNames(p)
// [ 'a', 'b', 'c' ]
```

### for...in循环也受到ownKeys方法的拦截。
```javascript
const obj = { hello: 'world' };
const proxy = new Proxy(obj, {
  ownKeys: function () {
    return ['a', 'b'];
  }
});

for (let key in proxy) {
  console.log(key); // 没有任何输出
}
```

## proxy中this指向

```javascript
const target = new Date();
const handler = {};
const proxy = new Proxy(target, handler);

proxy.getDate();
```

* Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理。

```javascript
const target = {
  m: function () {
    console.log(this);
  }
};
const handler = {};

const proxy = new Proxy(target, handler);
target.m() 
proxy.m()
```
* 一旦proxy代理target.m，后者内部的this就是指向proxy，而不是target。

```javascript
const target = new Date('2015-01-01');
const handler = {
  get(target, prop) {
    if (prop === 'getDate') {
      return target.getDate.bind(target);
    }
    return Reflect.get(target, prop);
  }
};
const proxy = new Proxy(target, handler);

proxy.getDate() 
```

## 实例
```javascript
const handler = {
  get (target, key) {
    invariant(key, 'get');
    return target[key];
  },
  set (target, key, value) {
    invariant(key, 'set');
    target[key] = value;
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}
const target = {};
const proxy = new Proxy(target, handler);
proxy._prop
// Error: Invalid attempt to get private "_prop" property
proxy._prop = 'c'
```