## 联调忘了发昨天的日报了，不好意思
### 提取数组对象中指定属性
* 输入：多个三属性对象组成的数组
* 输出：多个两属性对象组成的数组
* 结论：析构解构好好用啊
```javascript
    const urlAndName = ({imgUrl,name})=>({url,name});
    const submitFileList = this.state.fileList.reduce((pre,cur)=>{
      pre.push(urlAndName(cur));
      return pre;
    },[])
```
### url前加不加/
  /api/qualityCheck/check?222
  http://www.51taopiao.cn/api/qualityCheck/check?222

  api/qualityCheck/check?1111
  http://www.51taopiao.cn/uipage/qualityAppeal/api/qualityCheck/check?1111
### 浏览器相关
##### [浏览器内核](https://juejin.im/entry/57ff3cea0e3dd90057e5f25e)
##### 常见的浏览器内核可以分这四种：Trident、Gecko、Blink、Webkit。
1. Trident-IE内核
Window10 发布后，IE 将其内置浏览器命名为 Edge，Edge 最显著的特点就是新内核 EdgeHTML
2. Gecko-Firefox内核
Gecko 的特点是代码完全公开
Gecko 是一个跨平台内核，可以在Windows、 BSD、Linux 和 Mac OS X 中使用。
3. Webkit-chrome,Safari内核
* WebKit 前身是 KDE(Linux桌面系统）) 小组的 KHTML 引擎
4. Blink/Chromium
Blink 其实是 WebKit 的分支，如同 WebKit 是 KHTML 的分支
5. Presto
Presto 是挪威产浏览器 opera 的 “前任” 内核，为何说是 “前任”，因为最新的 opera 浏览器早已将之抛弃从而投入到了谷歌大本营。
##### 移动端浏览器
移动端的浏览器内核主要说的是系统内置浏览器的内核。

目前移动设备浏览器上常用的内核有 Webkit，Blink，Trident，Gecko 等，其中 iPhone 和 iPad 等苹果 iOS 平台主要是 WebKit，Android 4.4 之前的 Android 系统浏览器内核是 WebKit，Android4.4 系统浏览器切换到了Chromium，内核是 Webkit 的分支 Blink，Windows Phone 8 系统浏览器内核是 Trident
##### 浏览器储存
最常见的数据储存方式主要这三种：Cookie，web存储 (locaStorage和seesionStorage)，IndexedDB
1. Cookie 
Cookie的又称是HTTP Cookie，最初是在客户端用于存储会话信息，从底层来看，它作为HTTP协议的一种扩展实现，Cookie数据会自动在web浏览器和web服务器之间传输，因此在服务器端脚本就可以读写存储的cookie的值，因此Cookie通常用于存储一些通用的数据，比如用户的登陆状态，首选项等。虽然随着时代的进步，HTML5所提供的web存储机制已经逐步替代了Cookie，但有些较为老的浏览器还是不兼容web存储机制，因此正处于这个老旧更替阶段的我们对于它还是要了解了解的。

##### 2.css hack
* 什么叫css hack？大概就是根据不同浏览器写特定的css样式，以达到统一页面的效果
* 感觉css hack主要是针对IE浏览器做出的让步，垃圾IE！
* 大概了解记录一下吧，反正IE那么多低版本，我也记不下来。
CSS Hack大致有3种表现形式，CSS属性前缀法、选择器前缀法以及IE条件注释法（即HTML头部引用if IE）Hack，实际项目中CSS Hack大部分是针对IE浏览器不同版本之间的表现差异而引入的。

1. 属性前缀法(即类内部Hack)：例如 IE6能识别下划线"_"和星号" * "，IE7能识别星号" * "，但不能识别下划线"_"，IE6~IE10都认识"\9"，但firefox前述三个都不能认识。
2. 选择器前缀法(即选择器Hack)：例如 IE6能识别*html .class{}，IE7能识别*+html .class{}或者*:first-child+html .class{}。
3. IE条件注释法(即HTML条件注释Hack)：针对所有IE(注：IE10+已经不再支持条件注释)： <!--[if IE]>IE浏览器显示的内容 <![endif]-->，针对IE6及以下版本： <!--[if lt IE 6]>只在IE6-显示的内容 <![endif]-->。这类Hack不仅对CSS生效，对写在判断语句里面的所有代码都会生效。

