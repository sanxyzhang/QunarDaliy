### FourteenthDay
#### 虚拟卡
* 实现新增需求
* 优化整理代码,链式操作，提取代码功能模块，将json树变浅。
* 筛选json数据，加深对深拷贝的理解
* 
#### window.open()方法详解
window.open(URL,name,specs,replace)

```window.open("https://www.baidu.com","_blank", 'height=100, width=400, top=0, left=0, toolbar=yes, menubar=yes, scrollbars=yes, resizable=no, location=no, status=no');```

 参数解释：
* window.open 弹出新窗口的命令； 
* 'page.html' 弹出窗口的文件名； 
* 'newwindow' 弹出窗口的名字（不是文件名），非必须，可用空''代替； 
* height=100 窗口高度； 
* width=400 窗口宽度； 
* top=0 窗口距离屏幕上方的象素值； 
* left=0 窗口距离屏幕左侧的象素值； 
* toolbar=no 是否显示工具栏，yes为显示； 
* menubar，scrollbars 表示菜单栏和滚动栏。 
* resizable=no 是否允许改变窗口大小，yes为允许； 
* location=no 是否显示地址栏，yes为允许； 
* status=no 是否显示状态栏内的信息（通常是文件已经打开），yes为允许；

URL	可选。打开指定的页面的URL。如果没有指定URL，打开一个新的空白窗口

name	可选。指定target属性或窗口的名称。支持以下值：

_blank - URL加载到一个新的窗口。这是默认

_parent - URL加载到父框架

_self - URL替换当前页面

_top - URL替换任何可加载的框架集

name - 窗口名称
#### cursor常用可选值
* cursor: pointer; cursor: hand; IE5，只认hand。
* cursor: wait; 等待/沙漏
* cursor: help; 帮助
* cursor:not-allowed; 禁止
* cursor: progress; 处理中
#### $(selector).serialize()
serialize() 方法通过序列化表单值，创建 URL 编码文本字符串。