### 变量提升
```javascript
a = 2;
var a;
console.log(a); //2
//等同于
var a;
a = 2;
console.log(a)//

console.log(b);//undefined;
b = 3;

//等同于
var b;
console.log(b)；
b = 3;
```

### 函数声明会被提升，但是函数表达式不会被提升
```javascript
foo();
function foo(){
    console.log("提升了");
}
//等同于
function foo(){
    console.log("提升了");
}
foo();

baz();//TypeError;
bar();//ReferceError;
var baz = function bar(){}
//等同于
var baz;
baz();
bar();

baz = function(){
    var bar = ...self...;
}
```

### 函数声明会提到普通变量之前
```javascript
foo(); //3
var foo;
function foo(){
    console.log(2);
}
function foo(){//函数声明覆盖
    console.log(3);
}

var foo = function(){
    console.log(4);
}
```