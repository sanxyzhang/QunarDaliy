## TenthDay
### 修改请求重复代码
原因：初始化注册的监听函数没有被注销；
修改：单独提出监听函数，使之与初始化分离
### js数组操作方法总结
#### 1.对象继承的方法

##### toString
如果数组中的某一项的值是null或者undefined，则该值在toLocaleString()和toString()方法返回的结果中以空字符串表示
##### valueOf()
valueOf()方法返回数组对象本身

```javascript
var a = [1, 2, 3];
console.log(a.valueOf());// [1, 2, 3]
console.log(a.valueOf() instanceof Array);//true
```

```javascript
[1,2,3].toString();//'1,2,3'
['a','b','c'].toString();//'a,b,c'
[1,[2,'c']].toString();//'1,2,c'
```
返回以逗号分割的字符串
该方法的返回值与不使用任何参数调用join()方法返回的字符串相同

#### 2.join函数
Array.join()方法是String.split()方法的逆向操作，后者是将字符串分割成若干块来创建一个数组
```javascript
var a = [1,2,3];
console.log(a.join());//'1,2,3'
console.log(a.join(' '));//'1 2 3'
console.log(a.join(''));//'123'
```

该方法也可以用于类数组对象上
```javascript
console.log(Array.prototype.join.call('hello', '-'));// "h-e-l-l-o"
var obj = { 0: 'a', 1: 'b', length: 2 };
console.log(Array.prototype.join.call(obj, '-'));// 'a-b'

```
若对象没有length属性，就不是类数组，也就不能调用数组的方法

#### 3.栈和队列
push()和pop()        shift()和push()
1.push()方法可以接收任意数量的参数，把它们逐个添加到数组末尾;并返回修改后数组的长度。所以，该数组会改变原数组.

2.pop()方法从数组末尾移除最后一项，减少数组的length值，然后返回移除的项。

3.对空数组使用pop()方法，不会报错，而是返回undefined

4.unshift()方法在数组前端添加任意个项并返回新数组长度。当使用多个参数调用unshift()时，参数是一次性插入的而非一次一个地插入。

#### 4.数组排序方法
##### reverse
reverse()方法用于反转数组的顺序，返回经过排序之后的数组；而**原数组顺序也发生改变**

##### sort
sort()方法按字符串升序排列数组项，sort方法会调用每个数组项的toString()方法，然后比较得到的字符串排序，返回经过排序之后的数组，而原数组顺序也发生改变

如果数组包含undefined元素，它们会被排到数组的尾部

sort()方法可以接受一个比较函数作为参数
```javascript
function compare(value1,value2){
return value1 - value2;
}
var array = [5,50,1,10];
console.log(array.sort(compare));//[1,5,10,50]
```

#### 数组拼接的方法

##### concat
concat()方法基于当前数组中的所有项创建一个新数组，先创建当前数组一个副本，然后将接收到的参数添加到这个副本的末尾，最后返回新构建的数组。所以concat()不影响原数组；
应用于浅拷贝
```javascript
//该方法实际只复制了数组的第一维，数组第一维存放的是第二维的引用，而第二维才是实际存放他们的内容
var numbers = [1,2];
var newNumbers = numbers.concat();
console.log(numbers,newNumbers);//[1,2] [1,2]
numbers[0] = 0;
console.log(numbers,newNumbers);//[0,2] [1,2]
var numbers = [[1,2]];
var newNumbers = numbers.concat();
console.log(numbers,newNumbers);//[[1,2]] [[1,2]]
numbers[0][0] = 0;
console.log(numbers,newNumbers);//[[0,2]] [[0,2]]
```
##### slice
slice(start,end)方法需要两个参数start和end，返回这个数组中从start位置到(但不包含)end位置的一个子数组；如果end为undefined或不存在，则返回从start位置到数组结尾的所有项

如果start是负数，则start = max(length + start,0)
如果end是负数，则end = max(length + end,0)

**如果不提供参数，slice()方法返回当前数组的一个浅拷贝**

##### splice
splice()返回一个由删除元素组成的数组，或者如果没有删除元素就返回一个空数组。

第二个参数number指定了应该从数组中删除的元素的个数。如果省略第二个参数，从起始点开始到数组结尾的所有元素都将被删除。

如果后面还有更多的参数，则表示这些就是要被插入数组的新元素
```javascript
var a = [1,2,3,4,5];
console.log(a,a.splice(2,0,'a','b'));//[1,2,'a','b',3,4,5] []
console.log(a,a.splice(2,2,[1,2],3));//[1,2,[1,2],3,3,4,5] ['a','b']
```

#### 数组位置方法
##### indexOf()
indexOf(search,start)方法接收search和start两个参数，返回search首次出现的位置，如果没有找到则返回-1；

#### 数组归并方法
##### reduce()
values.reduce(function(prev, cur, index, array){//todo});

化简函数接受四个参数，分别是：
　　【1】初始变量，默认为数组的第一个元素值。函数第一次执行后的返回值作为函数第二次执行的初始变量，依次类推

　　【2】当前变量，如果指定了第二个参数，则该变量为数组的第一个元素的值，否则，为第二个元素的值

　　【3】当前变量对应的元素在数组中的索引(从0开始)

　　【4】原数组对象

```javascript
var matrix = [
[1, 2],
[3, 4],
[5, 6]
];
// 二维数组扁平化
var flatten = matrix.reduce(function (prev, cur) {
return prev.concat(cur);
});
console.log(flatten); // [1, 2, 3, 4, 5, 6]
```

#### 数组迭代方法
function(item,index,array){//todo}
##### map() 返回每次函数调用的结果组成的数组
map()方法对数组的每一项运行给定函数，返回每次函数调用的结果组成的数组
map()方法还可以接受第二个参数，表示回调函数执行时this所指向的对象
```javascript
var arr = ['a','b','c'];
[1,2].map(function(item,index,arr){return this[item]},arr);//['b','c']

```

##### forEach()
forEach()方法对数组中的每一项运行给定函数，这个方法没有返回值。本质上与for循环迭代数组一样。如果需要有返回值，一般使用map方法
```javascript
var sum = 0;
[1, 2, 3, 4].forEach(function (item, index, array) {
sum += item;
});
console.log(sum);//10
```
forEach()方法除了接受一个必须的回调函数参数，第二个参数还可以接受一个可选的上下文参数(改变回调函数里面的this指向)
```javascript
var out = [];
[1, 2, 3].forEach(function(elem){
this.push(elem * elem);
}, out);
console.log(out);// [1, 4, 9]
```

##### filter
filter()方法对数组中的每一项运行给定函数，返回该函数会返回true的项组成的数组。该方法常用于查询符合条件的所有数组项
```javascript
[1, 2, 3, 4, 5].filter(function (elem) {
return (elem > 3);
});// [4, 5]
[0, 1, 'a', false].filter(Boolean);// [1, "a"]
[1, 2, 3, 4, 5].filter(function (elem, index, arr) {
return index % 2 === 0;
});// [1, 3, 5]
```
##### some()
some()方法对数组中的每一项运行给定函数，如果该函数对任一项返回true，则返回true。并且当且仅当数值中的所有元素调用判定函数都返回false，它才返回false
```javascript
a = [1,2,3,4,5];
a.some(function(elem, index, arr){return elem%2===0;})//true
a.some(isNaN);//false
```

##### every()
every()方法对数组中的每一项运行给定函数，如果该函数对每一项都返回true，则返回true；只要有一项返回false，则返回false

