## Reflect
### 一. Reflect对象的设计目的
### 二. Reflect静态方法
### 三. Reflect实例

### Reflect对象的设计目的
1. 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。
2. 修改某些Object方法的返回结果，让其变得更合理。
#### Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。

```javascript
// 老写法
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}

// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}
```

3. 让Object操作都变成函数行为。

```javascript
// 老写法
'assign' in Object // true

// 新写法
Reflect.has(Object, 'assign') // true
```

4. Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。

### 静态方法
#### 大部分与Object对象的同名方法的作用都是相同的，而且它与Proxy对象的方法是一一对应的
* Reflect.apply(target, thisArg, args)
* Reflect.construct(target, args)
* Reflect.get(target, name, receiver)
* Reflect.set(target, name, value, receiver)
* Reflect.defineProperty(target, name, desc)
* Reflect.deleteProperty(target, name)
* Reflect.has(target, name)
* Reflect.ownKeys(target)
* Reflect.isExtensible(target)
* Reflect.preventExtensions(target)
* Reflect.getOwnPropertyDescriptor(target, name)
* Reflect.getPrototypeOf(target)
* Reflect.setPrototypeOf(target, prototype)

### Reflect.get(target, name, receiver)
* 如果第一个参数不是对象，Reflect.get方法会报错。
* 如果name属性部署了读取函数（getter），则读取函数的this绑定receiver。
```javascript
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
};

var myReceiverObject = {
  foo: 4,
  bar: 4,
};
Reflect.get(myObject, 'baz', myReceiverObject);
Reflect.get(myObject, 'baz');
```

### Reflect.set(target, name, value, receiver)
```javascript
var myObject = {
  foo: 4,
  set bar(value) {
    return this.foo = value;
  },
};

var myReceiverObject = {
  foo: 0,
};

Reflect.set(myObject, 'bar', 1, myReceiverObject);
myObject.foo // 4
myReceiverObject.foo 
```

### Reflect.deleteProperty(obj, name)

```javascript
const myObj = { foo: 'bar' };

// 旧写法
delete myObj.foo;

// 新写法
Reflect.deleteProperty(myObj, 'foo');
```

### Reflect.construct(target, args)
* Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。
```javascript
function Greeting(name) {
  this.name = name;
}

// new 的写法
const instance = new Greeting('张三');

// Reflect.construct 的写法
const instance = Reflect.construct(Greeting, ['张三']);
```

### Reflect.getPrototypeOf(obj)，setPrototypeOf(obj, newProto) 
* 用于读取和设置对象的__proto__属性
```javascript
// 旧写法
const myObj = {};
Object.setPrototypeOf(myObj, Array.prototype);
Object.getPrototypeOf(myObj) === Array.prototype;


// 新写法
Reflect.setPrototypeOf(myObj, Array.prototype);
Reflect.getPrototypeOf(myObj) === Array.prototype;
```

* 如果无法设置目标对象的原型（比如，目标对象禁止扩展），Reflect.setPrototypeOf方法返回false。Object会报错
* 如果第一个参数不是对象，Object.setPrototypeOf会返回第一个参数本身，而Reflect.setPrototypeOf会报错。
```Object.setPrototypeOf(1, {})//1```
* 如果第一个参数是undefined或null，Object.setPrototypeOf和Reflect.setPrototypeOf都会报错。

### Reflect.apply(func, thisArg, args)
* 第三个参数不可省略

```javascript
const ages = [11, 33, 12, 54, 18, 96];

// 旧写法
const youngest = Math.min.apply(Math, ages);
const oldest = Math.max.apply(Math, ages);
const type = Object.prototype.toString.call(youngest);

// 新写法
const youngest = Reflect.apply(Math.min, Math, ages);
const oldest = Reflect.apply(Math.max, Math, ages);
const type = Reflect.apply(Object.prototype.toString, youngest, []);
```

### Reflect.ownKeys (target) 
* Reflect.ownKeys方法用于返回对象的所有属性
```javascript
var myObject = {
  foo: 1,
  bar: 2,
  [Symbol.for('baz')]: 3,
  [Symbol.for('bing')]: 4,
};

// 旧写法
Object.getOwnPropertyNames(myObject)
// ['foo', 'bar']

Object.getOwnPropertySymbols(myObject)
//[Symbol(baz), Symbol(bing)]

// 新写法
Reflect.ownKeys(myObject)
```