### Test节点类型
#### 1.属性

* nodeType:3
* nodeName: #text
* nodeValue : 值为节点所包含的文本
* parentNode 是一个Element

#### 2.data方法

* appendData(text):将text插入尾部
* deleteData(offset,count):从offset指定位置删除count个字符
* insertData(offset,text):从offset处插入text
* replaceData(offset,count,text):
* splitText(offset):从offset指定位置将当前文本节点分成两个文本节点
* substringData(offset,count):提取从offset开始到offset+count为止的文本

#### 3.创建text节点，多text节点合并c

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
#### Cookie

* 一般由服务器生成，可设置失效时间。如果在浏览器端生成Cookie，默认是关闭浏览器后失效
* 每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题
#### localStorage

* 除非被清除，否则永久保存
* 仅在客户端（即浏览器）中保存，不参与和服务器的通信
#### sessionStorage

* 仅在当前会话下有效，关闭页面或浏览器后被清除

#### 在jquery中封装
```javascript
(function( window, undefined ) {
    var _storage = window.localStorage;
    var __hasS = function (e) {
        try{
            _storage.setItem("isOk","ok");
            _storage.removeItem("isOk");
            return true;
        }catch(e){
            return false;
        }
    }();

    $.storage = {
        hasS:__hasS,
        set:function(key,val){
            if(__hasS){
                _storage.setItem(key,val);
                return 1;
            }
            return 0;
        },
        get: function (key) {
            return __hasS ? _storage.getItem(key) : 0;
        },
        remove: function (key) {
            if(__hasS){
                _storage.removeItem(key);
            }else{
                return 0;
            }
        }
    }

})($, window)
```