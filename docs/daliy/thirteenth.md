### ThirteenthDay
#### input默认日期为当前日期的前天
```javascript
<input type="text" id="t" />

    var d = new Date();
    d.setDate(d.getDate() - 2);
    document.getElementById('t').value = d.getFullYear() + '-' + (d.getMonth() + 1 )+ '-' + d.getDate();
```

#### js Date常用方法
1.创建Date对象
```var myDate = new Date();```

2.Date()方法，返回今天的日期和时间，格式是固定格式：
document.write(Date());//Date()属于Javascript的内置对象，可以直接使用
3.getDate()方法返回月份的某一天

4.getDay() 方法可返回表示星期的某一天的数字，它的取值范围：0--6

5.getMonth()，返回月份字段，返回值是 0（一月） 到 11（十二月） 之间的一个整数

6.getFullYear() 方法可返回一个表示年份的 4 位数字。

7.getTime() 方法可返回本地时间距 1970 年 1 月 1 日之间的毫秒数

8.setDate() 方法用于设置一个月的某一天。

9.setMonth() 方法用于设置月份，与setDate()使用方法一直，也会改变原Date对象

#### react的ref绑定及其提升

```javascript
<input className="newtodo" ref = {this.refInput}/>
refInput(node){
    this.input=node;
}
```

精简代码
```javascript
<input className="newtodo" ref = {node => {input = node;}}/>
```

##### 不使用ref
```javascript
<input className="newtodo" onChange={this.onInputChange} value={this.state.value}/>
onInputChange(){
    this.setState({
        value:event.target.value
    });
}
```
开发中应该尽量减少ref的使用，避免直接操作dom元素
