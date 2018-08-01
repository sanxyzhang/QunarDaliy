## SeventhDay
### Object.keys
实际开发中，我们有时需要知道对象的所有属性，原生js给我们提供了一个很好的方法:Object.keys()，该方法返回一个数组
1.传入对象，返回属性名
```javascript
var obj = {'a':'123','b':'345'};
console.log(Object.keys(obj));  //['a','b']

var obj1 = { 100: "a", 2: "b", 7: "c"};
console.log(Object.keys(obj1)); // console: ["2", "7", "100"]

var obj2 = Object.create({}, { getFoo : { value : function () { return this.foo } } });
obj2.foo = 1;
console.log(Object.keys(obj2)); // console: ["foo"]
```
2.传入字符串，返回索引

```javascript
var str = 'ab1234';
console.log(Object.keys(obj));  //[0,1,2,3,4,5]
```

3.构造函数 返回空数组或者属性名

```javascript
 function Pasta(name, age, gender) {
            this.name = name;
            this.age = age;
            this.gender = gender;
            this.toString = function () {
                    return (this.name + ", " + this.age + ", " + this.gender);
            }
    }

    console.log(Object.keys(Pasta)); //console: []

    var spaghetti = new Pasta("Tom", 20, "male");
    console.log(Object.keys(spaghetti)); //console: ["name", "age", "gender", "toString"]
```

4.数组 返回索引
```javascript
 var arr = ["a", "b", "c"];
    console.log(Object.keys(arr)); // console: ["0", "1", "2"]
```

### 2.for的几种循环

* 1.数组提供内置的forEach方法 *

无法中途跳出forEach循环，break命令或return命令都不能奏效。

* 2.for...in循环主要是为遍历对象而设计的，不适用于遍历数组 *
数组的键名是数字，但是for...in循环是以字符串作为键名“0”、“1”、“2”等等。

for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。

某些情况下，for...in循环会以任意顺序遍历键名。

* 3.一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，就可以用for...of循环遍历它的成员。也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法。*
不同于forEach方法，它可以与break、continue和return配合使用。

提供了遍历所有数据结构的统一操作接口。

### 3.nginx配置
1.熟悉nginx基础命令

2.设置server文件夹中config文件，将指定网址绑定到127.0.0.1:8000端口

3.下载switchhost将指定网址绑定本地8000端口
### 4.详读项目代码，并在本地运行
解决node版本引起的ykit相关bug，使用nvm设置默认node版本

熟悉网页控制台代码调试方式。