## 讲道理，上周五应该写twenty-ninth.
### 1.终于联调完了，丢人丢大了，三个页面各种小错误。马虎马虎，丢人丢人。都不知道有啥子收获，大概就是应该，小心驶得万年船吧
#### 2.JQuery拓展方法
#### $.extend() 为拓展Jquery类本身
```javascript
jQuery.extend({
    min: function(a, b) {
        return a < b ? a : b;
    },
    max: function(a, b) {
        return a > b ? a : b;
    }
});
jQuery.min(2, 3); //  2 
jQuery.max(4, 5); //  5
```
#### jQuery.fn.extend(object);给jQuery对象添加方法。
jQuery类添加“成员函数”。jQuery类的实例才可以调用这个“成员函数,语句$("#div1")会生成一个 jQuery类的实例。
```javascript
$.fn.extend({
    alertWhileClick: function() {
        $(this).click(function() {
            alert($(this).val());
        });
    }
});
//$("#input1")是jQuery的实例，调用这个扩展方法
$("#input1").alertWhileClick();
```
#### 3.周六日回学校弄了报道注册的时，没怎么学习，就看了几篇掘金小文章。
1. 阿里前端翻译的《一起探讨javascript的对象》
2. 《移动端弹窗输入密码的那些事》
3. 《理解 Node.js 事件驱动架构》
#### 4.九月份的第一周好好干呗！
