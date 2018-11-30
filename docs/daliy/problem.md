### 笔试题
```javascript
//将字符串中“aabccbaabcabcbca”的abc替换为xyz
var str="aabccbaabcabcbca";
(str.split("abc")).join("xyz")
```

### 作用域相关
```javascript
function xxx(){console.log(xxx)}
xxx();
console.log(xxx)
//输出=>ƒ xxx(){console.log(xxx)}  ƒ xxx(){console.log(xxx)}

var yyy=function(){console.log(yyy)};
yyy();
console.log(yyy);
//输出=>ƒ(){console.log(xxx)}  ƒ(){console.log(xxx)}  匿名函数

var zzz=function xxx(){console.log(xxx)};
zzz();
console.log(xxx);
//ƒ xxx(){console.log(xxx)}
// Uncaught ReferenceError: xxx is not defined at <anonymous>:3:13
//xxx不在全局的作用域下，属于zzz内部

setTimeout(function xxx(){},0);
console.log(xxx);
// Uncaught ReferenceError: xxx is not defined at <anonymous>:3:13
// 两个问题，一是xxx属于setTimeout函数内部  二是宏任务和微任务先后执行顺序问题


```