### 运用正则的基本方法
* RegExp对象方法 exec ,test

```javascript
var reg = /id=".*?"/
//或者 reg =RegExp('id=".*?"','g');
var str = '<div id="container" class="main"></div>';
reg.exec(str);
// => ["aa", index: 0, input: "aa bb aac", groups: undefined]
```

* String对象方法 search, match , resplace , split

1. resplace不改变原字符串，返回替代过新串
2. match返回为匹配的值的数组形式

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
#### ^、$、\b、\B、(?=p)、(?!p)
* \b 是单词边界，具体就是 \w 与 \W 之间的位置，也包括 \w 与 ^ 之间的位置，和 \w 与 $ 之间的位置。

```javascript
var result = "[JS] Lesson_01.mp4".replace(/\b/g, '#');
  console.log(result);
  // => "[#JS#] #Lesson_01#.#mp4#"
```

* \B 就是 \b 的反面的意思，非单词边界。
* 正向先行断言 (?=p)，其中 p 是一个子模式，即 p 前面的位置，或者说，该位置后面的字符要匹配 p。
* 负向先行断言 (?!p) 就是 (?=p) 的反面意思

```javascript
//对金额加,
//(?!^)
var regex = /(?!^)(?=(\d{3})+$)/g;
var result = "12345678".replace(regex, ',')
console.log(result);
// => "12,345,678"
```
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

### 匹配标签
```javascript
   var regex = /<([^>]+)>[\d\D]*<\/\1>/;
   var string1 = "<title>regular expression</title>";
   var string2 = "<title>wrong!</p>";
   console.log( regex.test(string1) ); // true
   console.log( regex.test(string2) ); // false
```

### 正则分组
* 分组有四种分组类型
1. 捕获型()
2. 非捕获型(?:)
3. 正向前瞻型(?=)
4. 反向前瞻型(?!)

#### 捕获型
```javascript
var reg = /(\d{2})\/(\d{2})\/(\d{4})/
var data = '10/24/2018'
data = data.replace(reg, '$3-$1-$2')
console.log(data)//2018-10-24
```
* stringObj.replace(regexp/substr,replacement)；
1. 第一个参数：必需。字符串中要替换的子串或正则RexExp；
2. 第二个参数：必需，一个字符串值，规定了替换文本或生成替换文本的函数。 

### replace的几个使用场景
1. 第一个正则，第二个参数是函数
```javascript
var str4 = '这是一段原始文本，需要替换的内容"aa这要bbb替换ccccc"！';
var newStr = str4.replace( /[a-z]+/g,function ($0){
    var str = '';
    for (var i = 0; i < $0.length; i++) {
        str += '*';
    };
    return str;
} );
console.log( newStr );    //这是一段原始文本，需要替换的内容"**这要***替换*****"！
```
* $0 代表匹配到的字符串数组

2. 第一个参数是正则且有子表达式，第二个参数函数且带有多个参数
```javascript
var str5 = '这是一段原始文本，需要替换的内容"3c这要替换4d"！';
var newStr = str5.replace( /([0-9])([a-z])/g,function (arg1,arg2,arg3,arg4,arg5){
  console.log( arg1 );
  console.log( arg2 );
  console.log( arg3 );
  console.log( arg4 );
  console.log( arg5 );
} );
//输出：
3c
3
c
17
这是一段原始文本，需要替换的内容"3c这要替换4d"！
4d
4
d
23
这是一段原始文本，需要替换的内容"3c这要替换4d"
```

* 第一个参数arg1表示匹配的整体，arg2表示第一个子表达式，arg3表示第二个子表达式，接下来的参数arg4是一个整数，声明了表示子匹配在 stringObject 中出现的位置。最后一个参数是 stringObject 本身

* 转为驼峰化

```javascript
 function camelize (str) {
      return str.replace(/[-_\s]+(.)?/g, function (match, c) {
          return c ? c.toUpperCase() : '';
      });
  }
  console.log( camelize('-moz-transform') );
  // => "MozTransform"
```
### 正则优先级

1. 转义符\
2. 括号和方括号 (...)、(?:...)、(?=...)、(?!...)、[...]
3. 量词限定符 {m}、{m,n}、{m,}、?、*、+
4. 位置和序列^、$、\元字符、一般字符
5. 管道符(竖杠) |

### 正则转义仅需要在引起歧义的时候进行转义
* 匹配 "[abc]"； 可以写成 /\[abc\]/，也可以写成 /\[abc]/  因为一个]并不会构成正则的歧义
* 同理，要匹配字符串 "{3,5}"，只需要把正则写成 /\{3,5}/ 即可。
*  =、!、:、-、, 等符号，因为都要不在特殊结构中，并不需要转义。
* 括号需要前后都转义的，/\(123\)/。
### 正则回溯以提升效率
* 目标字符串是:"abc"de
* 正则/".*"/
* 匹配过程 "a "ab ... "abc"de =>(开始回溯) => "abc"d "abc" "abc => "abc"
* 优化方式  正则改为/"[^"]*"/
* 大部分语言的正则都是 NFA，即非确定型有限自动机；相对于DFA 引擎（“确定型有限自动机）”效率较慢，但是编译更快