### Test节点类型
1. 属性
* nodeType:3
* nodeName: #text
* nodeValue : 值为节点所包含的文本
* parentNode 是一个Element

2. data方法
* appendData(text):将text插入尾部
* deleteData(offset,count):从offset指定位置删除count个字符
* insertData(offset,text):从offset处插入text
* replaceData(offset,count,text):
* splitText(offset):从offset指定位置将当前文本节点分成两个文本节点
* substringData(offset,count):提取从offset开始到offset+count为止的文本

3. 创建text节点，多text节点合并c
```javascript
var ele = document.createElement("div");
ele.className = "message";
var textNode = document.createTextNode("hello world");
ele.appendChild(textNode);
document.body.appendChild(ele);
var textNodeAnother = document.createTextNode("hello world");
ele.appendChild(textNodeAnother);

ele.normalize();//节点合并
ele.firstChild.nodeValue;//hello worldhello world 
```

### 实践使用cookie localstorage sessionstorage
