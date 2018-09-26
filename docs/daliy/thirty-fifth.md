### 周一忙碌一整天，完成票价监控需求并联调。完成自动出票改签的联调。
* 初始化表单时间
```javascript
$(function () {
    var defaultDateStart = new Date();
    var defaultDateEnd = new Date();
    var formEl = $('#J_Form')[0];

    defaultDateStart.setDate(defaultDateStart.getDate());
    defaultDateEnd.setDate(defaultDateEnd.getDate() + 7);

    $("#startDate").val(
        defaultDateStart.getFullYear() + "-" + (defaultDateStart.getMonth() + 1) + "-" + defaultDateStart.getDate());
    $("#endDate").val(
        defaultDateEnd.getFullYear() + "-" + (defaultDateEnd.getMonth() + 1) + "-" + defaultDateEnd.getDate());

    Bone.DatePicker.datePickerRange(formEl.startDate, formEl.endDate, {});
});
```
### 工厂模式
```javascript
function person(name,age){
    var o=new Object();
    o.name=name;
    o.age=age;
    o.getName=function(){
        console.log(this.name);
    }
    return o;
}
var person1 = person("xiaoming",11); 
```

### 构造模式
```javascript
function Blog(name, url) {
    this.name = name;
    this.url = url;
    this.alertUrl = alertUrl;
}
function alertUrl() {
    console.log(this.url);
}
var blog = new Blog("xiaokeai","http://www.xiaokeai.com/"), blog2 = new Blog("xiaomeinv","http://www.123.com/");
blog.alertUrl();
blog2.alertUrl();
```
* 函数名手写字母大写---虽然标准没有严格规定手写字母大写,但按照惯例,构造函数的首写字母用大写.
* 没有先时创建对象
* 直接将属性和方法赋给this对象
* 没有return语句
* 使用new创建对象
* 能够识别对象, 这是构造函数模式胜于工厂模式的地方
* 构造函数虽然好用,但也并非没有缺点,使用构造函数的最大问题在于每次创建实例的时候都要重新创建一次方法(理论上每次创建对象的时候对象的属性均不同,而对象的方法是相同的),
然而创建两次完全相同的方法是没有必要的,因此,我们可以将函数移到对象外面.