### 0.大龙新增国内页面开发ing中
### 1.sort无参数排序
当不传入参数的时候，sort()方法会调用默认的排序的方式，即先调用每个数组项的toString()转型方法，然后按照字符串Unicode编码顺序来对字符串进行排序
```javascript
 var arr = [1, 2, 3, 15, 22, 33];
    arr.sort();
    alert(arr);
    //1, 15, 2, 22, 3, 33

```

### 2.找出数组中最大值
```javascript
    var a = [2, 4, 5, 7, 8, 10];
    console.log(Math.max.apply(null, a)); //10
    console.log(Math.max.call(null,2, 4, 5, 7, 8, 10)); //10
```

### 3.将数组的空元素变为undefined
空元素与undefined的差别在于，数组的forEach方法会跳过空元素，但是不会跳过undefined和null。因此，遍历内部元素的时候，会得到不同的结果。
```javascript
var a = [1, , 3];
    a.forEach(function(index) {
        console.log(index); //1,3 ，跳过了空元素。
    })

    Array.apply(null,a).forEach(function(index){
        console.log(index);    ////1,undefined,3  ，将空元素设置为undefined
    })
```

### 4.转化类似数组的对象
被处理的对象必须有length属性，以及相对应的数字键。
```javascript
console.log(Array.prototype.slice.call(2，3，4));    //[2,3,4]
console.log(Array.prototype.slice.apply({0:1,length:2}));    //[1,undefined]
console.log(Array.prototype.slice.call({0:1,length:2}));    //[1,undefined]
```

### 5.看了一篇超级有料的掘金文章
1. this 永远指向最后调用它的那个对象
2. 箭头函数的 this 始终指向函数定义时的 this，而非执行时
3. 匿名函数的 this 永远指向 window

### 6.new的过程
```javascript
var a=new myFunction("Li","Cherry");
new myFunction{
    var obj={};
    obj.__prop__=myFunction.propotype;
    var result = myFunction.call(obj,"Li","Cherry");
    return typeof result === "obj"?result:obj;
}
```

1. 创建一个空对象 obj;
2. 将新创建的空对象的隐式原型指向其构造函数的显示原型。
3. 使用 call 改变 this 的指向
4. 如果无返回值或者返回一个非对象值，则将 obj 返回作为新对象；如果返回值是一个新对象的话那么直接直接返回该对象。

