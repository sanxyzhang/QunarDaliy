### 完成辅营产品退款需求，处于待联调状态
### js高级程序设计笔记（1）
#### 第一章 javascript简介
1. DOM级别
* DOM1:核心DOM（映射基于XML的文档结构）,DOM HTML 
* DOM2模块：DOM师徒，DOM事件，DOM样式，DOM遍历和范围
* DOM3模块：新增验证文档的方法（DOM验证），引入统一的加载和保存文档的方法。
#### 第八章 BOM
1. 全局变量用delete删除，返回false，window对象使用delete删除，返回true
2. window对象的三个属性
* parent常用在iframe和frame中的子页面访问父页面中的对象
* top ：一个页面可能会有很多层，top是指最顶层的框架
* self ：是指当前窗口
3. 取得浏览器窗口大小
```javascript
var pageWidth=window.innerWidth,
    pageHeight=window.innerHeight;
if(typeof pageWidth != "number"){
    if(document.compatMode== "CSS1Compat"){//假如是标准模式
    pageWidth = document.documentElement.clientWidth;
    pageHeight = document.documentElement.clientHeight;
    }
    else{
    pageWidth = document.body.clientWidth;
    pageHeight = document.body.clientHeight;
    }
}

```
4. window.open(URL,name,features,replace)
* name:一个可选的字符串，该字符串是一个由逗号分隔的特征列表，其中包括数字、字母和下划线，该字符声明了新窗口的名称。这个名称可以用作标记 <a> 和 <form> 的属性 target 的值。如果该参数指定了一个已经存在的窗口，那么 open() 方法就不再创建一个新窗口，而只是返回对指定窗口的引用。在这种情况下，features 将被忽略。
* 	一个可选的字符串，声明了新窗口要显示的标准浏览器的特征。如果省略该参数，新窗口将具有所有标准特征。在窗口特征这个表格中，我们对该字符串的格式进行了详细的说明。
* 一个可选的布尔值。规定了装载到窗口的 URL 是在窗口的浏览历史中创建一个新条目，还是替换浏览历史中的当前条目。支持下面的值：
true - URL 替换浏览历史中的当前条目。
false - URL 在浏览历史中创建新的条目。

5. location对象
属性：hash(返回url的hash，如果不含散列，返回空字符串)
host(返回服务器名称和端口号) hostname(不带端口号的服务器名称)
href(返回跟location对象的toString方法一样的完整的url)
pathname(返回url中目录和文件名)
port，protocol, search(返回以问号开头的查询字符串)

6. navigator对象
appname appVersion onLine Platform preference plugins 
```javascript
function hasPlugins(name){
    name = name.toLowerCase();
    for(var i=0;i<navigator.plugins.length;i++){
        if(navigator.plugins[i].name.toLowerCase().indexOf(name)>-1){
            return true;
        }
        return false;
    }
}
```