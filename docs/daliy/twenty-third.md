##### 看了看浏览器内核相关的东西，和css hack还没看完。明天接着看，再整理
##### js小技巧
1. *1或者+ 将string强制转化为数字
```+ '123'```
``` '32' *1```
2. 使用boolean过滤数组中所有的假值(false，null，0，""，undefined，NaN);
```const compact = arr => arr.filter(Boolean)```
```compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34])  // [ 1, 2, 3, 'a', 's', 34 ]```
3. 双位运算符取整
```Math.floor(4.9) === 4  //true  简写为：~~4.9 === 4  //true ~~-4.5  // -4 Math.floor(-4.5)  //-5```
4. 数字取整
``` 1.3|0 //1    -1.9|0 //-1```
5. 判断奇偶 3&1 //1   4&1 //0  
6. 初始化函数默认值，强制参数
```javascript
mandatory = ( ) => {
  throw new Error('Missing parameter!');
}
foo = (bar = mandatory( )) => { // 这里如果不传入参数，就会执行manadatory函数报出错误
  return bar;
}
```
7. 隐式返回值
```javascript
function calcCircumference(diameter) {
  return Math.PI * diameter
}
// 简写为：
calcCircumference = diameter => (
  Math.PI * diameter;
)
```

8. 一次性函数
在函数体里覆写当前函数
```javascript
var sca=function(){
    console.log("first fun");
    sca=function(){
        console.log("next fun");
    }
}
```

9. 数字补0操作
```javascript
const addZero=(num,len = 2)=>( `000000${num}`).slice(-len)
addZero(3,3) =>003;
addZero(3) =>03;
```

10. 输入[10,20,30,40],要求将原数组x2，并选择大于50的数组成新数组进行输出
``` javascript
var arrold=[10,20,30,40,50]
function filterAndMap(){
    var arrnew=arrold.map((item,index)=>(item*2))
    return arrnew.filter((item)=>(item>50));
}
```
map函数返回变化后的数组，filter函数返回筛选后的老数组，不会对原数组会进行改变

由于上述遍历两次数组，使用reducer方法，一次遍历。
11. reduce 为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素，接受四个参数：初始值（或者上一次回调函数的返回值），当前元素值，当前索引，调用 reduce 的数组。

```arr.reduce(callback,[initialValue])```
callback （执行数组中每个值的函数，包含四个参数）

* previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
* currentValue （数组中当前被处理的元素）
* index （当前元素在数组中的索引）
* array （调用 reduce 的数组）

initialValue （作为第一次调用 callback 的第一个参数。）
```javascript
const numbers = [10, 20, 30, 40];
const doubledOver50 = numbers.reduce((finalList, num) => {
  num = num * 2;
  if (num > 50) {
    finalList.push(num);
  }
  return finalList;
}, []);
doubledOver50;  
```
12. 数组扁平化处理
```javascript
   const flatten = (arr, depth = 1) =>
   depth !=1 ?
   arr.reduce((pre,cur)=>pre.concat(Array.isArray(cur)?flatten(cur,depth-1):cur),[])
   :arr.reduce((pre,cur)=>pre.concat(cur),[])
   flatten([1, [2], 3, 4]);                    		 // [1, 2, 3, 4]
   console.log(flatten([1, [2, [3, [4, 5], 6], 7], 8], 2));           // [1, 2, 3, [4, 5], 6, 7, 8]
```
