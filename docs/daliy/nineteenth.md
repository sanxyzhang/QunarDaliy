### NineteenthDay
###### 噼里啪啦又是一天啊，七上八下的把申诉的两个页面写完了。感觉得抽时间好好实践一下Antd，等周六日吧。明天准备先把另一个页面搞完，然后最近看了看掘金，对canvas和函数曲线有了新的认识，没有那么多时间总结实践一下，那就只能往后排了呗，最早今晚或明天，最晚这周日，搞一波，顺便熟悉一下公司的那些框架
##### setState同步异步
异步输出状态
```javascript
    _getFiles(fileList){
    console.log(fileList);
    this.setState({fileList}）;
    console.log(this.state);
  }
```

同步输出状态
```javascript
    this.setState({fileList},()=>{
      console.log(this.state);
    })
```

##### FormData详解
我就说这个append用法怎么跟我当初学的不一样，哎，孤陋寡闻了

1. FormData类型其实是在XMLHttpRequest 2级定义的，它是为序列化表以及创建与表单格式相同的数据（当然是用于XHR传输）提供便利。

2. 构造函数
创建一个空对象
``` var formData = new FormData(); ```
``` javascript
// 获取页面已有的一个form表单
var form = document.getElementById("myForm");
// 用表单来初始化
var formData = new FormData(form);
```

3. formData里面存储的数据形式，一对key/value组成一条数据，key是唯一的，一个key可能对应多个value。
如果是使用表单初始化，每一个表单字段对应一条数据，它们的HTML name属性即为key值，它们value属性对应value值。

4. 相应api操作
* get(key)/getAll(key)来获取对应的value
* append(key, value)来添加数据，如果指定的key不存在则会新增一条数据，如果key存在，则添加到数据的末尾
* set(key, value)来设置修改数据，如果指定的key不存在则会新增一条，如果存在，则会修改对应的value值。
* has(key)来判断是否对应的key值，返回true，false
* delete(key)删除数据
* 通过entries()来获取一个迭代器，然后遍历所有的数据
```javascript
formData.append("k1", "v1");
formData.append("k1", "v2");
formData.append("k2", "v1");
var i = formData.entries();
i.next(); // {done:false, value:["k1", "v1"]}
i.next(); // {done:fase, value:["k1", "v2"]}
i.next(); // {done:fase, value:["k2", "v1"]}
i.next(); // {done:true, value:undefined}
```


#### 禁用input的自动补全功能
只需要在input属性中添加autocomplete="off"即可，
```<input type="text" autocomplete="off">```

