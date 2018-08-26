##### 1.Antd组件form表单的实践
###### 2.getFieldDecorator
setFieldsValue 设置一组输入控件的值 Function({ fieldName: value }
```javascript
_getType(type){
    console.log(type);
    this.props.form.setFieldsValue({
      'appealType':`${type}`
    })
  }
```
直接设置 ```'appealType':type```是不可以的。因为该组件传值要求string类型，传num会报错
###### 3.顺便温习一下es6的模板字符串用法
```javascript
var obj={name:"haha",age:11}
`${obj}`
=> "[object Object]"
var str=2;
`${str}`
=> "2"
```
1. 由此可知模板字符串自带toString方法。
2. 
```javascript
const classes = `header ${ isLargeScreen() ? '' :
`icon-${item.isCollapsed ? 'expander' : 'collapser'}` }`;
 ```

 ###### 4.react编写高性能代码
 1. 在构造函数中进行方法的bind绑定，减少绑定执行次数
 2. 样式提取到样式文件中，因为react的渲染判定为浅比较，如果在组件中使用style={{color:green}},react会在每次渲染的时候将其看作为两个对象。

 ###### 5.周六日回家实在无聊，好好读读深入浅出react和redux。读书笔记后续奉上。