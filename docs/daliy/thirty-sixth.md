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
### 三.今天入门正则大门。好好学正则。
#### 1.贪婪模式 惰性模式
* 贪婪模式的标示符：+，？，*，{n},{n,},{n,m}
* *?	可以重复任意次，但是尽可能重复少的次数。
* +?	可以重复1次或者任意多次，但是尽可能重复少的次数，不过最少次数是1。
* ??	可以重复0次或1次，但尽可能少重复。
* {n,m}?	可以重复n到m此，但尽可能少重复，最少匹配次数是n。
* {n,}?	可以重复n次以上，但尽可能少重复，最少匹配n此。
```javascript
var str="axxyyzbdbax";
console.log(str.match(/a.*?b/));
//匹配id
var reg = /id=".*?"/
var str = '<div id="container" class="main"></div>';
console.log(str.match(reg)[0]); // id="container"
```
##### 匹配16进制颜色值
* 分析：
1. 表示一个16进制字符，可以用范围类[0-9a-fA-F]
2. 其中字符可以出现3或6次，需要是用量词和分支结构
3. 使用分支结构时，需要注意顺序(惰性)
```javascript
var reg = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g
console.log(reg.test('#ffbbad'))//true
var str = '#ffbbad #Fc01DF #FFF #ffE'
console.log( str.match(reg) )
//["#ffbbad", "#Fc01DF", "#FFF", "#ffE"]
```

##### 匹配时间
* 分析：
1. 对每个地方的数字进行分析：
2. 共4位数字，第一位数字可以为[0-2]。
3. 当第1位为2时，第2位可以为[0-3]，其他情况时，第2位为[0-9]。
4. 第3位数字为[0-5]，第4位为[0-9]
```javascript
var reg = /^([01][0-9]|[2][0-3]):[0-5][0-9]$/
console.log( reg.test("23:59") ); // true
console.log( reg.test("02:07") ); // true
```

##### 匹配日期
* 分析：
1. 年，四位数字即可，可用[0-9]{4}。
2. 月，共12个月，分两种情况01、02、……、09和10、11、12，可用(0[1-9]|1[0-2])。
3. 日，最大31天，可用(0[1-9]|[12][0-9]|3[01])
```var reg = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;```

### 2.正则中被忽略的位置
字符串的开头和结尾用"#"替换
```var result = 'hello'.replace(/^|$/g,'#')//=>#hello#```
\b是单词边界，具体就是\w和\W之间的位置，也包括\w和^之间的位置，也包括\w和$之间的位置
```var result = '[js] lesson_01.mp4'.replace(/\b/g,'#')// [#js#]#lesson_01#.#mp4#```
##### 数字的千位分隔符表示法
```javascript
var result = "12345678".replace(/(?=\d{3}$)/g, ',')
console.log(result); // "12345,678"
var result ="123456789".resplace(/?!^(?=\d{3}+$)/g,',')// "123,456,789"
```

##### 密码长度6-12位，由数字、小写字符和大写字母组成，但必须至少包括2种字符
```javascript
var reg = /((?=.*[0-9])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z]))^[0-9A-Za-z]{6,12}$/;
```
* 分析
分开来看就是(?=.*[0-9])和^。
表示开头前面还有个位置（当然也是开头，即同一个位置）。
(?=.*[0-9])表示该位置后面的字符匹配.[0-9]，即，有任何多个任意字符，后面再跟个数字。

* 另一种写法
```var reg = /(?!^[0-9]{6,12}$)(?!^[a-z]{6,12}$)(?!^[A-Z]{6,12}$)^[0-9A-Za-z]{6,12}$/;```