### 1.这两天主要在做蜗牛react重构，在实践中对redux储存状态有了新的理解吧，其次就是重拾antd design。使用两个日期组件，彼此绑定函数传递状态值来实现日期范围的需求
### 2.写了个优化的冒泡排序
```javascript
function bubbleSort(arr){
    var low = 0;
    var high = arr.length-1;
    var temp;
    while(low<high){
        for(var j=low;j<high;j++){
            if(arr[j]>arr[j+1]){
                temp = arr[j];
                arr[j] = arr [j+1];
                arr[j+1] = temp;
            }
            --high;
        }
        for(var j=high;j>low;j--){
            if(arr[j]<arr[j-1]){
                temp = arr[j-1];
                arr[j-1]=arr[j];
                arr[j]=temp;
            }
        }
    }      
}
```
### apply,bind,call
##### 1.定义一个 log 方法，让它可以代理 console.log 方法，
##### 2.给每一个 log 消息添加一个"(app)"的前辍，
##### 3.传入参数个数不确定
```javascript
function log(){
  var args = Array.prototype.slice.call(arguments); //将类数组转化为数组
  args.unshift('(app)');
  
  console.log.apply(console, args);
};
```
##### bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 
##### bind函数多次绑定传参
```javascript
var bar = function(){
    console.log(this.x);
}
var foo = {
    x:3
}
var sed = {
    x:4
}
var func = bar.bind(foo).bind(sed); //=>3;

```
bind() 的实现，相当于使用函数在内部包了一个 call / apply ，第二次 bind() 相当于再包住第一次 bind() ,故第二次以后的 bind 是无法生效的。

### Array.from方法
1. Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）
2. Array.from({ length: 3 }); // [ undefined, undefined, undefined ]
3. 兼容写法 ```const toArray = (() =>Array.from ? Array.from : obj => [].slice.call(obj))();```
4. Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

### Array.of方法
1. Array.of方法用于将一组值，转换为数组。
2. 模拟实现```function ArrayOf(){return [].slice.call(arguments);}```

### Array其他方法
1. ```[1, [2, [3]]].flat(Infinity)```
2. ```[1, 2, NaN].includes(NaN) // true```
3. ```['a', 'b', 'c'].fill(7, 1, 2)```
4. ```[1, 5, 10, 15].find(function(value, index, arr) {return value > 9;}) // 10```

```javascript
    [1, 5, 10, 15].findIndex(function(value, index, arr) {
    return value > 9;
    }) // 2
```

```javascript
 function f(v){
    return v > this.age;
    }
    let person = {name: 'John', age: 20};
    [10, 12, 26, 15].find(f, person);    // 26
```