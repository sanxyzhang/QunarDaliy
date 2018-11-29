### 一.联调退票小工具，和出票改签自动补全，联调就比较闲了。
```javascript
<span style="display: none" node-type="orderNumber">{{orderNo}}</span>

var C = {
    getField: function (fieldName) {
        return that.DOM[fieldName].innerText;
    }}

_trans.commonOperate('changeFinish', {changeOrderNo: C.getField('orderNumber')})

```

### 二.对象数组遍历
1. for...in返回对象的键名；数组索引
```javascript
for(var i in arrTmp){
    console.log(i+": "+arrTmp[i])
}
//for-in会遍历到数组的属性
arrTmp.name="myTest";
for(var i in arrTmp){
    console.log(i+":"+arrTmp[i])
}
```
2. forEach数组遍历专有
* jquery的each方法 index和value与原生的forEach方法位置颠倒

```javascript
$.each(arrTmp,function(index,value){
    console.log(index+": "+value)
});
```

```javascript
//forEach遍历数组，三个参数依次是数组元素、索引、数组本身
arrTmp.forEach(function(value,index,array){
    console.log(value+","+index+","+array[index])
})
```

3. for循环和for-in能正确响应break、continue和return语句，但forEach不行。

4. for...of 返回类对象的键值
* for...of语句在可迭代对象(包括 Array, Map, Set, String, TypedArray，arguments 对象等等)上创建一个迭代循环，对每个不同属性的属性值,调用一个自定义的有执行语句的迭代挂钩

```javascript
let iterable = new Map([["a", 1], ["b", 2], ["c", 3]]);
for (let [key, value] of iterable) {
  console.log(value);
}
//输出 1 2 3
 
// for-of遍历字符串
let iterable = "china中国";
for (let value of iterable) {
  console.log(value);
}
//输出 "c" "h" "i" "n" "a" "中" "国"
```
5. Object.keys() 返回数组或对象的键名

```javascript
//数组类型
let arr = ["a", "b", "c"];
console.log(Object.keys(arr));
// (3) ['0', '1', '2']
 
// 类数组对象
let anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(anObj));
// (3) ['2', '7', '100']

//一般对象
let xyz = {z: "zzz", x: "xxx", y: "yyy"};
console.log(Object.keys(xyz));
// (3) ["z", "x", "y"]
```